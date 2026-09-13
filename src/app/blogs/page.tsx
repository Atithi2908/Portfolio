"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { blogsData, BlogPost } from "@/data/blogs";
import { 
  BookOpen, 
  Clock, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Cpu, 
  Layers,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allTags = ["All", ...Array.from(new Set(blogsData.flatMap((post) => post.tags)))];

  const filteredPosts = blogsData.filter((post) => {
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="relative min-h-screen w-full bg-[#12100e] text-[#f3ede2]">
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[#a89f91]">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#594d40]" />
          <span className="text-[#D4A373]">Engineering Insights &amp; System Design Blogs</span>
        </div>

        {/* Hero Header */}
        <div className="relative rounded-3xl border border-[#3d332a] bg-gradient-to-b from-[#1d1713] via-[#15110d] to-[#12100e] p-8 md:p-12 mb-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-[#D4A373]/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A373]/40 bg-[#241c15] px-4 py-1.5 text-xs font-mono text-[#E6CCB2]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Technical Engineering Publications</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Systems Architecture &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5EBE0] to-[#D4A373]">
                Deep Engineering Blogs
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b8ad9e] leading-relaxed">
              Step-by-step technical walk-throughs on building resilient backend infrastructure, low-latency SDKs, distributed queues, and autonomous AI systems.
            </p>
          </div>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#2e261f] pb-6">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a89f91]" />
            <input
              type="text"
              placeholder="Search by topic, queue, or database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#332b23] bg-[#171310] pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-[#827566] focus:border-[#D4A373] focus:outline-none transition-all"
            />
          </div>

          {/* Tag Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-[#D4A373] text-[#120e0a] font-bold shadow-md shadow-[#D4A373]/20"
                    : "bg-[#1c1713] text-[#b8ad9e] hover:text-white hover:bg-[#28211b] border border-[#332b23]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post List */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-2xl border border-[#3d332a] bg-[#17120e] p-6 sm:p-8 transition-all hover:border-[#D4A373]/70 hover:shadow-2xl hover:shadow-[#D4A373]/10"
            >
              <div className="flex flex-col gap-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#a89f91]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[#D4A373]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  {post.featured && (
                    <span className="rounded-md border border-[#D4A373]/40 bg-[#D4A373]/10 px-2.5 py-0.5 text-[11px] font-mono text-[#D4A373] font-bold">
                      ⭐ Featured System Design
                    </span>
                  )}
                </div>

                {/* Title & Summary */}
                <div className="space-y-3">
                  <Link href={`/blogs/${post.slug}`}>
                    <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#D4A373] transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-[#b8ad9e] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Highlights Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
                  {post.highlights.map((hl) => (
                    <div
                      key={hl.label}
                      className="rounded-xl border border-[#332b23] bg-[#1a140f] p-2.5 text-center space-y-0.5"
                    >
                      <div className="text-[10px] font-mono text-[#a89f91]">{hl.label}</div>
                      <div className="text-xs font-mono font-bold text-[#E6CCB2] truncate">
                        {hl.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags & Action Link */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#29221b]">
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md bg-[#211a14] border border-[#332a21] px-2.5 py-1 text-[11px] font-mono text-[#c4b8a7]"
                      >
                        <Tag className="w-3 h-3 text-[#D4A373]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D4A373] group-hover:text-white transition-colors"
                  >
                    <span>Read Full Engineering Guide</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A373] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="rounded-2xl border border-[#3d332a] bg-[#17120e] p-12 text-center space-y-3">
              <p className="text-base text-[#b8ad9e]">No blog posts found matching &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => { setSelectedTag("All"); setSearchQuery(""); }}
                className="text-xs font-mono text-[#D4A373] underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
