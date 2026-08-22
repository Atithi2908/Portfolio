"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const HeroEditorialVisual = () => {
  // Mouse parallax motion tracking
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 18 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  // Parallax shifts for character and background layers
  const avatarX = useTransform(mouseX, [-400, 400], [-15, 15]);
  const avatarY = useTransform(mouseY, [-400, 400], [-12, 12]);
  const avatarRotate = useTransform(mouseX, [-400, 400], [-2, 2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      rawMouseX.set(e.clientX - centerX);
      rawMouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] xl:h-[600px] flex items-center justify-center pointer-events-none select-none overflow-visible">
      
      {/* ─── 1. Ambient Pulsing Atmospheric Glow ─── */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[340px] sm:w-[440px] lg:w-[500px] h-[340px] sm:h-[440px] lg:h-[500px] rounded-full bg-[#D4A373]/22 blur-[95px] pointer-events-none" />
        <div className="absolute w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full bg-[#e6ccb2]/12 blur-[65px] pointer-events-none" />
      </motion.div>

      {/* ─── 2. Organic Rotating Network Orbit Lines ─── */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full stroke-[#D4A373]/20 fill-none pointer-events-none origin-center"
        viewBox="0 0 500 500"
        style={{ overflow: "visible" }}
      >
        {/* Orbit Rings */}
        <circle cx="250" cy="250" r="175" stroke="#3d3126" strokeWidth="1" strokeDasharray="5 7" opacity="0.5" />
        <circle cx="250" cy="250" r="215" stroke="#D4A373" strokeWidth="1" strokeDasharray="3 9" opacity="0.25" />

        {/* Dynamic Rays */}
        <path d="M 90 120 Q 180 180, 250 200" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 410 130 Q 330 180, 250 200" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 420 340 Q 330 300, 250 290" strokeWidth="1.5" />
        <path d="M 80 360 Q 170 330, 250 290" strokeWidth="1.5" />
      </motion.svg>

      {/* ─── 3. Character Illustration (Floating Breathing Motion + Mouse Parallax) ─── */}
      <motion.div
        style={{
          x: avatarX,
          y: avatarY,
          rotate: avatarRotate,
        }}
        className="relative z-10 w-full h-full flex items-end justify-center"
      >
        <motion.img
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src="/avatar_copy.png"
          alt="Atithi Jaiman - Systems & AI Engineer"
          className="max-h-[90%] w-auto object-contain object-bottom drop-shadow-[0_30px_60px_rgba(212,163,115,0.32)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
        />
      </motion.div>

    </div>
  );
};
