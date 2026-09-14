export interface SkillCategory {
  title: string;
  iconName: string;
  tools: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code",
    tools: ["C++", "Python", "Go (Golang)", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frameworks & APIs",
    iconName: "Server",
    tools: [
      "Node.js",
      "Express.js",
      "React",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "REST APIs",
    ],
  },
  {
    title: "Databases & Storage",
    iconName: "Database",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Qdrant Vector DB"],
  },
  {
    title: "AI & Automation",
    iconName: "Bot",
    tools: ["Ollama", "RAG Systems", "LLM Agents", "Playwright"],
  },
  {
    title: "DevOps & Cloud Infrastructure",
    iconName: "Cloud",
    tools: ["Docker", "Jenkins", "CI/CD", "RabbitMQ", "AWS", "Azure"],
  },
  {
    title: "Engineering Tools & Protocols",
    iconName: "Cpu",
    tools: ["Git", "GitHub", "Postman", "Jest", "Prisma", "WebSocket"],
  },
];
