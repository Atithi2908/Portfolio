export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  highlights: {
    label: string;
    value: string;
    color: "amber" | "emerald" | "cyan" | "purple" | "rose";
  }[];
}

export const blogsData: BlogPost[] = [
  {
    id: "backend-monitoring-system-design",
    slug: "backend-monitoring-system-design",
    title: "Designing a Backend Monitoring System: From Naive HTTP Calls to 10× Distributed Scale",
    description:
      "A deep technical walk-through on building a real-time backend monitoring system. Step-by-step evolution covering non-blocking SDKs, RabbitMQ load-buffering, PostgreSQL time-bucket rollups, stateful Slack alerting, and 10× scale optimizations.",
    date: "September 2024",
    readTime: "12 min read",
    author: {
      name: "Atithi Jaiman",
      role: "Backend & Systems AI Engineer",
      avatar: "/avatar.png",
    },
    tags: ["System Design", "Distributed Systems", "RabbitMQ", "PostgreSQL", "Node.js", "SDK Architecture"],
    featured: true,
    highlights: [
      { label: "SDK Overhead", value: "Non-Blocking", color: "emerald" },
      { label: "Ingestion Queue", value: "RabbitMQ Buffer", color: "amber" },
      { label: "DB Aggregation", value: "Time Buckets", color: "cyan" },
      { label: "Alert Engine", value: "State Transitioned", color: "purple" },
      { label: "Scale Strategy", value: "10× Distributed Blueprint", color: "rose" },
    ],
  },
];
