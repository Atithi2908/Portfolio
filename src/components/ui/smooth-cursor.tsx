"use client";

import React, { useEffect, useRef, useState } from "react";

export const SmoothCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth Lerp animation loop (60-120fps)
    const render = () => {
      // Fast tracking for small center dot (lerp factor 0.75)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.75;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.75;

      // Silky trailing for outer smooth ring (lerp factor 0.16)
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.16;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-size duration-200"
        style={{
          transform: `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ease-out ${
            isHoveringLink
              ? "h-11 w-11 border-[#D4A373] bg-[#D4A373]/15 scale-110 shadow-[0_0_20px_rgba(212,163,115,0.4)]"
              : "h-8 w-8 border-[#D4A373]/60 bg-[#D4A373]/5 shadow-[0_0_12px_rgba(212,163,115,0.2)]"
          }`}
        />
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`,
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#E6CCB2] shadow-[0_0_8px_#D4A373]" />
      </div>
    </>
  );
};
