export interface Profile {
  name: string;
  role: string;
  positioning: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  phone: string;
  status: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    cgpa: string;
    location: string;
  };
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    email: string;
  };
  resumeUrl: string;
}

export const profileData: Profile = {
  name: "Atithi Jaiman",
  role: "Backend & AI Engineer",
  positioning: "I specialize in scalable backend systems, distributed infrastructure, and AI applications.",
  tagline: "Distributed Backend Systems • High-Throughput Pipelines • AI Applications",
  bio: [
    "I specialize in backend engineering, distributed infrastructure, and high-throughput systems — building resilient event pipelines, databases, and microservices alongside AI integration.",
    "Driven by first-principles engineering, robust system architecture, and algorithmic rigor (LeetCode Knight). Focused on building scalable backends that power intelligent software.",
  ],
  location: "Jaipur, Rajasthan / Dharwad, India",
  email: "atithijaiman29@gmail.com",
  phone: "+91 6378184095",
  status: "Available for Backend & AI Engineering Roles",
  education: {
    institution: "Indian Institute of Information Technology, Dharwad",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2023 – 2027",
    cgpa: "8.05",
    location: "Dharwad, Karnataka",
  },
  socials: {
    github: "https://github.com/Atithi2908",
    linkedin: "https://linkedin.com/in/atithi-jaiman",
    leetcode: "https://leetcode.com/u/Atithi_jaiman",
    email: "mailto:atithijaiman29@gmail.com",
  },
  resumeUrl: "/Atithi_Jaiman_Resume.pdf",
};
