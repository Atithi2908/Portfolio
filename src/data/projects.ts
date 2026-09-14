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
    title: "NEXA – AI Agent",
    tagline: "Modular 5-layer agent framework with real-time UI observation, vector memory, and tool orchestration",
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
    ],
    githubUrl: "https://github.com/Atithi2908/Agent_NEXA",
    problem: {
      context:
        "Traditional LLM assistants operate solely in text sandboxes, lacking the capability to interact with dynamic web applications and native desktop OS environments.",
      coreBottleneck:
        "Standard linear LLM prompt chains suffer from state hallucination, inability to recover from unexpected UI shifts, and high latency when relying entirely on vision snapshots.",
      whyItMatters:
        "Real enterprise automation requires agents that reliably perceive live UI state across web/desktop apps, reason over historical context, and execute complex multi-step workflows without silent failures.",
    },
    architecture: {
      summary:
        "Architected a modular 5-layer agent framework using LangGraph, enabling reliable execution of multi-step tasks paired with real-time UI perception and vector recall.",
      flow: [
        "Architected a modular 5-layer agent framework using LangGraph, enabling reliable execution of multi-step tasks.",
        "Built a unified UI observation engine using Playwright and Windows UI Automation APIs to extract structured interface state in real time.",
        "Integrated RAG with Qdrant vector storage to ground responses in user documents and prior interactions.",
        "Designed a tool orchestration layer for browser, desktop, filesystem, and web search actions.",
      ],
      layers: [
        {
          layer: "Layer 1: Orchestration",
          name: "LangGraph State Machine",
          description: "Enables reliable execution of multi-step tasks with directed cyclic state nodes and error checkpoints.",
        },
        {
          layer: "Layer 2: Perception",
          name: "Unified UI Observation Engine",
          description: "Extracts structured element trees in real time using Playwright and Windows UI Automation APIs.",
        },
        {
          layer: "Layer 3: Memory",
          name: "Qdrant Vector Storage RAG",
          description: "Grounds responses in user documents and prior interactions via vector similarity search.",
        },
        {
          layer: "Layer 4: Execution",
          name: "Tool Orchestration Layer",
          description: "Executes browser, desktop, filesystem, and web search actions safely.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "LangGraph Directed Cyclic State Machine over Single-Prompt Chains",
        rationale: "Allows state backtracking, conditional retries, and dynamic tool invocation during execution.",
        tradeOff: "Slightly higher initial graph definition complexity.",
      },
      {
        decision: "Dual Playwright + Windows UI Automation Engine",
        rationale: "Enables seamless interaction across both web applications and native OS desktop programs.",
        tradeOff: "Requires platform-specific accessibility tree parsers.",
      },
    ],
    outcome: {
      highlights: [
        "Architected a modular 5-layer agent framework using LangGraph for multi-step task execution.",
        "Built unified UI observation engine using Playwright and Windows UI Automation APIs.",
        "Integrated RAG with Qdrant vector storage to ground responses in prior interactions.",
        "Designed tool orchestration layer for browser, desktop, filesystem, and web search actions.",
      ],
      metrics: [
        "Modular 5-Layer LangGraph Framework",
        "Playwright + Windows UI Automation Engine",
        "Qdrant RAG Vector Grounding",
      ],
    },
  },
  {
    id: "distributed-cache",
    title: "Distributed Cache System",
    tagline: "O(1) thread-safe LRU & TTL cache core in Go with TCP routing, consistent hashing, and ~31.5k QPS replication",
    period: "Aug 2026 – Present",
    category: "Distributed Infrastructure & Systems",
    badge: "Distributed Systems Core",
    tech: [
      "Go",
      "TCP",
      "Goroutines",
      "Consistent Hashing",
      "Distributed Systems",
    ],
    githubUrl: "https://github.com/Atithi2908",
    problem: {
      context:
        "High-scale web applications require sub-microsecond in-memory caching to offload primary relational databases under intense traffic spikes.",
      coreBottleneck:
        "Standard hash maps suffer from thread lock contention under high concurrency, memory bloat from expired keys, and lack of distributed partition routing.",
      whyItMatters:
        "Building a production-grade distributed cache requires zero-allocation memory design, thread-safe synchronization primitives, and low-latency TCP socket networking.",
    },
    architecture: {
      summary:
        "Engineered an O(1) thread-safe LRU & TTL cache core using Go's sync.RWMutex and doubly-linked lists paired with a distributed TCP router.",
      flow: [
        "Engineered an O(1) thread-safe LRU & TTL cache core using Go's sync.RWMutex and doubly-linked lists with lazy/active eviction, achieving ~40ns GET/SET latency and zero-allocation key deletion.",
        "Architected a distributed TCP router with dynamic connection pooling and parallel goroutine-based replication, sustaining ~31,500 QPS across 50 concurrent clients.",
      ],
      layers: [
        {
          layer: "Layer 1: Network Router",
          name: "TCP Socket Router & Connection Pool",
          description: "Manages persistent TCP sockets and parallel goroutine client handlers.",
        },
        {
          layer: "Layer 2: Core Storage Engine",
          name: "O(1) Thread-Safe LRU & TTL Cache",
          description: "Uses Go sync.RWMutex and doubly-linked lists for ~40ns GET/SET latency.",
        },
        {
          layer: "Layer 3: Eviction Engine",
          name: "Lazy & Active TTL Eviction",
          description: "Prunes expired keys lazily on access and actively via background worker goroutines.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "Go sync.RWMutex & Doubly-Linked List over Channel Synchronization",
        rationale: "RWMutex allows concurrent read locking, enabling sub-microsecond (~40ns) read throughput without context-switch overhead.",
        tradeOff: "Requires explicit lock granularity management to prevent deadlocks.",
      },
      {
        decision: "Custom TCP Binary Protocol over HTTP REST Wrapper",
        rationale: "Eliminates HTTP header parsing overhead, allowing raw TCP socket frames to sustain ~31,500 QPS.",
        tradeOff: "Requires custom binary socket framing.",
      },
    ],
    outcome: {
      highlights: [
        "Engineered an O(1) thread-safe LRU & TTL cache core achieving ~40ns GET/SET latency.",
        "Architected a distributed TCP router with dynamic connection pooling and parallel goroutine replication.",
        "Sustained ~31,500 QPS across 50 concurrent clients with zero-allocation key deletion.",
      ],
      metrics: [
        "~40ns GET/SET Execution Latency",
        "31,500 QPS Across 50 Concurrent Clients",
        "Zero-Allocation Key Deletion",
      ],
    },
  },
  {
    id: "backend-monitoring",
    title: "Backend Monitoring System",
    tagline: "Plug-and-play monitoring SDK with RabbitMQ buffer, worker ingestion pipeline, and threshold alerting",
    period: "Jan 2026 – Mar 2026",
    category: "Backend Infrastructure & Telemetry",
    badge: "Distributed System Design",
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "RabbitMQ",
      "Jenkins",
    ],
    githubUrl: "https://github.com/Atithi2908/backend_monitoring",
    liveUrl: "/blogs/backend-monitoring-system-design",
    problem: {
      context:
        "Monolithic backend monitoring solutions add heavy latency overhead or crash host applications when telemetry ingestion endpoints slow down.",
      coreBottleneck:
        "Synchronous telemetry HTTP requests block application response threads, while direct database writes choke under sudden traffic surges.",
      whyItMatters:
        "Observability pipelines must guarantee complete isolation so that host applications never wait for telemetry metrics to complete.",
    },
    architecture: {
      summary:
        "Architected a non-blocking monitoring SDK paired with a RabbitMQ event buffer, worker ingestion pool, PostgreSQL time-bucket rollups, and containerized AWS deployment.",
      flow: [
        "Built a plug-and-play monitoring SDK that asynchronously captures request and system metrics with minimal latency overhead.",
        "Designed a RabbitMQ-based ingestion pipeline with worker services for reliable high-volume event processing.",
        "Implemented a threshold-based alert engine for latency spikes and error rates with real-time Slack notifications.",
        "Automated deployment of containerized services to AWS using Docker and Jenkins CI/CD.",
      ],
      layers: [
        {
          layer: "Layer 1: SDK",
          name: "Non-Blocking Telemetry Middleware",
          description: "Captures HTTP metrics on Express finish event without awaiting response.",
        },
        {
          layer: "Layer 2: Queue Buffer",
          name: "RabbitMQ Ingestion Broker",
          description: "Buffers high-volume incoming telemetry payloads to decouple ingestion from DB writes.",
        },
        {
          layer: "Layer 3: Processing",
          name: "Parallel Worker Pool",
          description: "Worker instances consume queue events, execute schema validation, and insert metrics.",
        },
        {
          layer: "Layer 4: CI/CD & Deploy",
          name: "Docker & Jenkins Pipeline on AWS",
          description: "Automates containerized build, testing, and deployment to AWS cloud infrastructure.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "RabbitMQ Message Buffer over Direct Synchronous DB Writes",
        rationale: "Protects PostgreSQL from traffic surges and decouples API response times.",
        tradeOff: "Requires managing AMQP worker consumer state and manual ACKs.",
      },
      {
        decision: "Asynchronous Non-Blocking SDK Event Dispatch",
        rationale: "Guarantees host applications never wait for or crash due to monitoring telemetry.",
        tradeOff: "Prioritizes application availability over 100% telemetry retention during complete outages.",
      },
    ],
    outcome: {
      highlights: [
        "Built plug-and-play monitoring SDK capturing request & system metrics with minimal latency overhead.",
        "Designed RabbitMQ-based ingestion pipeline with worker services for high-volume processing.",
        "Implemented threshold-based alert engine with real-time Slack notifications.",
        "Automated containerized deployment to AWS using Docker and Jenkins CI/CD.",
      ],
      metrics: [
        "Plug-and-Play Non-Blocking SDK",
        "RabbitMQ Load Buffer & Ingestion Pool",
        "AWS Deployment via Docker & Jenkins CI/CD",
      ],
    },
  },
  {
    id: "tradeincase",
    title: "TradeInCase – Trading Simulator",
    tagline: "Real-time virtual trading platform with sub-second WebSocket updates, Redis order matching, and Azure deployment",
    period: "Oct 2025 – Dec 2025",
    category: "Low-Latency & Real-Time Trading Engines",
    badge: "Sub-Second Execution",
    tech: [
      "React",
      "Express",
      "WebSocket",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    githubUrl: "https://github.com/Atithi2908/TradeInCase",
    problem: {
      context:
        "Simulated trading systems need to provide users with authentic market dynamics, instant order placement feedback, and live price movements without latency lag.",
      coreBottleneck:
        "Traditional relational database queries for order book matching create heavy locking overhead, making sub-second live price matching impossible over standard REST polling.",
      whyItMatters:
        "High-frequency financial applications demand in-memory data structures for order evaluation and full-duplex WebSocket streams for instant state synchronization.",
    },
    architecture: {
      summary:
        "Engineered a dual-tier matching architecture leveraging Redis in-memory data structures for instant limit order evaluation and WebSockets for real-time client state broadcast.",
      flow: [
        "Built a real-time virtual trading platform with live buy/sell execution, order management, and portfolio tracking using WebSocket for sub-second price updates.",
        "Leveraged Redis for low-latency limit order storage and price matching.",
        "Implemented a CI/CD pipeline on Azure VM with Docker to automate build and deployment workflows.",
      ],
      layers: [
        {
          layer: "Layer 1: Real-Time Stream",
          name: "Full-Duplex WebSocket Engine",
          description: "Pushes live price fluctuations, trade executions, and portfolio balance updates to connected clients.",
        },
        {
          layer: "Layer 2: Matching Engine",
          name: "Redis In-Memory Order Book",
          description: "Stores limit order books in Redis sorted sets for sub-second price matching.",
        },
        {
          layer: "Layer 3: Persistence & DevOps",
          name: "PostgreSQL & Azure VM Docker CI/CD",
          description: "Persists completed user trades and automates build/deployment via Docker on Azure VM.",
        },
      ],
    },
    keyDecisions: [
      {
        decision: "Redis Sorted Sets for In-Memory Limit Order Storage",
        rationale: "Sorted sets allow O(log N) price-time priority insertions and instant matching evaluation.",
        tradeOff: "Requires periodic sync to PostgreSQL for historical record persistence.",
      },
      {
        decision: "Full-Duplex WebSockets over REST Polling",
        rationale: "Delivers sub-second price ticks and execution confirmations without client polling overhead.",
        tradeOff: "Maintains persistent socket connections.",
      },
    ],
    outcome: {
      highlights: [
        "Built real-time virtual trading platform with live buy/sell execution, order management & portfolio tracking via WebSocket.",
        "Leveraged Redis for low-latency limit order storage and price matching.",
        "Implemented CI/CD pipeline on Azure VM with Docker to automate build & deployment.",
      ],
      metrics: [
        "Sub-Second Live WebSocket Updates",
        "Redis In-Memory Order Book Matching",
        "Azure VM Containerized Docker Pipeline",
      ],
    },
  },
];
