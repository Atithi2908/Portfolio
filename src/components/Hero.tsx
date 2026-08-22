"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Bot,
  Activity,
  Layers,
  Code2,
  ExternalLink,
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Interactive Background Boxes Ripple Effect */}
      <BackgroundRippleEffect className="z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Thesis & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100/90 border border-surface-border text-xs font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              <span>{profileData.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Architecting systems that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-teal-200 to-brand-blue">
                  observe, react, and decide.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed">
                Hi, I&apos;m <span className="text-white font-medium">{profileData.name}</span>. I build autonomous multi-layer AI agents, high-throughput message ingestion pipelines, and real-time distributed execution engines.
              </p>
            </div>

            {/* Architecture Focus Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-100 border border-surface-border text-xs font-mono text-zinc-300">
                <Bot className="w-3.5 h-3.5 text-brand-cyan" />
                <span>LangGraph State Agents</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-100 border border-surface-border text-xs font-mono text-zinc-300">
                <Layers className="w-3.5 h-3.5 text-brand-blue" />
                <span>RabbitMQ Ingestion Queues</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-100 border border-surface-border text-xs font-mono text-zinc-300">
                <Activity className="w-3.5 h-3.5 text-brand-amber" />
                <span>Redis Sub-Second Execution</span>
              </div>
            </div>

            {/* Bio & Education Context */}
            <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-xl">
              Undergraduate at <span className="text-zinc-200">{profileData.education.institution}</span> (CGPA {profileData.education.cgpa}) &amp; Competitive Programmer (<span className="text-brand-cyan font-mono">LeetCode Knight, 1850+</span>). Focused on bridging autonomous agent cognition with resilient systems infrastructure.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-cyan text-black font-semibold text-sm hover:bg-brand-cyanMuted transition-all shadow-lg shadow-brand-cyan/20"
              >
                <span>Read Technical Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-hover border border-surface-border text-zinc-200 text-sm font-mono transition-all"
              >
                <Code2 className="w-4 h-4 text-zinc-400" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

          </div>

          {/* Right Column: Dedicated Avatar & System Stage Slot (Phase 2 Ready) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md">
              {/* Glass Frame Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-surface-100/90 to-surface-200/90 border border-surface-border p-5 shadow-2xl backdrop-blur-xl group hover:border-brand-cyan/40 transition-all">
                
                {/* Header bar of Stage */}
                <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-[11px] font-mono text-zinc-400 ml-2">
                      stage://atithi.agent.runtime
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/30 text-[10px] font-mono text-brand-cyan">
                    <Cpu className="w-3 h-3 animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                </div>

                {/* Main Avatar Stage Slot */}
                <div className="relative aspect-square rounded-xl bg-gradient-to-b from-surface-200 to-black border border-surface-border/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  
                  {/* Subtle Grid Animation Background */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                  
                  {/* Ambient Glow */}
                  <div className="absolute w-48 h-48 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none"></div>

                  {/* Avatar Visual Placeholder / Node Target */}
                  <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-surface-100 via-surface-50 to-zinc-800 border-2 border-brand-cyan/50 p-1 flex items-center justify-center shadow-xl shadow-brand-cyan/10 mb-4">
                    <div className="w-full h-full rounded-full bg-surface-200 flex flex-col items-center justify-center text-zinc-300">
                      <Bot className="w-10 h-10 text-brand-cyan mb-1" />
                      <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">
                        AI Node
                      </span>
                    </div>
                  </div>

                  {/* Stage Label & Placeholder Information */}
                  <div className="relative z-10 space-y-1.5 max-w-xs">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white">
                      <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>Interactive Avatar Stage</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono leading-tight">
                      [Phase 2 Stage Slot]: Audio-reactive speaking avatar with real-time portfolio Q&amp;A synthesis.
                    </p>
                  </div>

                  {/* Waveform indicator */}
                  <div className="relative z-10 flex items-center gap-1 mt-4">
                    {[40, 65, 30, 85, 50, 95, 45, 75, 35, 60, 90, 40].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-brand-cyan/60 rounded-full"
                        style={{ height: `${h * 0.22}px` }}
                      ></span>
                    ))}
                  </div>

                </div>

                {/* Bottom Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-surface-border text-center font-mono">
                  <div className="p-2 rounded bg-surface-100/50 border border-surface-border/50">
                    <div className="text-xs text-zinc-400">Contest</div>
                    <div className="text-sm font-semibold text-brand-cyan">1850+</div>
                  </div>
                  <div className="p-2 rounded bg-surface-100/50 border border-surface-border/50">
                    <div className="text-xs text-zinc-400">Rank</div>
                    <div className="text-sm font-semibold text-white">Top 5%</div>
                  </div>
                  <div className="p-2 rounded bg-surface-100/50 border border-surface-border/50">
                    <div className="text-xs text-zinc-400">Arch</div>
                    <div className="text-sm font-semibold text-brand-blue">5-Layer</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
