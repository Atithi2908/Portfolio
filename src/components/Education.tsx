"use client";

import React from "react";
import { GraduationCap, MapPin, Monitor, Box, User, Flag } from "lucide-react";

export const Education = () => {
  const capabilities = [
    {
      title: "Systems & Backend",
      icon: <Flag className="w-4 h-4 text-white" />,
      subtext: "Go, PostgreSQL, Redis, RabbitMQ, Distributed Systems, Concurrency, Networking",
    },
    {
      title: "DevOps & Cloud",
      icon: <Box className="w-4 h-4 text-white" />,
      subtext: "Docker, AWS, Jenkins, CI/CD",
    },
    {
      title: "AI & Autonomous Systems",
      icon: <User className="w-4 h-4 text-white" />,
      subtext: "LLMs, RAG, LangChain, LangGraph, Qdrant, AI Agents",
    },
    {
      title: "Full-Stack Development",
      icon: <Monitor className="w-4 h-4 text-white" />,
      subtext: "React, Node.js, Express, TypeScript, REST APIs",
    },
  ];

  return (
    <section id="education" className="py-20 md:py-28 border-t border-[#2a221b] relative bg-[#12100e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ─── Left Column: ABOUT ─── */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-[#D4A373] uppercase tracking-widest block">
              01 // ABOUT
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              CS undergrad focused on{" "}
              <span className="italic font-serif font-light text-[#f5ebe0]">
                backend engineering.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#b8ad9e] font-sans leading-relaxed">
              I&apos;m a Computer Science student at IIIT Dharwad focused primarily on backend engineering, distributed systems, and databases, alongside AI integration. I&apos;ve built monitoring platforms, high-throughput pipelines, autonomous AI agents, and full-stack applications — working across APIs, queues, cloud deployment, and system architecture.
            </p>

            <p className="text-sm sm:text-base text-[#b8ad9e] font-sans leading-relaxed">
              I enjoy understanding how backend systems work under the hood and turning complex infrastructure challenges into reliable, practical software.
            </p>

            {/* Bottom Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1714] border border-[#382e25] text-xs font-mono text-[#d6cdbf]">
                <GraduationCap className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>IIIT Dharwad · CSE · 2027</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1714] border border-[#382e25] text-xs font-mono text-[#d6cdbf]">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Dharwad, India</span>
              </div>
            </div>
          </div>

          {/* ─── Right Column: WHAT I WORK WITH ─── */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[#2a221b] lg:pl-10 pt-6 lg:pt-0 border-t lg:border-t-0 border-[#2a221b]">
            <span className="text-xs font-mono text-[#a89b8a] uppercase tracking-widest block">
              WHAT I WORK WITH
            </span>

            <div className="space-y-3.5">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#171310] border border-[#2b221a] p-4 sm:p-5 flex items-center gap-4 hover:border-[#D4A373]/50 transition-all shadow-md group"
                >
                  <div className="p-3 rounded-xl bg-[#221b16] border border-[#3d3126] flex items-center justify-center flex-shrink-0 group-hover:border-[#D4A373]/60 transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4A373] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a89b8a] font-mono leading-snug">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
