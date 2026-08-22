"use client";

import React from "react";
import { achievementsData } from "@/data/achievements";
import {
  Trophy,
  Flame,
  Code2,
  ExternalLink,
  Award,
  Sparkles,
  Zap,
} from "lucide-react";

export const AchievementsSection = () => {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "Trophy":
        return <Trophy className="w-6 h-6 text-[#D4A373]" />;
      case "Flame":
        return <Flame className="w-6 h-6 text-[#f97316]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#38bdf8]" />;
    }
  };

  return (
    <section id="achievements" className="py-20 md:py-28 border-t border-[#2e251e] relative bg-[#12100e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs font-mono text-[#D4A373]">
            <Award className="w-3.5 h-3.5" />
            <span>05 // COMPETITIVE PROGRAMMING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-3">
            <span>Competitive Programming Milestones</span>
            <Sparkles className="w-6 h-6 text-[#D4A373]" />
          </h2>
          <p className="text-sm sm:text-base text-[#b8ad9e] max-w-2xl font-sans leading-relaxed">
            High-speed algorithmic problem solving and contest performance under strict time and space constraints.
          </p>
        </div>

        {/* 3 Key Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-[#140f0c] border border-[#2e251e] hover:border-[#D4A373]/60 p-7 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D4A373]/10"
            >
              <div className="space-y-5">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-[#1c1611] border border-[#3d332a] group-hover:border-[#D4A373]/50 transition-colors">
                    {getAchievementIcon(item.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1c1611] border border-[#3d332a] text-[#D4A373] font-semibold">
                    {item.badge}
                  </span>
                </div>

                {/* Main Stat Highlight */}
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight group-hover:text-[#D4A373] transition-colors">
                    {item.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-[#e6ccb2] tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#b8ad9e] font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Profile Link */}
              {item.link && (
                <div className="mt-6 pt-4 border-t border-[#231b15] flex items-center justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4A373] hover:text-white transition-colors"
                  >
                    <span>View Handle</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
