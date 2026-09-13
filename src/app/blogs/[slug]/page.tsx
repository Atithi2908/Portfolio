"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { blogsData } from "@/data/blogs";
import { backendMonitoringBlogData } from "@/data/blogs/backend-monitoring-system-design";
import { BlogArchitectureDiagram } from "@/components/blogs/BlogArchitectureDiagram";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Clock, 
  Tag, 
  ChevronRight, 
  ArrowLeft, 
  BookOpen, 
  List, 
  Check, 
  Copy, 
  Share2, 
  Sparkles,
  Zap,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2
} from "lucide-react";

export default function BlogReaderPage({ params }: { params: { slug: string } }) {
  const postMetadata = blogsData.find((p) => p.slug === params.slug);
  if (!postMetadata) {
    notFound();
  }

  const blog = backendMonitoringBlogData;
  const [activeSection, setActiveSection] = useState<string>(blog.sections[0].id);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Top Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of blog.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog.sections]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#12100e] text-[#f3ede2]">
      {/* ─── Reading Scroll Progress Bar ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A373] via-[#F5EBE0] to-[#E6CCB2] z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a89f91]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#594d40]" />
            <Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#594d40]" />
            <span className="text-[#D4A373] truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#3d332a] bg-[#1a140f] px-3.5 py-1.5 text-xs font-mono text-[#d6cdbf] hover:border-[#D4A373] hover:text-white transition-all"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#D4A373]" />}
            <span>{copiedUrl ? "URL Copied!" : "Share Article"}</span>
          </button>
        </div>

        {/* ═══ ARTICLE HEADER ═══ */}
        <header className="relative rounded-3xl border border-[#3d332a] bg-gradient-to-b from-[#1c1612] via-[#15110d] to-[#12100e] p-6 sm:p-10 mb-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#D4A373]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-4xl">
            {/* Tags & Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#D4A373]/40 bg-[#241c15] px-3 py-1 text-[#E6CCB2]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>System Design Publication</span>
              </span>
              <span className="text-[#a89f91]">•</span>
              <span className="flex items-center gap-1 text-[#d6cdbf]">
                <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{blog.readTime}</span>
              </span>
              <span className="text-[#a89f91]">•</span>
              <span className="text-[#a89f91]">{blog.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              {blog.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#b8ad9e] leading-relaxed">
              {blog.subtitle}
            </p>
          </div>
        </header>

        {/* ═══ TELEMETRY KEY HIGHLIGHTS BAR ═══ */}
        <div className="mb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {postMetadata.highlights.map((hl) => (
            <div
              key={hl.label}
              className="rounded-2xl border border-[#3d332a] bg-[#17120e] p-4 text-center space-y-1 shadow-md"
            >
              <div className="text-[11px] font-mono text-[#a89f91]">{hl.label}</div>
              <div className="text-xs font-mono font-bold text-[#E6CCB2]">
                {hl.value}
              </div>
            </div>
          ))}
        </div>

        {/* ═══ MAIN LAYOUT: sticky TOC sidebar (3 cols) + ARTICLE CONTENT (9 cols) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ─── STICKY TABLE OF CONTENTS (DESKTOP) ─── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-4 rounded-2xl border border-[#332b23] bg-[#171310]/90 p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-[#29221b] pb-3 font-mono font-bold text-xs text-white">
                <List className="w-4 h-4 text-[#D4A373]" />
                <span>Table of Contents</span>
              </div>

              <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {blog.sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block px-3 py-1.5 rounded-lg text-xs font-mono transition-all truncate ${
                        isActive
                          ? "bg-[#D4A373]/15 text-[#D4A373] font-bold border-l-2 border-[#D4A373]"
                          : "text-[#a89f91] hover:text-white hover:bg-[#211a14]"
                      }`}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ─── ARTICLE SECTIONS CONTENT ─── */}
          <div className="lg:col-span-9 space-y-14">
            {blog.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-6">
                {/* Section Title */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white border-b border-[#2e261f] pb-3">
                  {sec.title}
                </h2>

                {/* Section Content Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-[#d4c9b8] leading-relaxed">
                  {sec.content.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p.split("\n").map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line.startsWith("• ") ? (
                            <span className="block pl-4 py-0.5 text-[#e6ccb2]">
                              {line}
                            </span>
                          ) : (
                            <span>{line}</span>
                          )}
                          {lIdx < p.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}
                </div>

                {/* Render Interactive Architecture Diagram if defined */}
                {sec.diagramType && (
                  <BlogArchitectureDiagram initialStage={sec.diagramType} />
                )}

                {/* Render Code Snippet if defined */}
                {sec.codeSnippet && (
                  <div className="rounded-2xl border border-[#382e25] bg-[#0c0a08] overflow-hidden my-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-[#29211a] bg-[#16120e] px-4 py-2.5">
                      <span className="text-xs font-mono text-[#a89f91]">
                        {sec.codeSnippet.caption || sec.codeSnippet.language.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleCopyCode(sec.codeSnippet!.code, sec.id)}
                        className="flex items-center gap-1 text-[11px] font-mono text-[#D4A373] hover:text-white transition-colors"
                      >
                        {copiedCodeId === sec.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-[#f3ede2] leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Render Callout Box if defined */}
                {sec.callout && (
                  <div className={`rounded-2xl border p-5 my-6 space-y-2 ${
                    sec.callout.type === "tradeoff" 
                      ? "border-amber-500/50 bg-amber-950/20 text-amber-100" 
                      : sec.callout.type === "warning"
                      ? "border-rose-500/50 bg-rose-950/20 text-rose-100"
                      : "border-cyan-500/50 bg-cyan-950/20 text-cyan-100"
                  }`}>
                    <div className="flex items-center gap-2 font-mono font-bold text-sm">
                      {sec.callout.type === "tradeoff" ? (
                        <AlertTriangle className="w-4 h-4 text-[#D4A373]" />
                      ) : sec.callout.type === "warning" ? (
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Info className="w-4 h-4 text-cyan-400" />
                      )}
                      <span>{sec.callout.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-mono leading-relaxed opacity-90 whitespace-pre-line">
                      {sec.callout.message}
                    </p>
                  </div>
                )}

                {/* Render Table if defined */}
                {sec.table && (
                  <div className="rounded-2xl border border-[#382e25] bg-[#140f0c] overflow-hidden my-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                      <thead>
                        <tr className="border-b border-[#2e251d] bg-[#1d1712] text-[#D4A373]">
                          {sec.table.headers.map((h, i) => (
                            <th key={i} className="p-3 font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#261e17] text-[#d6cdbf]">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#1a140f]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Navigation Footer Bar */}
            <div className="mt-16 rounded-3xl border border-[#3d332a] bg-[#17120e] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-mono font-bold text-base text-white">Finished reading?</h4>
                <p className="text-xs text-[#b8ad9e] font-mono mt-0.5">Explore more system design guides or check out my recent projects.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#3d332a] bg-[#1a140f] px-4 py-2.5 text-xs font-mono text-[#d6cdbf] hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Blogs</span>
                </Link>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#D4A373] px-4 py-2.5 text-xs font-mono font-bold text-[#120e0a] hover:bg-[#E6CCB2] transition-colors"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
