"use client";

import React, { useState, useEffect } from "react";

const CANVAS_W = 941;
const CANVAS_H = 1672;

export interface BodyPartConfig {
  id: string;
  file: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  zIndex: number;
}

export const BODY_PARTS: BodyPartConfig[] = [
  // Arms
  { id: "left_upper_arm",  file: "left_upper_arm.png",  x: 235, y: 314, w: 112, h: 163, label: "L Upper Arm",  zIndex: 2 },
  { id: "left_forearm",    file: "left_forearm.png",     x: 235, y: 445, w: 95,  h: 129, label: "L Forearm",    zIndex: 3 },
  { id: "left_hand",       file: "left_hand.png",        x: 245, y: 548, w: 94,  h: 95,  label: "L Hand",       zIndex: 4 },
  { id: "right_upper_arm", file: "right_upper_arm.png",  x: 593, y: 314, w: 112, h: 163, label: "R Upper Arm",  zIndex: 2 },
  { id: "right_forearm",   file: "right_forearm.png",    x: 610, y: 445, w: 95,  h: 129, label: "R Forearm",    zIndex: 3 },
  { id: "right_hand",      file: "right_hand.png",       x: 601, y: 548, w: 94,  h: 95,  label: "R Hand",       zIndex: 4 },

  // Legs
  { id: "left_thigh",      file: "left_thigh.png",       x: 314, y: 575, w: 156, h: 295, label: "L Thigh",      zIndex: 5 },
  { id: "right_thigh",     file: "right_thigh.png",      x: 470, y: 575, w: 156, h: 295, label: "R Thigh",      zIndex: 5 },
  { id: "left_shin",       file: "left_shin.png",        x: 323, y: 844, w: 120, h: 382, label: "L Shin",       zIndex: 6 },
  { id: "right_shin",      file: "right_shin.png",       x: 497, y: 844, w: 120, h: 382, label: "R Shin",       zIndex: 6 },
  { id: "left_foot",       file: "left_foot.png",        x: 314, y: 1202, w: 172, h: 130, label: "L Foot",       zIndex: 7 },
  { id: "right_foot",      file: "right_foot.png",       x: 454, y: 1202, w: 172, h: 130, label: "R Foot",       zIndex: 7 },

  // Torso & Head
  { id: "torso",           file: "torso.png",            x: 270, y: 309, w: 400, h: 290, label: "Torso",        zIndex: 10 },
  { id: "head",            file: "head.png",             x: 331, y: 192, w: 278, h: 182, label: "Head",         zIndex: 12 },
  { id: "eyes",            file: "eyes.png",             x: 358, y: 217, w: 224, h: 48,  label: "Eyes",         zIndex: 13 },
  { id: "mouth_nose",      file: "mouth_nose.png",       x: 384, y: 244, w: 172, h: 68,  label: "Mouth/Nose",   zIndex: 14 },
  { id: "hair",            file: "hair.png",             x: 310, y: 100, w: 320, h: 195, label: "Hair",         zIndex: 15 },
];

type ViewMode = "reference" | "layers" | "both";

