"use client";

import React from "react";
import { projectsData } from "@/data/projects";
import { ExpandableProjectsList } from "./ui/expandable-card";
import { Terminal } from "lucide-react";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-28 border-t border-[#2e251e] relative bg-[#12100e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs font-mono text-[#D4A373]">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // FEATURED SYSTEMS &amp; PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Featured Systems &amp; Technical Case Studies
          </h2>
          <p className="text-sm sm:text-base text-[#b8ad9e] max-w-2xl font-sans leading-relaxed">
            Interactive architectural breakdowns of multi-layer agent state machines, distributed telemetry pipelines, and sub-second in-memory matching engines. Click any card to expand the full technical case study.
          </p>
        </div>

        {/* Expandable Project Cards Grid */}
        <ExpandableProjectsList projects={projectsData} />

      </div>
    </section>
  );
};
