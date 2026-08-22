"use client";

import React, { useState } from "react";
import { ProjectCaseStudy } from "@/data/projects";
import {
  CheckCircle2,
  AlertCircle,
  Split,
  Workflow,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface CaseStudyCardProps {
  project: ProjectCaseStudy;
  index: number;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ project, index }) => {
  const [activeTab, setActiveTab] = useState<"architecture" | "decisions" | "outcomes">("architecture");

  return (
    <article
      id={project.id}
      className="rounded-2xl bg-[#120e0b]/90 border border-[#2e251e] p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all hover:border-[#D4A373]/50 hover:shadow-[0_0_30px_rgba(212,163,115,0.06)]"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2e251e]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-[#D4A373] font-medium">
              0{index + 1} // {project.badge}
            </span>
            <span className="text-xs font-mono text-[#a89b8a]">
              {project.period}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-[#d6cdbf] font-sans leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* GitHub & Links */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c1611] border border-[#3d332a] hover:border-[#D4A373]/60 hover:bg-[#261e17] text-xs font-mono text-[#e6ccb2] transition-all"
          >
            <GithubIcon className="w-4 h-4 text-[#D4A373]" />
            <span>GitHub Repo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#a89b8a]" />
          </a>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-1.5 py-4 border-b border-[#2e251e]/60">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-md bg-[#1a140f] border border-[#382d24] text-[11px] font-mono text-[#d6cdbf]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* The Problem Section */}
      <div className="my-6 p-4 sm:p-5 rounded-xl bg-[#18130e]/90 border border-[#2e251e]">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4A373] font-semibold mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>The Engineering Challenge</span>
        </div>
        <p className="text-sm text-[#d6cdbf] mb-2 leading-relaxed">
          {project.problem.context}
        </p>
        <p className="text-xs font-mono text-[#a89b8a] border-t border-[#2e251e] pt-2">
          <strong className="text-[#f5ebe0]">Core Bottleneck:</strong> {project.problem.coreBottleneck}
        </p>
      </div>

      {/* Tab Controls for Deep Dive */}
      <div className="flex items-center gap-2 border-b border-[#2e251e] pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
            activeTab === "architecture"
              ? "bg-[#D4A373]/20 text-[#E6CCB2] border border-[#D4A373]/50 font-medium"
              : "text-[#a89b8a] hover:text-white hover:bg-[#1c1611]"
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>Architecture &amp; Flow</span>
        </button>

        <button
          onClick={() => setActiveTab("decisions")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
            activeTab === "decisions"
              ? "bg-[#C89666]/20 text-[#E6CCB2] border border-[#C89666]/50 font-medium"
              : "text-[#a89b8a] hover:text-white hover:bg-[#1c1611]"
          }`}
        >
          <Split className="w-3.5 h-3.5" />
          <span>Key Decisions &amp; Trade-offs</span>
        </button>

        <button
          onClick={() => setActiveTab("outcomes")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
            activeTab === "outcomes"
              ? "bg-[#D4A373]/20 text-[#E6CCB2] border border-[#D4A373]/50 font-medium"
              : "text-[#a89b8a] hover:text-white hover:bg-[#1c1611]"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Outcomes &amp; Impact</span>
        </button>
      </div>

      {/* Tab Content: Architecture */}
      {activeTab === "architecture" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <p className="text-sm text-[#d6cdbf] leading-relaxed font-sans">
            {project.architecture.summary}
          </p>

          {/* Structured Step Flow */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#a89b8a]">
              System Execution Flow:
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {project.architecture.flow.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#17120d] border border-[#2e251e] text-xs text-[#d6cdbf] font-mono"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[#241c15] border border-[#3d332a] flex items-center justify-center text-[#D4A373] text-[10px] font-bold">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Layers Breakdown if available */}
          {project.architecture.layers && (
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#a89b8a] mb-2.5">
                Component Breakdown:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.architecture.layers.map((layer, lIdx) => (
                  <div
                    key={lIdx}
                    className="p-3.5 rounded-xl bg-[#17120d] border border-[#2e251e] space-y-1 hover:border-[#D4A373]/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#D4A373]">
                        {layer.layer}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {layer.name}
                    </div>
                    <p className="text-[11px] text-[#a89b8a] leading-normal">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Key Decisions */}
      {activeTab === "decisions" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <p className="text-xs font-mono text-[#a89b8a]">
            Critical architectural choices made to balance performance, latency, and reliability:
          </p>
          <div className="space-y-3">
            {project.keyDecisions.map((item, dIdx) => (
              <div
                key={dIdx}
                className="p-4 rounded-xl bg-[#17120d] border border-[#2e251e] space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#E6CCB2]">
                  <Split className="w-4 h-4 text-[#D4A373]" />
                  <span>{item.decision}</span>
                </div>
                <p className="text-xs text-[#d6cdbf] leading-relaxed font-sans">
                  <strong className="text-[#f5ebe0]">Rationale: </strong>
                  {item.rationale}
                </p>
                <div className="text-xs font-mono text-[#a89b8a] bg-[#120e0a] p-2.5 rounded-md border border-[#2e251e]">
                  <strong className="text-[#D4A373]">Trade-Off: </strong>
                  {item.tradeOff}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Outcomes */}
      {activeTab === "outcomes" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Key Metric Highlights */}
          {project.outcome.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.outcome.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3.5 rounded-xl bg-[#17120d] border border-[#D4A373]/30 text-center font-mono"
                >
                  <div className="text-xs font-semibold text-[#E6CCB2]">
                    {m}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#a89b8a]">
              Verified Capabilities &amp; Results:
            </h4>
            <div className="space-y-2">
              {project.outcome.highlights.map((h, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-start gap-2.5 text-xs text-[#d6cdbf] font-sans"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
