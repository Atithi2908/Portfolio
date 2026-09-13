"use client";

import React from "react";
import Link from "next/link";
import { blogsData } from "@/data/blogs";
import { 
  BookOpen, 
  Clock, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import { motion } from "framer-motion";

export const BlogsSection = () => {
  const featuredBlog = blogsData[0]; // Backend monitoring system design

  return (
    <section id="blogs" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#12100e] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4A373]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A373]/40 bg-[#241c15] px-4 py-1.5 text-xs font-mono text-[#E6CCB2]">
            <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Technical Deep Dives &amp; Publications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            System Design &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5EBE0] to-[#D4A373]">
              Engineering Blogs
            </span>
          </h2>

          <p className="max-w-2xl text-sm sm:text-base text-[#b8ad9e] leading-relaxed">
            In-depth architectural breakdowns of production systems, distributed messaging pipelines, database rollup strategies, and low-latency SDK designs.
          </p>
        </div>

        {/* Featured Card */}
        {featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl border border-[#3d332a] bg-gradient-to-b from-[#1c1612] via-[#17120e] to-[#12100e] p-8 md:p-10 shadow-2xl transition-all hover:border-[#D4A373]/70 hover:shadow-2xl hover:shadow-[#D4A373]/10"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              {/* Left Column: Post details */}
              <div className="space-y-5 lg:w-2/3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#a89f91]">
                  <span className="rounded-md border border-[#D4A373]/40 bg-[#D4A373]/10 px-2.5 py-0.5 text-[11px] font-mono text-[#D4A373] font-bold">
                    ⭐ Featured Publication
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#d6cdbf]">
                    <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>{featuredBlog.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{featuredBlog.date}</span>
                </div>

                <Link href={`/blogs/${featuredBlog.slug}`}>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#D4A373] transition-colors leading-snug">
                    {featuredBlog.title}
                  </h3>
                </Link>

                <p className="text-sm sm:text-base text-[#b8ad9e] leading-relaxed">
                  {featuredBlog.description}
                </p>

                {/* Key Metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {featuredBlog.highlights.slice(0, 3).map((hl) => (
                    <div
                      key={hl.label}
                      className="rounded-xl border border-[#332b23] bg-[#1a140f] p-2.5 text-center space-y-0.5"
                    >
                      <div className="text-[10px] font-mono text-[#a89f91]">{hl.label}</div>
                      <div className="text-xs font-mono font-bold text-[#E6CCB2]">
                        {hl.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#D4A373] px-5 py-2.5 text-xs font-mono font-bold text-[#120e0a] hover:bg-[#E6CCB2] transition-colors shadow-lg shadow-[#D4A373]/15"
                  >
                    <span>Read System Design Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#120e0a]" />
                  </Link>

                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#3d332a] bg-[#17120e] px-4 py-2.5 text-xs font-mono text-[#d6cdbf] hover:text-white transition-colors"
                  >
                    <span>Explore All Blogs</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Architecture Preview Callout */}
              <div className="w-full lg:w-1/3 rounded-2xl border border-[#382d24] bg-[#0f0c0a] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#29211a] pb-3 text-xs font-mono text-[#D4A373]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#D4A373]" />
                    <span>Architecture Highlights</span>
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#c4b9aa]">
                  <div className="p-2 rounded-lg bg-[#1c1713] border border-[#2e261f]">
                    ⚡ Non-blocking Async SDK Telemetry
                  </div>
                  <div className="p-2 rounded-lg bg-[#1c1713] border border-[#2e261f]">
                    🛡️ RabbitMQ Load Spike Buffering
                  </div>
                  <div className="p-2 rounded-lg bg-[#1c1713] border border-[#2e261f]">
                    📊 PostgreSQL Time-Bucket Rollups
                  </div>
                  <div className="p-2 rounded-lg bg-[#1c1713] border border-[#2e261f]">
                    🚨 State Machine Alerting (No Spam)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
