export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  content: string[]; // Clean readable paragraphs
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  diagramType?: "simplest" | "async-sdk" | "rabbitmq-queue" | "time-buckets" | "alert-state" | "final-architecture" | "scale-10x";
  callout?: {
    type: "info" | "warning" | "success" | "tradeoff";
    title: string;
    message: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export const backendMonitoringBlogData = {
  id: "backend-monitoring-system-design",
  title: "Designing a Backend Monitoring System: From Naive HTTP Calls to 10× Distributed Scale",
  subtitle: "An evolution-driven guide to building isolated, high-throughput backend observability with asynchronous SDKs, RabbitMQ buffering, pre-aggregated database rollups, and stateful Slack notifications.",
  date: "September 2024",
  readTime: "12 min read",
  tags: ["System Design", "Distributed Systems", "RabbitMQ", "PostgreSQL", "Node.js", "SDK Architecture"],
  
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: [
        "When we start learning backend monitoring, we come across tools like Prometheus and Grafana. They are powerful, but as beginners, we often find them a bit overwhelming. So instead of just using them as black boxes, we want to understand how a monitoring system actually works by building a smaller, production-grade one ourselves.",
        "Our initial mental model is pretty simple:",
        "Backend -> Monitoring Server -> Database -> Dashboard",
        "We want to track metrics like API health, request volume, latency, error rates (5xx errors), and basic host server health such as CPU and memory utilization. We also want an alerting mechanism so that issues can be detected and debugged faster.",
        "But as we start thinking about the design, the simple approach quickly raises critical system design questions:",
        "• How do we collect metrics without adding latency to the host application?",
        "• What happens when the number of request events spikes during peak traffic?",
        "• Should every metric write directly to the database?",
        "So we start with the simplest architecture and evolve the design step-by-step as these bottlenecks emerge."
      ],
      diagramType: "simplest" as const,
    },
    {
      id: "problem-and-requirements",
      title: "2. The Problem & Requirements",
      content: [
        "The primary goal of the system is to provide complete observability into what is happening inside a backend application.",
        "For every API request, the system tracks:",
        "• Endpoint Route (e.g., /api/orders) and HTTP Method (GET, POST, etc.)",
        "• HTTP Status Code (200, 404, 500) and whether it resulted in a server error",
        "• Response Latency (in milliseconds)",
        "• Timestamp at which the request completed",
        "Along with API metrics, it also periodically collects server health metrics such as CPU percentage and RAM usage over time.",
        "The system must answer operational queries like:",
        "• Which endpoints are currently slow or breaching latency SLAs?",
        "• Which endpoints are producing elevated error rates?",
        "• What is our current requests-per-second (RPS) throughput?",
        "• Is an increase in API latency correlated with CPU or memory exhaustion?",
        "• Can we trigger an instant alert when a key metric crosses a threshold?"
      ],
      callout: {
        type: "info",
        title: "Non-Negotiable Engineering Constraints",
        message: "1. Low Latency Overhead: Metric collection must add minimal overhead to application routes.\n2. High Volume Resilience: Handle metrics across thousands of concurrent requests.\n3. Isolation Guarantee: If the monitoring platform crashes or slows down, the host application MUST continue running unaffected.\n4. Zero-Friction Integration: Adding monitoring to an existing codebase should require just 1-2 lines of SDK setup."
      }
    },
    {
      id: "simplest-design",
      title: "3. The Simplest Design",
      content: [
        "We start with the most straightforward implementation imaginable.",
        "Whenever the host backend receives an HTTP request, we measure its execution time and immediately make another HTTP POST request to the monitoring server.",
        "For example, when a client hits /api/orders:",
        "• method: GET\n• route: /api/orders\n• status: 200\n• latency: 120ms\n• timestamp: 1726244000",
        "The monitoring server receives this payload, performs basic validation, and directly writes a row into PostgreSQL.",
        "The Fatal Flaw of the Naive Approach:",
        "Because the telemetry HTTP request is executed synchronously inside the API route handler, it becomes part of the original client request path. If the monitoring server takes 50ms to process and write to PostgreSQL, every single user request gets hit with an extra 50ms delay.",
        "Even worse: if the monitoring server crashes or experiences a network outage, client requests on the main application will hang or fail."
      ],
      codeSnippet: {
        language: "typescript",
        caption: "Naive Synchronous Monitoring Call (Avoid This)",
        code: `// BAD: Synchronous call blocks the user response flow
app.get('/api/orders', async (req, res) => {
  const start = Date.now();
  const result = await fetchOrdersFromDB();
  const latency = Date.now() - start;

  // Blocking call to monitoring server!
  await fetch('http://monitoring-server/metrics', {
    method: 'POST',
    body: JSON.stringify({ route: '/api/orders', latency, status: 200 })
  });

  res.json(result); // Client waited for monitoring write to finish!
});`
      }
    },
    {
      id: "making-metric-collection-asynchronous",
      title: "4. Making Metric Collection Asynchronous",
      content: [
        "To solve the latency problem, we establish a core design rule: the host application should never wait for the monitoring system.",
        "We hook into Node.js / Express lifecycle events—specifically the finish event on the HTTP response object. This event fires after the response payload has already been written to the socket and dispatched to the client.",
        "Inside the SDK, we trigger a non-blocking fetch call without using await."
      ],
      diagramType: "async-sdk" as const,
      codeSnippet: {
        language: "typescript",
        caption: "Non-blocking SDK Middleware",
        code: `// GOOD: Non-blocking metric dispatch on Express finish event
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const latency = Date.now() - startTime;
    const metric = {
      route: req.route ? req.route.path : req.path,
      method: req.method,
      statusCode: res.statusCode,
      latencyMs: latency,
      timestamp: new Date()
    };

    // Non-blocking fire-and-forget request
    fetch('http://monitoring-api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    }).catch(err => {
      // Catch and silently drop errors so host app never crashes!
    });
  });

  next();
});`
      },
      callout: {
        type: "tradeoff",
        title: "Trade-off Analysis: Fire-and-Forget telemetry",
        message: "By choosing not to await the HTTP request or keep a complex retry queue inside the SDK memory space, we guarantee that a slow or dead monitoring server will NEVER crash or delay the host app. If the monitoring API is down, telemetry packets are dropped. For observability data, prioritizing application availability over 100% metric retention is the correct architectural choice."
      }
    },
    {
      id: "ingestion-bottleneck",
      title: "5. The Ingestion Bottleneck",
      content: [
        "Now that metric collection is asynchronous, host applications remain blazingly fast. However, a major problem emerges on the monitoring backend side.",
        "Suppose our host applications process 1,000 requests per second (RPS). Since one telemetry metric is generated per completed request, the monitoring server receives 1,000 HTTP POST requests every second.",
        "If the monitoring server synchronously processes each incoming request and inserts it directly into PostgreSQL:",
        "1. Database Write Saturation: Executing 1,000 individual INSERT INTO request_metrics queries per second consumes high DB connection pools and disk I/O.",
        "2. Tight Coupling: If PostgreSQL becomes temporarily slow during auto-vacuuming or heavy queries, incoming metrics pile up, worker threads get blocked, and HTTP 503 errors spike.",
        "We need a message queue to decouple metric ingestion from metric processing."
      ]
    },
    {
      id: "why-rabbitmq",
      title: "6. Why RabbitMQ?",
      content: [
        "To break the tight coupling between ingestion and processing, we introduce RabbitMQ as an AMQP message buffer.",
        "Instead of writing directly to PostgreSQL, the lightweight Monitoring API acts as a stateless producer: it receives the JSON payload, publishes the message to a RabbitMQ queue (metrics_queue), and immediately returns an HTTP 202 Accepted response.",
        "Key Benefits of RabbitMQ Buffering:",
        "1. Traffic Spike Buffering: If a sudden surge delivers 10,000 metrics in 2 seconds, RabbitMQ safely holds the metrics in memory/disk while background workers continue consuming at a steady rate of 7,000 msgs/sec.",
        "2. Asynchronous Decoupling: The HTTP API server only takes ~1-2ms to queue a message, allowing a single API node to handle huge throughput.",
        "3. Independent Scalability: We can scale ingestion nodes (HTTP endpoints) independently from worker nodes (database writers)."
      ],
      diagramType: "rabbitmq-queue" as const
    },
    {
      id: "worker-architecture",
      title: "7. Worker Architecture & Failure Protection",
      content: [
        "Once metrics are queued in RabbitMQ, a pool of worker services (W1, W2, W3) consumes messages concurrently.",
        "RabbitMQ distributes queue messages across available worker threads using round-robin competing consumer patterns.",
        "Robust Failure Protection with Manual Acknowledgments (ACK):",
        "• Manual ACK: A worker only sends an ack() command to RabbitMQ after the metric has been successfully inserted into PostgreSQL.",
        "• Worker Crashes: If a worker node crashes mid-operation, RabbitMQ detects the lost TCP connection and immediately requeues the message for another worker to process.",
        "• Database Downtime: If PostgreSQL is temporarily unavailable, workers catch the error and execute nack(requeue=true), holding messages in RabbitMQ until the database recovers.",
        "• Poison Messages: Malformed or unparseable JSON payloads are rejected without requeueing (nack(requeue=false)) to prevent infinite poison loops."
      ]
    },
    {
      id: "database-design",
      title: "8. Database Design & Time-Bucket Aggregates",
      content: [
        "We utilize PostgreSQL for metric storage. To query metrics efficiently without scanning millions of rows, we design two core tables and an automated rollup strategy.",
        "Table Schemas & Indexing Strategies:",
        "• request_metrics: Stores raw request records (id, project_id, route, method, status_code, latency_ms, is_error, timestamp). Indexes placed on (project_id, timestamp) and (route).",
        "• system_metrics: Stores host telemetry (id, project_id, cpu_usage_pct, memory_usage_mb, timestamp). Indexed on (project_id, timestamp).",
        "Solving the Query Bottleneck with Pre-Aggregated Rollups:",
        "Running SELECT AVG(latency_ms), COUNT(*) FROM request_metrics WHERE timestamp > NOW() - INTERVAL '30 days' over 50 million raw rows will freeze dashboards.",
        "We implement pre-aggregated time bucket tables:",
        "Raw Metrics (Retained 7 days) -> 1-Minute Rollups -> 1-Hour Rollups -> 1-Day Rollups"
      ],
      diagramType: "time-buckets" as const,
      codeSnippet: {
        language: "sql",
        caption: "1-Minute Time Bucket Rollup Aggregation Table",
        code: `CREATE TABLE request_metrics_1m (
  project_id VARCHAR(64) NOT NULL,
  route VARCHAR(255) NOT NULL,
  minute_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  total_requests INT DEFAULT 0,
  error_count INT DEFAULT 0,
  avg_latency_ms FLOAT,
  p95_latency_ms FLOAT,
  PRIMARY KEY (project_id, route, minute_timestamp)
);`
      }
    },
    {
      id: "alerting-system",
      title: "9. Alerting System & Stateful State Transitions",
      content: [
        "A monitoring system must proactively notify developers when metrics breach thresholds (e.g., avgLatencyMs > 500ms over a 60-second window or errorRate > 5%).",
        "Every minute, a node-cron background worker queries the 1-minute rollup tables against user-defined alert rules.",
        "Eliminating Alert Storms: The Stateful Transition Engine:",
        "If an API endpoint remains slow for 30 minutes, sending a Slack message every single minute creates notification fatigue and spam.",
        "To fix this, every rule maintains a state machine with a persistent status (NORMAL vs TRIGGERED)."
      ],
      diagramType: "alert-state" as const,
      table: {
        headers: ["Previous State", "Current Condition", "Action Taken", "New State"],
        rows: [
          ["NORMAL", "Threshold Breached (> 500ms)", "Send Slack Alert Notification", "TRIGGERED"],
          ["TRIGGERED", "Threshold Still Breached", "Suppress Notification (No Spam)", "TRIGGERED"],
          ["TRIGGERED", "Metric Back to Normal (< 500ms)", "Send Resolved Notification", "NORMAL"],
          ["NORMAL", "Metric Normal", "Do Nothing", "NORMAL"]
        ]
      }
    },
    {
      id: "failure-handling",
      title: "10. Comprehensive Failure Handling Matrix",
      content: [
        "In a distributed telemetry architecture, components will fail. Here is how each failure mode is isolated to protect system availability:"
      ],
      table: {
        headers: ["Failing Component", "Immediate Impact", "Resilience Mechanism", "Availability Status"],
        rows: [
          ["RabbitMQ Broker", "Monitoring API cannot queue metrics", "Monitoring API returns HTTP 500. SDK catches exception and drops metric.", "Host App 100% Operational"],
          ["Worker Node Crash", "Worker dies mid-transaction", "RabbitMQ detects lost TCP socket and redistributes unacked message to W2.", "Zero Telemetry Loss"],
          ["PostgreSQL Failure", "Workers fail DB insert", "Workers execute nack(requeue=true). Metrics buffer safely in RabbitMQ.", "Zero Telemetry Loss"],
          ["Monitoring API Node", "SDK POST request times out", "SDK non-blocking timeout catches error and aborts fetch.", "Host App 100% Operational"],
          ["Slack Webhook Outage", "Alert notification dispatch fails", "Alert engine logs warning; retry attempt scheduled on next cron cycle.", "Monitoring System Intact"]
        ]
      }
    },
    {
      id: "final-architecture",
      title: "11. Final End-to-End Architecture",
      content: [
        "By systematically analyzing and resolving bottlenecks, we arrive at our production-grade architecture:",
        "Host Applications (SDK) -> Load Balancer -> Stateless Monitoring APIs -> RabbitMQ Queue -> Worker Pool -> PostgreSQL (Raw + Rollups) -> Cron Alert Engine -> Slack Webhook / Dashboard"
      ],
      diagramType: "final-architecture" as const
    },
    {
      id: "design-tradeoffs-and-limitations",
      title: "12. Design Trade-offs & Future Limitations",
      content: [
        "No engineering design is perfect. We intentionally accept specific trade-offs to keep the architecture clean and maintainable:",
        "1. Metric Loss Priority: We prioritize host app stability over guaranteed metric delivery. If RabbitMQ is completely offline, telemetry is dropped.",
        "2. Per-Metric HTTP Calls: Currently, the SDK sends one HTTP request per completed route. Under extreme scale (100k RPS), network overhead can be reduced with batching.",
        "3. Relational Storage Limits: PostgreSQL is simple and robust, but for billions of raw datapoints per day, a specialized time-series store like ClickHouse or TimescaleDB would be the next step.",
        "4. Single RabbitMQ Node: Using a standalone RabbitMQ node creates a single point of queue failure. Production clusters should use RabbitMQ Quorum Queues across 3 availability zones.",
        "5. 60-Second Alert Latency: Evaluating alerts via a 1-minute cron job introduces up to 60s detection lag, which is acceptable for general backend API telemetry."
      ]
    },
    {
      id: "scaling-10x",
      title: "13. Scaling to 10× Throughput",
      content: [
        "When traffic scales by 10× (e.g., from 1,000 RPS to 10,000+ RPS), we don't discard the system. We unlock four high-leverage scaling levers:",
        "1. In-Memory SDK Metric Batching:",
        "Instead of making an HTTP call for every single request, the SDK buffers metrics in an in-memory queue and flushes them in batches (e.g., every 100 metrics or every 3 seconds). This reduces network HTTP calls by 99%.",
        "2. Horizontal Stateless API Scaling:",
        "Since the Monitoring API layer is stateless, we can instantly scale from 2 API instances to 10 instances behind an AWS ALB / NGINX load balancer.",
        "3. Worker Pool Expansion:",
        "We can increase worker containers from 3 to 15 nodes. RabbitMQ automatically balances queue partition loads across workers without any code changes.",
        "4. Database Read Replicas & Retention Pruning:",
        "We separate read queries (Dashboard API) to PostgreSQL Read Replicas while workers write to the Primary node. Old raw metrics are pruned automatically via table partitioning."
      ],
      diagramType: "scale-10x" as const
    },
    {
      id: "conclusion",
      title: "14. Conclusion & Philosophy",
      content: [
        "The biggest lesson from designing this system is that scalable architecture does not mean starting with maximum complexity.",
        "We started with the absolute simplest design:",
        "Backend -> Monitoring Server -> Database",
        "And then we evolved the system by asking iterative engineering questions:",
        "• The HTTP request adds latency? -> Make metric collection asynchronous.",
        "• High request volume overwhelms database writes? -> Introduce RabbitMQ queue buffering.",
        "• Metrics spike beyond single-thread processing? -> Add competing worker pools.",
        "• Raw metric table queries are slow? -> Add 1-minute, 1-hour, and 1-day rollup aggregations.",
        "• Traffic scaled by 10×? -> Enable in-memory SDK batching and horizontal load balancing.",
        "Start simple. Identify the real bottleneck. Solve it cleanly. Repeat."
      ]
    }
  ]
};
