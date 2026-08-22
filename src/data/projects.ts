export interface ProjectArchitectureLayer {
  layer: string;
  name: string;
  description: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  period: string;
  category: string;
  badge: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  problem: {
    context: string;
    coreBottleneck: string;
    whyItMatters: string;
  };
  architecture: {
    summary: string;
    flow: string[];
    layers?: ProjectArchitectureLayer[];
  };
  keyDecisions: {
    decision: string;
    rationale: string;
    tradeOff: string;
  }[];
  outcome: {
    highlights: string[];
    metrics?: string[];
  };
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "nexa",
    title: "NEXA — Autonomous Multi-Layer AI Agent",
    tagline: "5-layer agent framework with real-time UI observation, OS automation, and grounded vector memory",
    period: "Apr 2026 – Jun 2026",
    category: "Autonomous Agents & AI Systems",
    badge: "Featured AI Architecture",
    tech: [
      "Python",
      "LangChain",
      "LangGraph",
      "Ollama",
      "Qdrant",
      "Playwright",
      "PyAutoGUI",
      "PyWinAuto",
    ],
    githubUrl: "https://github.com/Atithi2908",
    problem: {
      context:
        "Traditional LLM assistants operate solely in text sandboxes, lacking the capability to interact with dynamic web applications and native desktop OS environments.",
      coreBottleneck:
        "Standard linear LLM prompt chains suffer from state hallucination, inability to recover from unexpected UI shifts, and extreme latency when relying entirely on raw vision snapshots.",
      whyItMatters:
        "Real enterprise automation requires agents that reliably perceive live UI state across heterogeneous applications, reason over historical context, and execute complex multi-step workflows without silent failures.",
    },
    architecture: {
      summary:
        "Architected a modular 5-layer state-machine execution pipeline powered by LangGraph, combining structural UI accessibility trees with grounded vector recall.",
      flow: [
        "Goal Ingestion → LangGraph State Machine decomposes user intent into directed cyclic execution nodes.",
        "Observation Engine → Playwright DOM parser & Windows UI Automation APIs extract live structured element trees with coordinates.",
        "Memory Grounding → Qdrant vector database retrieves past task episodes, user schemas, and semantic documents.",
        "Action Planning → Ollama / Cloud LLM reasons over structured UI state and selects verified tools.",
        "Execution & Verification → Sandboxed browser/OS drivers execute actions (clicks, keypresses, file I/O) with immediate post-action visual verification.",
      ],
      layers: [
        {
          layer: "Layer 1: Orchestration",
          name: "LangGraph State Machine",
          description:
            "Manages cycle detection, error checkpoints, and state rollbacks across multi-step execution graphs.",
        },
        {
          layer: "Layer 2: Perception",
          name: "Dual UI Observation Engine",
          description:
            "Extracts DOM accessibility nodes in web contexts and Windows UI Automation trees for native desktop apps.",
        },
        {
          layer: "Layer 3: Memory",
          name: "Qdrant Vector Storage",
          description:
            "Embeds and retrieves past execution trajectories, user documents, and system context via similarity search.",
        },
        {
          layer: "Layer 4: Reasoning",
          name: "Hybrid LLM Planner",
          description:
            "Combines local Ollama inference for zero-latency deterministic planning with frontier models for open-ended queries.",
        },
        {
          layer: "Layer 5: Tooling",
          name: "Sandboxed Tool Layer",
          description:
            "Unified driver interfaces for Playwright, PyAutoGUI, PyWinAuto, terminal execution, and web search.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "LangGraph Cyclic State Machine over Single-Prompt Linear Chains",
        rationale:
          "Linear chains crash whenever an unexpected popup or delayed page load occurs. LangGraph allowed explicit self-correction loops and checkpointed state recovery.",
        tradeOff:
          "Higher initial graph setup complexity in exchange for 10x higher execution reliability across 10+ step workflows.",
      },
      {
        decision: "Structural Accessibility Trees + Coordinate Mapping over Pure Vision Screengrabs",
        rationale:
          "Sending full high-resolution desktop screenshots on every step was slow and expensive. Extracting DOM / Windows UI trees reduced token overhead by >80% and eliminated coordinate misclicks.",
        tradeOff:
          "Requires OS-specific accessibility bindings (PyWinAuto/Playwright), but yields deterministic element targeting.",
      },
      {
        decision: "Qdrant Vector Memory for Grounded Task Retrieval",
        rationale:
          "Prevents repetitive exploratory actions by indexing successful past execution paths and grounding agent knowledge in local files.",
        tradeOff:
          "Requires embedding generation overhead, offset by caching vector representations of static UI hierarchies.",
      },
    ],
    outcome: {
      highlights: [
        "Reliably executed complex cross-application tasks (e.g. searching web data, parsing tables, populating local desktop software, and saving organized reports).",
        "Unified web DOM and Windows native OS automation under a singular, declarative tool schema.",
        "Zero-shot recovery on common UI transient states (modal dialogs, loading spinners, network timeouts).",
      ],
      metrics: [
        "5-Layer Modular Architecture",
        ">80% Token Reduction vs Pure Vision",
        "Deterministic Cross-Platform UI Automation",
      ],
    },
  },
  {
    id: "backend-monitoring",
    title: "Backend Monitoring System",
    tagline: "Plug-and-play asynchronous metrics SDK with RabbitMQ ingestion pipeline and automated alerting",
    period: "Jan 2026 – Mar 2026",
    category: "Distributed Systems & Cloud Infrastructure",
    badge: "Distributed Architecture",
    tech: [
      "RabbitMQ",
      "Docker",
      "Jenkins",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "AWS",
    ],
    githubUrl: "https://github.com/Atithi2908",
    problem: {
      context:
        "High-volume microservices require constant monitoring of latency percentiles (p50, p95, p99), error rates, and resource utilization.",
      coreBottleneck:
        "Synchronous metrics instrumentation often degrades HTTP response times, while direct database writes create catastrophic locking bottlenecks during traffic spikes.",
      whyItMatters:
        "Observability infrastructure must be non-intrusive, guaranteed never to take down the host service, and capable of detecting anomalies before customers experience outages.",
    },
    architecture: {
      summary:
        "Designed a non-blocking instrumentation SDK coupled to a decoupled RabbitMQ message queue, high-throughput consumer worker pool, and real-time threshold alert engine.",
      flow: [
        "Client Request → Embedded Node.js SDK captures response time, HTTP status, and memory stats in an asynchronous ring buffer.",
        "Asynchronous Dispatch → SDK batches events and publishes to RabbitMQ topic exchange without blocking the active request lifecycle.",
        "Worker Ingestion Pool → Scalable consumer workers consume queue messages, calculate moving averages, and aggregate metrics.",
        "Storage & Persistence → Batch-persisted to PostgreSQL via Prisma ORM for time-series aggregation and analytics.",
        "Alert Evaluation Engine → Evaluates error rates and latency thresholds against moving averages, dispatching instant Slack webhook notifications.",
        "CI/CD & Cloud → Automated container build, testing, and deployment to AWS via Docker and Jenkins pipelines.",
      ],
      layers: [
        {
          layer: "Component 1",
          name: "Asynchronous Node.js SDK",
          description:
            "Plug-and-play middleware interceptor with sub-millisecond overhead and non-blocking in-memory batch buffers.",
        },
        {
          layer: "Component 2",
          name: "RabbitMQ Message Queue",
          description:
            "Durable message broker acting as an elastic buffer during traffic spikes, ensuring zero dropped telemetry events.",
        },
        {
          layer: "Component 3",
          name: "Metrics Aggregation Workers",
          description:
            "Decoupled worker services that parse raw metric payloads, compute sliding-window percentiles, and batch DB writes.",
        },
        {
          layer: "Component 4",
          name: "Threshold Alerting & Webhooks",
          description:
            "Real-time rule evaluator that triggers instant Slack alerts when latency or error spikes cross critical thresholds.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "RabbitMQ Message Broker Ingestion over Direct Database Writes",
        rationale:
          "Direct writes to PostgreSQL under 5,000+ req/sec create database connection pool exhaustion. RabbitMQ safely absorbs spikes while worker pools persist data at a controlled rate.",
        tradeOff:
          "Introduced queue infrastructure to maintain, but eliminated database contention and guaranteed monitored service stability.",
      },
      {
        decision: "Asynchronous In-Memory Ring Buffer in Client SDK",
        rationale:
          "Flushing metrics per-request adds TCP connection latency. Batching metrics every 500ms or 100 events reduced network I/O calls by 98%.",
        tradeOff:
          "Up to 500ms delay in metric ingestion, completely acceptable for system health monitoring.",
      },
      {
        decision: "Automated Jenkins CI/CD on AWS with Docker",
        rationale:
          "Containerized multi-service deployment (SDK mock, RabbitMQ, Worker, Postgres, Alert engine) ensuring reproducible staging and zero-downtime rolling updates.",
        tradeOff:
          "Requires dedicated Jenkins server configuration, but eliminated manual deployment drift.",
      },
    ],
    outcome: {
      highlights: [
        "Built plug-and-play middleware integrating into any Express/Node application in under 3 lines of code.",
        "Maintained sub-millisecond (<0.5ms) latency impact on host request pipelines.",
        "Engineered reliable automated Slack notifications for instant incident discovery and MTTR reduction.",
      ],
      metrics: [
        "< 0.5ms SDK Latency Overhead",
        "Zero Dropped Events via RabbitMQ Buffering",
        "Automated CI/CD Deployment via Docker & Jenkins",
      ],
    },
  },
  {
    id: "distributed-cache-go",
    title: "Distributed In-Memory Cache in Go",
    tagline: "Redis-inspired distributed key-value store built from scratch in Go with custom TCP protocol, CRC32 consistent hashing, and 2/3 quorum replication",
    period: "May 2026 – Jul 2026",
    category: "Distributed Systems & Systems Programming",
    badge: "Featured Systems Project",
    tech: [
      "Go",
      "TCP Networking",
      "Goroutines",
      "RWMutex",
      "Consistent Hashing",
      "Replication & Quorum",
      "Failure Recovery",
    ],
    githubUrl: "https://github.com/Atithi2908",
    problem: {
      context:
        "High-throughput microservices require distributed caching to relieve database pressure without single points of failure.",
      coreBottleneck:
        "Single-node caches crash under high concurrency and traffic spikes, while naive round-robin routing creates uneven key distribution and total data loss during node failures.",
      whyItMatters:
        "Building a resilient distributed cache requires custom TCP networking, thread-safe memory storage, consistent hash partitioning, quorum-based consensus, and background failure detection.",
    },
    architecture: {
      summary:
        "Designed a modular distributed caching system in Go, featuring a thread-safe map engine, raw TCP socket protocol, CRC32 consistent hash ring with virtual nodes, concurrent 2/3 quorum write/read replication, and node health recovery.",
      flow: [
        "Client Query Ingestion → Client sends GET/SET/DELETE payload over custom TCP protocol connection.",
        "Consistent Hash Ring Partitioning → Router hashes the key using CRC32 and maps it onto a ring of virtual nodes to select target physical nodes.",
        "Concurrent Quorum Dispatch → Router spawns goroutines to dispatch writes/reads concurrently across 3 replica nodes.",
        "Read/Write Quorum Evaluation → Validates success threshold (2 out of 3 node acknowledgments required for Write/Read Quorum success).",
        "Health Monitoring & Rebalancing → Router tracks node health via background ping probes, rerouting traffic away from failed nodes and rebalancing keys upon recovery.",
      ],
      layers: [
        {
          layer: "Layer 1: Storage Engine",
          name: "Thread-Safe In-Memory Cache",
          description:
            "Go map[string][]byte protected by sync.RWMutex supporting SET, GET, DELETE, and DUMP with sub-microsecond latency.",
        },
        {
          layer: "Layer 2: Networking",
          name: "Raw TCP Socket Protocol Server",
          description:
            "Go net package TCP server spawning goroutines per client connection for non-blocking binary command parsing.",
        },
        {
          layer: "Layer 3: Partitioning",
          name: "CRC32 Consistent Hash Ring",
          description:
            "Custom hash ring with virtual nodes for uniform key distribution across physical cache nodes.",
        },
        {
          layer: "Layer 4: Consensus",
          name: "Replication, Quorum & Health Check",
          description:
            "Concurrent 2/3 quorum execution, node failure detection (markUnhealthy), and background key rebalancing.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "Custom TCP Protocol over HTTP/REST",
        rationale:
          "Eliminates HTTP header parsing overhead and TCP connection handshakes per request, enabling raw binary payload streaming.",
        tradeOff:
          "Requires custom client protocol parser, yielding microsecond-level socket response times.",
      },
      {
        decision: "CRC32 Consistent Hash Ring with Virtual Nodes",
        rationale:
          "Prevents hot spots and key cluster migration when nodes join or leave the cluster by mapping each physical node to multiple virtual ring positions.",
        tradeOff:
          "Slightly higher hash ring lookup computation, offset by O(log N) binary search positioning.",
      },
      {
        decision: "2/3 Read & Write Quorum Replication",
        rationale:
          "Guarantees strong consistency and high availability (tolerating 1 node failure out of 3) without requiring full 3/3 sync locking.",
        tradeOff:
          "Requires concurrent goroutine dispatch and channels to gather quorum acknowledgments.",
      },
    ],
    outcome: {
      highlights: [
        "Built a Redis-inspired distributed key-value store from scratch in pure Go without external database dependencies.",
        "Implemented sub-microsecond in-memory operations with sync.RWMutex concurrent read locks.",
        "Engineered 2/3 quorum replication and background node recovery with automatic key rebalancing.",
      ],
      metrics: [
        "Custom TCP Protocol & Binary Parsing",
        "CRC32 Consistent Hash Ring with Virtual Nodes",
        "2/3 Write & Read Quorum Consensus",
      ],
    },
  },
  {
    id: "tradeincase",
    title: "TradeInCase — Real-Time Trading Simulator",
    tagline: "Sub-second virtual trading engine with Redis in-memory limit order matching and live WebSocket feed",
    period: "Oct 2025 – Dec 2025",
    category: "Real-Time Systems & High-Throughput Engines",
    badge: "Sub-Second Execution",
    tech: [
      "React",
      "Express.js",
      "WebSocket",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Azure",
    ],
    githubUrl: "https://github.com/Atithi2908",
    problem: {
      context:
        "Simulated trading systems need to provide users with authentic market dynamics, instant feedback on order placement, and live price movements without latency lag.",
      coreBottleneck:
        "Traditional relational database queries for order book matching create heavy locking overhead, making sub-second live price matching impossible over standard REST polling.",
      whyItMatters:
        "Financial simulations must mirror real exchange architectures—handling instantaneous order state transitions, real-time portfolio recalculations, and concurrent trade settlements.",
    },
    architecture: {
      summary:
        "Engineered a dual-tier matching architecture leveraging Redis in-memory data structures for instant limit order evaluation and WebSockets for real-time client state broadcast.",
      flow: [
        "Live Market Feeds → Background price generator simulates stochastic asset fluctuations and pushes updates to the WebSocket server.",
        "WebSocket Broadcast → Sub-second price ticks streamed directly to connected React client terminals.",
        "Order Submission → Buy/Sell limit and market orders placed by users are dispatched via WebSocket/REST.",
        "Redis In-Memory Matching → Redis Sorted Sets (ZSETs) evaluate price-time priority matching with sub-millisecond lookup times.",
        "Settlement & Persistence → Matched transactions and wallet balance updates are settled and persisted asynchronously to PostgreSQL.",
        "Portfolio Tracking → Real-time P&L and order status updates streamed back to the client interface instantly.",
      ],
      layers: [
        {
          layer: "Front-End",
          name: "React Real-Time Trading Terminal",
          description:
            "Dynamic order entry, live updating price charts, order history, and instant P&L recalculation.",
        },
        {
          layer: "Communication",
          name: "Bi-directional WebSocket Engine",
          description:
            "Low-latency streaming channel delivering sub-second market data ticks and order status updates.",
        },
        {
          layer: "Core Engine",
          name: "Redis In-Memory Order Book",
          description:
            "Sorted Sets and Hashes organizing bid/ask books for ultra-fast price-time priority matching.",
        },
        {
          layer: "Persistence",
          name: "PostgreSQL Settlement Ledger",
          description:
            "ACID-compliant storage for completed trades, historical performance, and user account balances.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "Redis In-Memory Sorted Sets for Limit Order Matching",
        rationale:
          "Executing SQL queries like `SELECT * FROM orders WHERE price <= current_price ORDER BY timestamp` on every tick creates fatal database bottlenecks. Redis ZSETs provided O(log N) price matching in RAM.",
        tradeOff:
          "In-memory data requires periodic snapshots and careful asynchronous reconciliation with PostgreSQL.",
      },
      {
        decision: "Full-Duplex WebSockets over HTTP Polling",
        rationale:
          "HTTP polling wastes bandwidth and adds 500ms–2000ms latency. WebSockets allowed instantaneous push notifications for price updates and order fills.",
        tradeOff:
          "Requires persistent connection management and heartbeat mechanisms on the Express server.",
      },
      {
        decision: "Containerized Azure VM Deployment with CI/CD",
        rationale:
          "Dockerized the front-end, back-end server, Redis, and PostgreSQL instances into an orchestrated multi-container setup deployed automatically on Azure.",
        tradeOff:
          "Configuring multi-service networking and port forwarding on Azure VM, resulting in single-command deployment reproducibility.",
      },
    ],
    outcome: {
      highlights: [
        "Engineered full virtual trading lifecycle: order placement, real-time matching, portfolio valuation, and trade settlement.",
        "Achieved sub-second price propagation across client sessions with persistent WebSocket channels.",
        "Automated build and continuous deployment workflows to Azure VM using Docker containers.",
      ],
      metrics: [
        "Sub-Second Real-Time Updates",
        "O(log N) Redis In-Memory Order Book Matching",
        "Automated Docker CI/CD on Azure",
      ],
    },
  },
  {
    id: "geo-fencing",
    title: "Real-Time Geo-Fenced Attendance System",
    tagline: "Location-verified attendance platform using Socket.IO real-time coordination, geolib polygon spatial validation, and automated student domain verification",
    period: "Feb 2026 – Apr 2026",
    category: "Real-Time Spatial Systems & Backend Services",
    badge: "Spatial Geofencing",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "Geolib",
      "JWT",
      "Nodemailer",
      "React",
      "Vite",
    ],
    githubUrl: "https://github.com/Atithi2908/geo-fencing",
    problem: {
      context:
        "Educational institutions require tamper-proof attendance verification that prevents remote student check-ins without requiring expensive biometric hardware.",
      coreBottleneck:
        "Simple single-point GPS radius checks are easily spoofed and fail to accurately model non-circular classroom geometry, while manual attendance wastes valuable lecture time.",
      whyItMatters:
        "Location-verified attendance requires combining real-time session state machine coordination with precise spatial polygon math and instant teacher dashboard synchronization.",
    },
    architecture: {
      summary:
        "Built a real-time event-driven attendance backend where active sessions broadcast Socket.IO triggers, collect GPS coordinates, validate points against polygon room boundaries using geolib, and aggregate live presence states.",
      flow: [
        "Teacher Session Trigger → Teacher initiates session specifying room, branch, and admission year; backend fetches room polygon coordinates and spawns Socket.IO session room.",
        "Socket.IO Broadcast → Backend pushes attendanceStarted event to target students and creates isolated per-student socket channels.",
        "GPS Ingestion & Spatial Math → Students dispatch GPS coordinates (latitude, longitude, roomNo); backend verifies active eligibility and executes geolib.isPointInPolygon() against stored room coordinates.",
        "Accumulation & Persistence → Atomically updates presentCount / absentCount per student in MongoDB, emitting live attendanceUpdate events to teacher dashboard.",
        "Final Settlement → Session termination aggregates presentCount > absentCount status, persists final attendance records, and cleans up memory state.",
      ],
      layers: [
        {
          layer: "Layer 1: Real-Time Stream",
          name: "Socket.IO Event Coordinator",
          description:
            "Manages bidirectional room channels, pushing attendance triggers and live state updates to teacher dashboards.",
        },
        {
          layer: "Layer 2: Spatial Engine",
          name: "Geolib Polygon Boundary Evaluator",
          description:
            "Evaluates point-in-polygon spatial inclusion for arbitrary room geometry using isPointInPolygon().",
        },
        {
          layer: "Layer 3: Security & Auth",
          name: "JWT & IIIT Dharwad Domain Parser",
          description:
            "Validates student email structure for roll number/year and issues secure tokens with OTP Nodemailer verification.",
        },
        {
          layer: "Layer 4: Persistence",
          name: "MongoDB & Mongoose Schema Layer",
          description:
            "Stores historical attendance logs, teacher credentials, and room polygon definitions.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "Geolib Polygon Boundary Validation over Circular Radius Checks",
        rationale:
          "Classrooms are rectangular or polygonal. Circular radius checks either miss corners or include adjacent hallways. isPointInPolygon() enforces exact physical room boundaries.",
        tradeOff:
          "Slightly higher CPU calculation per coordinate submission, easily offset by caching room polygon arrays in RAM during active sessions.",
      },
      {
        decision: "Real-Time Socket.IO Bidirectional Streams over REST Polling",
        rationale:
          "REST polling by 60+ students during session start creates server spikes. Socket.IO allows push triggers and instant teacher dashboard live updates without manual page refreshes.",
        tradeOff:
          "Requires persistent socket connection lifecycle management and reconnection fallback handling.",
      },
      {
        decision: "Automated Email Parsing for IIIT Dharwad Domain Format",
        rationale:
          "Prevents unauthorized account registration by parsing admission year, branch, and roll number directly from verified institutional student emails.",
        tradeOff:
          "Strict schema dependent on domain formatting rules, protected by OTP Nodemailer verification.",
      },
    ],
    outcome: {
      highlights: [
        "Engineered end-to-end real-time attendance lifecycle: teacher session dispatch, student coordinate ingestion, spatial polygon validation, and live dashboard sync.",
        "Replaced manual attendance calls with 10-second automated spatial verification across entire classrooms.",
        "Implemented secure institutional email verification with Nodemailer and JWT authentication.",
      ],
      metrics: [
        "Polygon-Based Spatial Validation (isPointInPolygon)",
        "Real-Time Socket.IO Dashboard Sync",
        "Automated Institutional Student Verification",
      ],
    },
  },
  {
    id: "placement-prep",
    title: "Placement Preparation & Job Management Platform",
    tagline: "Full-stack placement platform combining interview preparation, daily quizzes, tasks, groups, and job application workflows with real-time Socket.IO messaging",
    period: "Nov 2025 – Jan 2026",
    category: "Full-Stack Platforms & Distributed Services",
    badge: "Full-Stack System",
    tech: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Provider",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "JWT",
    ],
    githubUrl: "https://github.com/Atithi2908",
    problem: {
      context:
        "Students preparing for technical placement drives need a unified workspace combining interview practice, daily quizzes, task tracking, group study rooms, and direct job application management.",
      coreBottleneck:
        "Fragmented tools force candidates to jump between separate messaging apps, practice portals, task boards, and job application forms, losing context and progress tracking.",
      whyItMatters:
        "Building a unified placement ecosystem requires structuring complex relational flows (Employers → Jobs → Candidates → Applications) alongside real-time socket messaging and mobile state management.",
    },
    architecture: {
      summary:
        "Architected a REST & Socket.IO backend paired with a cross-platform Flutter application using Riverpod & Provider state management, orchestrating candidate prep, daily quizzes, tasks, messaging, and job applications.",
      flow: [
        "Auth & Onboarding → JWT & bcrypt authentication handles candidate and employer registration with role-based access control.",
        "Prep & Daily Quizzes → Backend serves daily practice questions, manages timed quiz creation/submission, and tracks candidate task progress.",
        "Group Collaboration → Socket.IO messaging server enables real-time candidate group discussions and instant notifications.",
        "Job & Application Pipeline → Employers post jobs; candidates submit applications, triggering candidate-job-application relational tracking in MongoDB.",
        "Flutter State Integration → Cross-platform mobile client manages app state, offline caching, and real-time socket feeds via Riverpod & Provider.",
      ],
      layers: [
        {
          layer: "Layer 1: Mobile Client",
          name: "Flutter & Riverpod Application",
          description:
            "Cross-platform UI with modular state management, Lottie animations, TTS, and local storage.",
        },
        {
          layer: "Layer 2: Real-Time Stream",
          name: "Socket.IO Event Handlers",
          description:
            "Manages candidate group channels, real-time message streams, and task update notifications.",
        },
        {
          layer: "Layer 3: REST API & Auth",
          name: "Express.js Controller Pipeline",
          description:
            "Handles candidate, employer, job listing, quiz, and application CRUD endpoints with JWT protection.",
        },
        {
          layer: "Layer 4: Persistence",
          name: "MongoDB & Mongoose Schemas",
          description:
            "Structured schema models for Candidate, Employer, Job, Application, Group, Message, Task, and Question.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "Decoupled Job Application Relationship Schema (Employer → Job → Candidate → Application)",
        rationale:
          "Allows independent query optimization for candidate application histories and employer applicant tracking dashboards.",
        tradeOff:
          "Requires careful Mongoose reference populate operations and indexed foreign key references.",
      },
      {
        decision: "Socket.IO for Candidate Group Messaging over HTTP Polling",
        rationale:
          "Live candidate prep groups require instantaneous message delivery and typing feedback without polling latency.",
        tradeOff:
          "Maintained socket connection state alongside REST API tokens.",
      },
      {
        decision: "Riverpod & Provider Dual-Tier State Management in Flutter",
        rationale:
          "Separates global user authentication & socket state (Riverpod) from localized component form inputs (Provider).",
        tradeOff:
          "Slightly higher initial Flutter state setup complexity, yielding clean re-render performance.",
      },
    ],
    outcome: {
      highlights: [
        "Built complete placement preparation ecosystem: interview practice, daily quizzes, tasks, groups, and job application workflows.",
        "Engineered real-time socket messaging handlers for peer group preparation and instant notifications.",
        "Delivered responsive Flutter cross-platform mobile client backed by structured Node.js/MongoDB microservice architecture.",
      ],
      metrics: [
        "Multi-Entity Placement & Job Pipeline",
        "Real-Time Socket.IO Messaging Layer",
        "Cross-Platform Flutter Mobile Client",
      ],
    },
  },
];
