export interface SkillCategory {
  title: string;
  iconName: string;
  tools: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Web & Backend Development",
    iconName: "Server",
    tools: [
      "Node.js",
      "Express.js",
      "RabbitMQ",
      "Redis",
      "WebSocket",
      "REST APIs",
      "Prisma ORM",
      "PostgreSQL",
    ],
  },
  {
    title: "Programming Languages",
    iconName: "Code",
    tools: ["Go (Golang)", "C++", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "DevOps, Cloud & Infrastructure",
    iconName: "Cloud",
    tools: [
      "Docker",
      "AWS",
      "Azure",
      "Jenkins CI/CD",
      "MongoDB",
      "Git & GitHub",
      "Linux",
      "Jest & Testing",
    ],
  },
  {
    title: "AI & Autonomous Systems",
    iconName: "Bot",
    tools: [
      "LangGraph",
      "LangChain",
      "RAG Systems",
      "Qdrant Vector DB",
      "Ollama",
      "Playwright",
      "PyWinAuto",
      "PyAutoGUI",
    ],
  },
];
