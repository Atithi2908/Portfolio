"use client";

import React from "react";
import { skillsData } from "@/data/skills";
import {
  Code,
  Bot,
  Server,
  Cloud,
  Terminal,
  Sparkles,
} from "lucide-react";

export const SkillsSection = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Bot":
        return <Bot className="w-4 h-4 text-[#D4A373]" />;
      case "Server":
        return <Server className="w-4 h-4 text-[#C89666]" />;
      case "Cloud":
        return <Cloud className="w-4 h-4 text-[#DDA15E]" />;
      default:
        return <Code className="w-4 h-4 text-[#D4A373]" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-[#2e251e] relative bg-[#12100e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs font-mono text-[#D4A373]">
            <Terminal className="w-3.5 h-3.5" />
            <span>04 // TOOLS &amp; TECHNOLOGIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-3">
            <span>Tools &amp; Technologies</span>
            <Sparkles className="w-6 h-6 text-[#D4A373]" />
          </h2>
          <p className="text-sm sm:text-base text-[#b8ad9e] max-w-2xl font-sans leading-relaxed">
            Core technologies, programming languages, agent frameworks, and distributed backend infrastructure used to build systems.
          </p>
        </div>

        {/* 2x2 Grid of Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category, cIdx) => (
            <div
              key={cIdx}
              className="rounded-2xl bg-[#140f0c] border border-[#2e251e] p-6 sm:p-7 backdrop-blur-md shadow-xl hover:border-[#D4A373]/40 transition-all flex flex-col justify-between space-y-5"
            >
              {/* Card Header: Icon + Title */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#231b15]">
                <div className="p-2.5 rounded-xl bg-[#1c1611] border border-[#3d332a]">
                  {getCategoryIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Flex-wrap list of tool pill badges */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {category.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#1c1611] text-[#e6ccb2] border border-[#382d24] hover:border-[#D4A373]/60 hover:text-white hover:bg-[#251d17] transition-all duration-200 cursor-default select-none shadow-sm"
                  >
                    {tool}
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
