"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { Education } from "@/components/Education";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogsSection } from "@/components/BlogsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { WhatILikeSection } from "@/components/WhatILikeSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroEditorialVisual } from "@/components/HeroEditorialVisual";
import { profileData } from "@/data/profile";
import { ArrowUpRight, ArrowDown, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#12100e] text-[#f3ede2]">
      {/* ─── Portfolio Content ─── */}
      <div className="relative w-full z-10">
        {/* Portfolio Header */}
        <Navbar />

        {/* ═══ EDITORIAL TWO-PART HERO SECTION ═══ */}
        <section
          id="hero"
          className="relative min-h-[90vh] w-full flex flex-col justify-center overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4A373]/12 via-[#12100e] to-[#12100e]"
        >
          {/* Interactive Background Boxes Ripple Effect */}
          <BackgroundRippleEffect rows={18} cols={36} />

          {/* 12-Column Two-Part Composition Container */}
          <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              
              {/* ─── LEFT COLUMN: Text, Headline & Action CTAs (55% Width) ─── */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 pointer-events-none">
                
                {/* Status / Availability Badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#3d332a] bg-[#1a1511]/90 px-4 py-1.5 text-xs font-mono text-[#d6cdbf] backdrop-blur-md shadow-sm pointer-events-auto">
                  <span>{profileData.status}</span>
                </div>

                {/* Name Headline & Lamp Backdrop */}
                <div className="w-full relative pointer-events-auto">
                  <LampContainer className="min-h-[180px] py-0 bg-transparent">
                    <motion.div
                      initial={{ opacity: 0.5, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2"
                    >
                      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5EBE0] to-[#D4A373]">
                          Atithi Jaiman
                        </span>
                      </h1>
                    </motion.div>
                  </LampContainer>
                </div>

                {/* Sub-headline & Description */}
                <div className="space-y-3 max-w-xl lg:max-w-2xl pointer-events-auto">
                  <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    I build{" "}
                    <span className="text-[#D4A373] underline decoration-[#D4A373]/60 decoration-2 underline-offset-4">
                      scalable backend systems, distributed infrastructure, and AI applications.
                    </span>
                  </p>
                  <p className="text-sm sm:text-base text-[#b8ad9e] font-normal leading-relaxed">
                    From high-throughput event pipelines and distributed monitoring platforms to microservices, databases, and autonomous AI agents, I focus on turning complex backend engineering problems into reliable software.
                  </p>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5 justify-center lg:justify-start pointer-events-auto">
                  <a
                    href="#education"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#D4A373] px-5 py-2.5 text-xs font-mono font-bold text-[#120e0a] transition-all hover:bg-[#E6CCB2] shadow-lg shadow-[#D4A373]/15"
                  >
                    <span>Explore My Work</span>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#3d332a] bg-[#17120e]/90 px-4 py-2.5 text-xs font-mono text-[#e6ccb2] backdrop-blur-sm transition-all hover:border-[#D4A373]/70 hover:bg-[#261e17] hover:text-white"
                  >
                    <GithubIcon className="h-4 w-4 text-[#D4A373]" />
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3 w-3 text-[#a89b8a]" />
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#3d332a] bg-[#17120e]/90 px-4 py-2.5 text-xs font-mono text-[#e6ccb2] backdrop-blur-sm transition-all hover:border-[#D4A373]/70 hover:bg-[#261e17] hover:text-white"
                  >
                    <LinkedinIcon className="h-4 w-4 text-[#D4A373]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3 w-3 text-[#a89b8a]" />
                  </a>

                  <a
                    href={profileData.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#3d332a] bg-[#17120e]/90 px-4 py-2.5 text-xs font-mono text-[#e6ccb2] backdrop-blur-sm transition-all hover:border-[#D4A373]/70 hover:bg-[#261e17] hover:text-white"
                  >
                    <span className="text-[#D4A373] font-extrabold text-sm">LC</span>
                    <span>LeetCode</span>
                    <ArrowUpRight className="h-3 w-3 text-[#a89b8a]" />
                  </a>

                  <a
                    href={profileData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#D4A373]/50 bg-[#241c15]/90 px-4 py-2.5 text-xs font-mono font-medium text-[#f5ebe0] backdrop-blur-sm transition-all hover:border-[#D4A373] hover:bg-[#D4A373]/20 hover:text-white shadow-sm shadow-[#D4A373]/10"
                  >
                    <FileDown className="h-3.5 w-3.5 text-[#D4A373]" />
                    <span>Resume</span>
                  </a>
                </div>

              </div>

              {/* ─── RIGHT COLUMN: Large Seamless Editorial Visual (45% Width) ─── */}
              <div className="lg:col-span-5 w-full mt-6 lg:mt-0 pointer-events-auto">
                <HeroEditorialVisual />
              </div>

            </div>
          </div>
        </section>

        {/* ═══ 1. EDUCATION ═══ */}
        <Education />

        {/* ═══ 2. WORK EXPERIENCE ═══ */}
        <ExperienceSection />

        {/* ═══ 3. PROJECTS / CASE STUDIES ═══ */}
        <ProjectsSection />

        {/* ═══ 3.5. TECHNICAL BLOGS / SYSTEM DESIGN ═══ */}
        <BlogsSection />

        {/* ═══ 4. SKILLS SECTION ═══ */}
        <SkillsSection />

        {/* ═══ 5. COMPETITIVE PROGRAMMING ═══ */}
        <AchievementsSection />

        {/* ═══ 6. WHAT I LIKE (INTERESTS) ═══ */}
        <WhatILikeSection />

        {/* ═══ 7. CONTACT & FOOTER ═══ */}
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
