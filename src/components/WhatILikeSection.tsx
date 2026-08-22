"use client";

import React, { useRef } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { Heart, Sparkles } from "lucide-react";

export interface LikeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  className: string;
}

const items: LikeItem[] = [
  {
    id: "cricket",
    title: "Cricket & Tactics",
    category: "Sports",
    description: "Match strategies, seam movement, and high-pressure chase scenarios.",
    image: "/likes/cricket.jpg",
    className: "lg:absolute top-4 left-[2%] xl:left-[4%] rotate-[-5deg] z-10",
  },
  {
    id: "basketball",
    title: "Basketball & Hoops",
    category: "Sports",
    description: "Fast break plays, perimeter spacing, and high-energy court rhythm.",
    image: "/likes/basketball.jpg",
    className: "lg:absolute top-12 left-[20%] xl:left-[22%] rotate-[4deg] z-20",
  },
  {
    id: "food",
    title: "Culinary & Good Food",
    category: "Lifestyle",
    description: "Exploring rich spices, authentic regional cuisines & comforting meals.",
    image: "/likes/Food.jpg",
    className: "lg:absolute top-4 left-[38%] xl:left-[40%] rotate-[-3deg] z-30",
  },
  {
    id: "coding",
    title: "Systems & AI Coding",
    category: "Engineering",
    description: "Autonomous agents, low-latency queues & backend pipelines.",
    image: "/likes/coding.jpg",
    className: "lg:absolute top-12 left-[56%] xl:left-[58%] rotate-[6deg] z-40",
  },
  {
    id: "exploring",
    title: "Exploring & Travel",
    category: "Adventure",
    description: "Uncovering new places, scenic trails & spontaneous road trips.",
    image: "/likes/exploring.jpg",
    className: "lg:absolute top-4 left-[72%] xl:left-[74%] rotate-[-4deg] z-50",
  },
];

export const WhatILikeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="interests"
      className="py-12 sm:py-16 md:py-20 border-t border-[#2e251e] relative bg-[#12100e] overflow-hidden"
    >
      {/* ─── Reduced Section Width Container (max-w-5xl) ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-2 mb-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs font-mono text-[#D4A373]">
            <Heart className="w-3.5 h-3.5 fill-[#D4A373]/20" />
            <span>06 // BEYOND THE CODE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-3">
            <span>What I Like</span>
            <Sparkles className="w-5 h-5 text-[#D4A373]" />
          </h2>
        </div>

        {/* ─── Stage Container ─── */}
        <div
          ref={containerRef}
          className="relative min-h-[420px] sm:min-h-[460px] md:min-h-[480px] w-full flex flex-col items-center justify-center rounded-3xl bg-[#15100d]/50 border border-[#2b221a] p-4 sm:p-6 overflow-hidden"
        >
          <DraggableCardContainer className="w-full relative flex flex-wrap lg:block justify-center gap-6 items-center min-h-[340px] sm:min-h-[380px]">
            {items.map((item) => (
              <DraggableCardBody
                key={item.id}
                containerRef={containerRef}
                className={`hover:z-50 transition-shadow ${item.className}`}
              >
                {/* Card Image */}
                <div className="relative h-40 sm:h-48 md:h-52 w-full rounded-xl overflow-hidden bg-[#0d0a08] border border-[#2b221a] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#140f0c]/90 border border-[#3d332a] text-[#D4A373] font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1 text-left">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#b8ad9e] leading-relaxed font-sans line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>

      </div>
    </section>
  );
};
