"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CharacterSVG from "@/components/characters/CharacterSVG";
import { CharacterController } from "@/animations/characterController";
import { createHeroAnimation, HeroAnimationResult } from "@/animations/heroAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CharacterStage
 *
 * Fixed-position left panel containing the animated 2D SVG character.
 * Features:
 * - Skeletal idle animations (visible breathing, blinking, body sway, arm sway)
 * - Real-time mouse cursor eye & head tracking across the viewport
 * - Scroll-driven section reactions (Hero, Education, Projects, Skills)
 * - Automatic random gestures (nods, eyebrow raises)
 */
export default function CharacterStage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const controllerRef = useRef<CharacterController | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Respect user's reduced-motion setting
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // ── 1. Initialize character controller ──
    const controller = new CharacterController(svgRef.current);
    controllerRef.current = controller;

    // Start idle behaviors (breathing, blinking, sway, arm sway)
    controller.startIdle();

    // Default pose: look towards the content area (upper right)
    controller.lookAt(0.6, -0.2, 1.0);

    // ── 2. Real-time Mouse Eye & Head Tracking ──
    let mouseX = 0.6;
    let mouseY = -0.2;
    let isMouseActive = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1) relative to viewport
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      isMouseActive = true;

      controller.lookAt(mouseX, mouseY, 0.25);

      // Reset to content-facing pose after mouse stops moving for 3s
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseActive = false;
        controller.lookAt(0.6, 0.1, 1.2);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ── 3. Scroll-driven section reactions ──
    let heroAnim: HeroAnimationResult | null = null;

    const initScrollAnimations = () => {
      if (!svgRef.current) return;
      const q = gsap.utils.selector(svgRef.current);
      heroAnim = createHeroAnimation(q);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(initScrollAnimations);
    });

    // ── 4. Periodic natural gestures ──
    const nodInterval = setInterval(() => {
      if (!isMouseActive && Math.random() < 0.35) {
        controller.nod(0.7 + Math.random() * 0.4);
      }
    }, 5000);

    const browInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        controller.raiseEyebrows(0.7 + Math.random() * 0.5);
      }
    }, 7500);

    // ── 5. Cleanup ──
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseTimeout);
      clearInterval(nodInterval);
      clearInterval(browInterval);
      heroAnim?.kill();
      controller.destroy();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="fixed left-0 top-0 z-30 hidden lg:flex h-screen items-end justify-center pointer-events-none"
      style={{ width: "32vw" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,163,115,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Ground shadow */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "170px",
          height: "14px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Animated SVG Character */}
      <div className="relative mb-6 pointer-events-auto" style={{ width: "230px", height: "auto" }}>
        <CharacterSVG
          ref={svgRef}
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.45))" }}
        />
      </div>
    </div>
  );
}
