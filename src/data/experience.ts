export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  impactHighlights: {
    title: string;
    description: string;
    metrics?: string;
  }[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "trivion-technologies",
    company: "Trivion Technologies",
    role: "Full Stack AI Engineer Intern",
    period: "May 2026 – Jul 2026",
    location: "Remote / Bengaluru",
    summary:
      "Engineered automated media processing pipelines, speech-to-text transcription workflows, and background worker systems for structured LinkedIn content generation.",
    impactHighlights: [
      {
        title: "LLM Post Generation Engine",
        description:
          "Integrated an LLM API to transform speech transcripts into structured LinkedIn posts with automated content generation.",
      },
      {
        title: "Audio Processing Pipeline",
        description:
          "Built an audio processing pipeline using FFmpeg for speech-to-text transcription and downstream LLM processing.",
      },
      {
        title: "Resilient Background Sync Worker",
        description:
          "Automated Cron/manual sync with a background worker, preventing duplicates and scheduling LinkedIn posts.",
      },
    ],
    technologies: [
      "Python",
      "Node.js",
      "LLM APIs",
      "Speech-to-Text",
      "FFmpeg",
      "Cron Workers",
      "REST APIs",
      "Git",
    ],
  },
];
