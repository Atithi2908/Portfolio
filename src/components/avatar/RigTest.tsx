"use client";

import React, { useState, useEffect } from "react";
import AvatarRig, { CANVAS_WIDTH, CANVAS_HEIGHT } from "./AvatarRig";

export default function RigTest() {
  const [scale, setScale] = useState(0.45);
  const [showReference, setShowReference] = useState(true);

  useEffect(() => {
    const updateScale = () => {
      const availableH = window.innerHeight - 160;
      const availableW = window.innerWidth - 40;
      const s = Math.max(0.2, Math.min(0.7, availableH / CANVAS_HEIGHT, availableW / CANVAS_WIDTH));
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080706",
        color: "#f3ede2",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#D4A373" }}>
          Static Character Rig Test
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "#a89b8a" }}>
          Component: <code style={{ color: "#D4A373" }}>AvatarRig.tsx</code> (Hierarchical DOM Rig)
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            background: "#171310",
            padding: "8px 16px",
            borderRadius: 10,
            border: "1px solid #3d332a",
          }}
        >
          <button
            onClick={() => setShowReference(!showReference)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: showReference ? "1px solid #D4A373" : "1px solid #3d332a",
              background: showReference ? "rgba(212, 163, 115, 0.15)" : "transparent",
              color: showReference ? "#D4A373" : "#a89b8a",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {showReference ? "✓ Reference Overlay (40%)" : "Reference Overlay OFF"}
          </button>

          <span style={{ fontSize: 12, color: "#a89b8a" }}>
            Scale: <strong style={{ color: "#f3ede2" }}>{(scale * 100).toFixed(0)}%</strong>
          </span>
        </div>
      </header>

      {/* ─── Rig Container ─── */}
      <div
        style={{
          position: "relative",
          width: CANVAS_WIDTH * scale,
          height: CANVAS_HEIGHT * scale,
          border: "2px dashed #3d332a",
          borderRadius: 12,
          background: "#0d0a08",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        }}
      >
        {/* Reference Image Underneath */}
        {showReference && (
          <img
            src="/avatar_parts/avatar_transparent.png"
            alt="Reference Avatar"
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              opacity: 0.4,
              pointerEvents: "none",
              zIndex: 1,
            }}
            draggable={false}
          />
        )}

        {/* Hierarchical Rig */}
        <AvatarRig scale={scale} style={{ zIndex: 2 }} />
      </div>
    </div>
  );
}
