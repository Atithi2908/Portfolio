"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Avatar() {
  const avatarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined" || !avatarRef.current) return;

    gsap.to(avatarRef.current, {
      y: -100,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: "#education",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });
  });

  return (
    <div
      ref={avatarRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-transform will-change-transform drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
      style={{ width: "200px" }}
    >
      <img
        src="/avatar.png"
        alt="Atithi Jaiman Avatar"
        className="w-full h-auto object-contain filter drop-shadow-[0_0_20px_rgba(212,163,115,0.25)]"
      />
    </div>
  );
}
