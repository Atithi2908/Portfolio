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
    location: "Remote",
    summary:
      "Engineered end-to-end automated media pipelines and agentic LLM workflows to convert multi-format audiovisual content into structured, high-engagement LinkedIn posts.",
    impactHighlights: [
      {
        title: "Automated Audiovisual Pipeline & STT",
        description:
          "Built an automated media extraction pipeline using FFmpeg to strip and normalize audio from video reels, integrating Deepgram's Speech-to-Text API for high-fidelity timestamped transcriptions.",
        metrics: "High-accuracy transcription with automated audio chunking",
      },
      {
        title: "LLM Post-Generation Engine",
        description:
          "Integrated structured LLM prompting and post-processing APIs to distill lengthy transcripts into formatted, hook-driven LinkedIn posts tailored for social audience retention.",
        metrics: "Substituted hours of manual writing with instant generation",
      },
      {
        title: "Resilient Background Automation Worker",
        description:
          "Developed a background automation worker supporting dual-mode execution (Cron-triggered scheduled batches and manual on-demand sync). Built deduplication logic to eliminate redundant Reel processing and reliably queue scheduled LinkedIn posts.",
        metrics: "Zero duplicate processing & automated dispatch queue",
      },
    ],
    technologies: [
      "Python",
      "Node.js",
      "LLM APIs",
      "Deepgram STT",
      "FFmpeg",
      "Cron Workers",
      "REST APIs",
      "Git",
    ],
  },
];
