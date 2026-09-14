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
  positioning: "I like building backend systems and figuring out what happens behind the scenes when they start getting complicated.",
  tagline: "Distributed Backend Systems • System Design • AI Agents",
  bio: [
    "I like building backend systems and figuring out what happens behind the scenes when they start getting complicated. My main interests are system design and distributed systems, and lately I’ve been exploring AI agents.",
    "I use AI regularly while coding, but I’m the kind of developer who still wants to understand the code, question it, and test it before trusting it.",
  ],
  location: "Bengaluru, Karnataka / Dharwad, India",
  email: "atithijaiman29@gmail.com",
  phone: "+91 6378184095",
  status: "Open for Backend & AI Related Opportunities",
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
