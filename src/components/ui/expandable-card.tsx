"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ProjectCaseStudy } from "@/data/projects";
import { ArrowUpRight, CheckCircle2, Cpu, ShieldCheck, X } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export interface ExpandableProjectCardItem {
  id: string;
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
  tech: string[];
  project: ProjectCaseStudy;
}

export function ExpandableProjectsList({
  projects,
}: {
  projects: ProjectCaseStudy[];
}) {
  const [active, setActive] = useState<ExpandableProjectCardItem | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  // Map projects data to cards
  const cards: ExpandableProjectCardItem[] = useMemo(() => {
    return projects.map((p) => {
      let imageSrc = `/projects/${p.id}.svg`;
      return {
        id: p.id,
        title: p.title,
        description: p.tagline,
        src: imageSrc,
        ctaText: "GitHub Repo",
        ctaLink: p.githubUrl,
        badge: p.badge,
        tech: p.tech,
        project: p,
      };
    });
  }, [projects]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-full">
      {/* ─── Backdrop Overlay ─── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-[90]"
          />
        )}
      </AnimatePresence>

      {/* ─── Expanded Modal View ─── */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-start sm:items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Modal Card Content */}
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#140f0c] border border-[#3d332a] rounded-3xl overflow-hidden shadow-2xl my-auto text-left transition-all"
            >
              {/* Floating Close Button */}
              <button
                className="flex absolute top-4 right-4 z-[110] items-center justify-center bg-[#1e1813]/90 hover:bg-[#2c231c] text-[#e6ccb2] rounded-full h-9 w-9 border border-[#3d332a] backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95"
                onClick={() => setActive(null)}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Banner Header */}
              <div className="relative w-full">
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-56 sm:h-72 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-[#140f0c]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#D4A373] backdrop-blur-md font-semibold shadow-sm">
                    {active.badge}
                  </span>
                  <span className="text-xs font-mono text-[#b8ad9e]">
                    {active.project.period}
                  </span>
                </div>
              </div>

              {/* Full Modal Content Body (Natural continuous document flow) */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Header Title & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2e251e] pb-6">
                  <div>
                    <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight">
                      {active.title}
                    </h3>
                    <p className="text-[#b8ad9e] text-sm mt-1">
                      {active.description}
                    </p>
                  </div>

                  <a
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold rounded-xl bg-[#D4A373] text-[#120e0a] hover:bg-[#E6CCB2] transition-all shadow-lg shadow-[#D4A373]/15 whitespace-nowrap self-start sm:self-center shrink-0"
                  >
                    <GithubIcon className="w-4 h-4 text-[#120e0a]" />
                    <span>{active.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#1c1612] border border-[#382d24] text-[#d6cdbf]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Problem & Bottleneck */}
                <div className="space-y-3 bg-[#19130f] p-4 rounded-xl border border-[#2b221a]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4A373] font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                    <span>Problem &amp; Core Bottleneck</span>
                  </h4>
                  <p className="text-sm text-[#d6cdbf] leading-relaxed">
                    {active.project.problem.context}
                  </p>
                  <p className="text-xs text-[#a89b8a] leading-relaxed italic border-l-2 border-[#D4A373]/60 pl-3">
                    &quot;{active.project.problem.coreBottleneck}&quot;
                  </p>
                </div>

                {/* Architecture Flow / Layers */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4A373] font-semibold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#D4A373]" />
                    <span>System Architecture &amp; Execution Pipeline</span>
                  </h4>
                  <p className="text-sm text-[#b8ad9e]">
                    {active.project.architecture.summary}
                  </p>

                  <div className="space-y-2 mt-3">
                    {active.project.architecture.flow.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-[#18130f] border border-[#261e17] text-xs font-mono text-[#e6ccb2]"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#D4A373] flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics / Highlights */}
                <div className="pt-2 border-t border-[#2e251e]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4A373] font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                    <span>Key Architectural Metrics &amp; Outcomes</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {active.project.outcome.metrics?.map((metric, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#1c1611] border border-[#3d332a] text-center"
                      >
                        <span className="text-xs font-mono text-[#D4A373] font-bold block">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* ─── Grid of Expandable Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.id}
            onClick={() => setActive(card)}
            className="group relative flex flex-col bg-[#140f0c] hover:bg-[#1a1410] border border-[#2e251e] hover:border-[#D4A373]/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#D4A373]/10"
          >
            {/* Card Banner Image */}
            <motion.div
              layoutId={`image-${card.title}-${id}`}
              className="relative h-48 w-full overflow-hidden bg-[#0d0907]"
            >
              <img
                src={card.src}
                alt={card.title}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#140f0c]/80 border border-[#3d332a] text-[#D4A373] backdrop-blur-md">
                {card.badge}
              </span>
            </motion.div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-bold text-white text-base group-hover:text-[#D4A373] transition-colors leading-snug"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-[#b8ad9e] text-xs mt-2 line-clamp-2 leading-relaxed"
                >
                  {card.description}
                </motion.p>
              </div>

              {/* Footer Tech Badges & Expand Indicator */}
              <div className="pt-3 border-t border-[#231b15] flex items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {card.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1b1511] text-[#a89b8a] border border-[#2b221a]"
                    >
                      {t}
                    </span>
                  ))}
                  {card.tech.length > 3 && (
                    <span className="text-[10px] font-mono text-[#8a7d6e]">
                      +{card.tech.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono text-[#D4A373] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Expand</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
