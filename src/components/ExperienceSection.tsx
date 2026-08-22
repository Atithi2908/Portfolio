import React from "react";
import { experienceData } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle2, Zap } from "lucide-react";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-[#2e251e] relative bg-[#12100e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs font-mono text-[#D4A373]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>02 // WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Experience &amp; Impact
          </h2>
          <p className="text-sm sm:text-base text-[#b8ad9e] max-w-2xl font-sans leading-relaxed">
            Production contributions focused on automated audiovisual pipelines, STT transcription integrations, and deduplicated cron workers.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl bg-[#120e0b]/90 border border-[#2e251e] p-6 sm:p-8 backdrop-blur-md shadow-xl hover:border-[#D4A373]/40 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-[#2e251e]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-[#E6CCB2] px-2.5 py-0.5 rounded-md bg-[#D4A373]/15 border border-[#D4A373]/40">
                      @ {exp.company}
                    </span>
                  </div>
                  <p className="text-xs text-[#a89b8a] font-mono">
                    {exp.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#a89b8a]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Impact Highlights */}
              <div className="my-6 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#a89b8a]">
                  Core Engineering Impact &amp; Deliverables:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exp.impactHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#17120d] border border-[#2e251e] space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                          <Zap className="w-3.5 h-3.5 text-[#D4A373] flex-shrink-0" />
                          <span>{highlight.title}</span>
                        </div>
                        <p className="text-xs text-[#d6cdbf] leading-relaxed font-sans">
                          {highlight.description}
                        </p>
                      </div>

                      {highlight.metrics && (
                        <div className="pt-2 border-t border-[#2e251e] text-[11px] font-mono text-[#E6CCB2] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#D4A373]" />
                          <span>{highlight.metrics}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#2e251e]">
                <span className="text-xs font-mono text-[#8c7e6e] mr-2">
                  Stack:
                </span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-[#1a140f] border border-[#382d24] text-[11px] font-mono text-[#d6cdbf]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