export default function AvatarAlignmentTest() {
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [debugMode, setDebugMode] = useState(true);
  const [scale, setScale] = useState(0.45);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const availableH = window.innerHeight - 180;
      const availableW = window.innerWidth - 40;
      const s = Math.max(0.2, Math.min(0.65, availableH / CANVAS_H, availableW / CANVAS_W));
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const showReference = viewMode === "reference" || viewMode === "both";
  const showLayers = viewMode === "layers" || viewMode === "both";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0e",
        color: "#f3ede2",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 16px 40px",
      }}
    >
      {/* ─── Header & Controls ─── */}
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
          zIndex: 100,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "#D4A373" }}>
          Avatar Layer Alignment Test
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "#a89b8a" }}>
          Coordinate System: <code style={{ color: "#D4A373" }}>941 × 1672 px</code>
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            background: "#161514",
            padding: "6px 10px",
            borderRadius: 12,
            border: "1px solid #2d2620",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: "#8a7d6e", marginRight: 4 }}>
            VIEW MODE:
          </span>
          {(["both", "layers", "reference"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: viewMode === mode ? "#D4A373" : "transparent",
                color: viewMode === mode ? "#120e0a" : "#c4b8a5",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {mode === "both" ? "Both (Overlay)" : mode === "layers" ? "Individual Layers" : "Reference Only"}
            </button>
          ))}

          <div style={{ width: 1, height: 20, background: "#332c25", margin: "0 4px" }} />

          <button
            onClick={() => setDebugMode(!debugMode)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: debugMode ? "1px solid #4CAF50" : "1px solid #332c25",
              background: debugMode ? "rgba(76, 175, 80, 0.15)" : "transparent",
              color: debugMode ? "#4CAF50" : "#c4b8a5",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {debugMode ? "✓ Debug Labels ON" : "Debug Labels OFF"}
          </button>
        </div>
      </header>

      {/* ─── Canvas Wrapper (Respects Scaled Height) ─── */}
      <div
        style={{
          width: CANVAS_W * scale,
          height: CANVAS_H * scale,
          position: "relative",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CANVAS_W,
            height: CANVAS_H,
            border: "2px dashed #3d332a",
            borderRadius: 16,
            background: "#050505",
            overflow: "hidden",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          }}
        >
          {/* ─── Reference Image Underneath ─── */}
          {showReference && (
            <img
              src="/avatar_parts/avatar_transparent.png"
              alt="Reference Avatar"
              width={CANVAS_W}
              height={CANVAS_H}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: CANVAS_W,
                height: CANVAS_H,
                opacity: viewMode === "both" ? 0.4 : 1,
                pointerEvents: "none",
                zIndex: 1,
              }}
              draggable={false}
            />
          )}

          {/* ─── Decomposed Body-Part Layers ─── */}
          {showLayers &&
            BODY_PARTS.map((part) => {
              const isSelected = selectedPart === part.id;
              return (
                <div
                  key={part.id}
                  onClick={() => setSelectedPart(isSelected ? null : part.id)}
                  style={{
                    position: "absolute",
                    left: part.x,
                    top: part.y,
                    width: part.w,
                    height: part.h,
                    zIndex: isSelected ? 99 : part.zIndex,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={`/avatar_parts/${part.file}`}
                    alt={part.label}
                    width={part.w}
                    height={part.h}
                    style={{
                      display: "block",
                      width: part.w,
                      height: part.h,
                      pointerEvents: "none",
                      filter: isSelected ? "drop-shadow(0 0 8px #D4A373)" : "none",
                    }}
                    draggable={false}
                  />

                  {/* ─── Debug Bounding Box & Label ─── */}
                  {debugMode && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          border: isSelected
                            ? "2px solid #D4A373"
                            : "1px solid rgba(212, 163, 115, 0.45)",
                          background: isSelected ? "rgba(212, 163, 115, 0.15)" : "transparent",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: -2,
                          left: -2,
                          background: isSelected ? "#D4A373" : "#1a1511",
                          color: isSelected ? "#120e0a" : "#e6ccb2",
                          border: "1px solid #3d332a",
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: "monospace",
                          padding: "2px 5px",
                          whiteSpace: "nowrap",
                          borderRadius: 4,
                          pointerEvents: "none",
                          zIndex: 999,
                        }}
                      >
                        {part.label} ({part.x}, {part.y})
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* ─── Body Part Coordinates & Dimensions Table ─── */}
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          background: "#141210",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #2b231c",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#D4A373" }}>
            Extracted Layer Coordinates & Dimensions
          </h2>
          <span style={{ fontSize: 12, color: "#8a7d6e", fontFamily: "monospace" }}>
            Total Layers: {BODY_PARTS.length}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              fontFamily: "monospace",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #2d2620", color: "#8a7d6e", textTransform: "uppercase", fontSize: 11 }}>
                <th style={{ textAlign: "left", padding: "8px 10px" }}>Body Part</th>
                <th style={{ textAlign: "left", padding: "8px 10px" }}>File Name</th>
                <th style={{ textAlign: "right", padding: "8px 10px" }}>X (px)</th>
                <th style={{ textAlign: "right", padding: "8px 10px" }}>Y (px)</th>
                <th style={{ textAlign: "right", padding: "8px 10px" }}>Width</th>
                <th style={{ textAlign: "right", padding: "8px 10px" }}>Height</th>
              </tr>
            </thead>
            <tbody>
              {BODY_PARTS.map((part) => {
                const isSelected = selectedPart === part.id;
                return (
                  <tr
                    key={part.id}
                    onClick={() => setSelectedPart(isSelected ? null : part.id)}
                    style={{
                      borderBottom: "1px solid #1c1815",
                      background: isSelected ? "rgba(212, 163, 115, 0.1)" : "transparent",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <td style={{ padding: "8px 10px", color: isSelected ? "#D4A373" : "#f3ede2", fontWeight: 600 }}>
                      {part.label}
                    </td>
                    <td style={{ padding: "8px 10px", color: "#a89b8a" }}>{part.file}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#D4A373" }}>{part.x}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#D4A373" }}>{part.y}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#c4b8a5" }}>{part.w}px</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#c4b8a5" }}>{part.h}px</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
