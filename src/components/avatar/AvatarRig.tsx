"use client";

import React, { forwardRef } from "react";

export const CANVAS_WIDTH = 941;
export const CANVAS_HEIGHT = 1672;

export interface AvatarRigProps {
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AvatarRig Component
 *
 * Reconstructs the character from 17 decomposed body-part PNG assets in a 941x1672 coordinate system.
 * Organizes layers into a clean hierarchical DOM structure with pivot points (transform-origins) for future GSAP joint rotations.
 */
export const AvatarRig = forwardRef<HTMLDivElement, AvatarRigProps>(
  ({ scale = 1, className = "", style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`avatar-character-rig ${className}`}
        style={{
          width: CANVAS_WIDTH * scale,
          height: CANVAS_HEIGHT * scale,
          position: "relative",
          ...style,
        }}
      >
        {/* ─── 941 x 1672 Canvas Container ─── */}
        <div
          className="character-canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          {/* ═══ LEGS ═══ */}
          <div className="rig-group rig-legs" style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            {/* ─── Left Leg ─── */}
            <div className="rig-limb rig-left-leg" style={{ position: "absolute", inset: 0 }}>
              {/* Left Thigh (Hip Joint Pivot: top center of thigh) */}
              <div
                className="rig-part rig-left-thigh"
                style={{
                  position: "absolute",
                  left: 314,
                  top: 575,
                  width: 156,
                  height: 295,
                  zIndex: 5,
                  transformOrigin: "50% 10%",
                }}
              >
                <img
                  src="/avatar_parts/left_thigh.png"
                  alt="Left Thigh"
                  width={156}
                  height={295}
                  style={{ display: "block", width: 156, height: 295 }}
                  draggable={false}
                />
              </div>

              {/* Left Shin (Knee Joint Pivot: top center of shin) */}
              <div
                className="rig-part rig-left-shin"
                style={{
                  position: "absolute",
                  left: 323,
                  top: 844,
                  width: 120,
                  height: 382,
                  zIndex: 6,
                  transformOrigin: "50% 5%",
                }}
              >
                <img
                  src="/avatar_parts/left_shin.png"
                  alt="Left Shin"
                  width={120}
                  height={382}
                  style={{ display: "block", width: 120, height: 382 }}
                  draggable={false}
                />
              </div>

              {/* Left Foot (Ankle Joint Pivot: top center of foot) */}
              <div
                className="rig-part rig-left-foot"
                style={{
                  position: "absolute",
                  left: 314,
                  top: 1202,
                  width: 172,
                  height: 130,
                  zIndex: 7,
                  transformOrigin: "35% 15%",
                }}
              >
                <img
                  src="/avatar_parts/left_foot.png"
                  alt="Left Foot"
                  width={172}
                  height={130}
                  style={{ display: "block", width: 172, height: 130 }}
                  draggable={false}
                />
              </div>
            </div>

            {/* ─── Right Leg ─── */}
            <div className="rig-limb rig-right-leg" style={{ position: "absolute", inset: 0 }}>
              {/* Right Thigh (Hip Joint Pivot) */}
              <div
                className="rig-part rig-right-thigh"
                style={{
                  position: "absolute",
                  left: 470,
                  top: 575,
                  width: 156,
                  height: 295,
                  zIndex: 5,
                  transformOrigin: "50% 10%",
                }}
              >
                <img
                  src="/avatar_parts/right_thigh.png"
                  alt="Right Thigh"
                  width={156}
                  height={295}
                  style={{ display: "block", width: 156, height: 295 }}
                  draggable={false}
                />
              </div>

              {/* Right Shin (Knee Joint Pivot) */}
              <div
                className="rig-part rig-right-shin"
                style={{
                  position: "absolute",
                  left: 497,
                  top: 844,
                  width: 120,
                  height: 382,
                  zIndex: 6,
                  transformOrigin: "50% 5%",
                }}
              >
                <img
                  src="/avatar_parts/right_shin.png"
                  alt="Right Shin"
                  width={120}
                  height={382}
                  style={{ display: "block", width: 120, height: 382 }}
                  draggable={false}
                />
              </div>

              {/* Right Foot (Ankle Joint Pivot) */}
              <div
                className="rig-part rig-right-foot"
                style={{
                  position: "absolute",
                  left: 454,
                  top: 1202,
                  width: 172,
                  height: 130,
                  zIndex: 7,
                  transformOrigin: "65% 15%",
                }}
              >
                <img
                  src="/avatar_parts/right_foot.png"
                  alt="Right Foot"
                  width={172}
                  height={130}
                  style={{ display: "block", width: 172, height: 130 }}
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ═══ TORSO ═══ */}
          <div
            className="rig-group rig-torso"
            style={{
              position: "absolute",
              left: 270,
              top: 309,
              width: 400,
              height: 290,
              zIndex: 10,
              transformOrigin: "50% 90%",
            }}
          >
            <img
              src="/avatar_parts/torso.png"
              alt="Torso"
              width={400}
              height={290}
              style={{ display: "block", width: 400, height: 290 }}
              draggable={false}
            />
          </div>

          {/* ═══ LEFT ARM ═══ */}
          <div className="rig-group rig-left-arm" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            {/* Left Upper Arm (Shoulder Joint Pivot: top right of arm) */}
            <div
              className="rig-part rig-left-upper-arm"
              style={{
                position: "absolute",
                left: 235,
                top: 314,
                width: 112,
                height: 163,
                zIndex: 2,
                transformOrigin: "70% 15%",
              }}
            >
              <img
                src="/avatar_parts/left_upper_arm.png"
                alt="Left Upper Arm"
                width={112}
                height={163}
                style={{ display: "block", width: 112, height: 163 }}
                draggable={false}
              />
            </div>

            {/* Left Forearm (Elbow Joint Pivot: top center of forearm) */}
            <div
              className="rig-part rig-left-forearm"
              style={{
                position: "absolute",
                left: 235,
                top: 445,
                width: 95,
                height: 129,
                zIndex: 3,
                transformOrigin: "50% 10%",
              }}
            >
              <img
                src="/avatar_parts/left_forearm.png"
                alt="Left Forearm"
                width={95}
                height={129}
                style={{ display: "block", width: 95, height: 129 }}
                draggable={false}
              />
            </div>

            {/* Left Hand (Wrist Joint Pivot: top center of hand) */}
            <div
              className="rig-part rig-left-hand"
              style={{
                position: "absolute",
                left: 245,
                top: 548,
                width: 94,
                height: 95,
                zIndex: 4,
                transformOrigin: "50% 10%",
              }}
            >
              <img
                src="/avatar_parts/left_hand.png"
                alt="Left Hand"
                width={94}
                height={95}
                style={{ display: "block", width: 94, height: 95 }}
                draggable={false}
              />
            </div>
          </div>

          {/* ═══ RIGHT ARM ═══ */}
          <div className="rig-group rig-right-arm" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            {/* Right Upper Arm (Shoulder Joint Pivot: top left of arm) */}
            <div
              className="rig-part rig-right-upper-arm"
              style={{
                position: "absolute",
                left: 593,
                top: 314,
                width: 112,
                height: 163,
                zIndex: 2,
                transformOrigin: "30% 15%",
              }}
            >
              <img
                src="/avatar_parts/right_upper_arm.png"
                alt="Right Upper Arm"
                width={112}
                height={163}
                style={{ display: "block", width: 112, height: 163 }}
                draggable={false}
              />
            </div>

            {/* Right Forearm (Elbow Joint Pivot) */}
            <div
              className="rig-part rig-right-forearm"
              style={{
                position: "absolute",
                left: 610,
                top: 445,
                width: 95,
                height: 129,
                zIndex: 3,
                transformOrigin: "50% 10%",
              }}
            >
              <img
                src="/avatar_parts/right_forearm.png"
                alt="Right Forearm"
                width={95}
                height={129}
                style={{ display: "block", width: 95, height: 129 }}
                draggable={false}
              />
            </div>

            {/* Right Hand (Wrist Joint Pivot) */}
            <div
              className="rig-part rig-right-hand"
              style={{
                position: "absolute",
                left: 601,
                top: 548,
                width: 94,
                height: 95,
                zIndex: 4,
                transformOrigin: "50% 10%",
              }}
            >
              <img
                src="/avatar_parts/right_hand.png"
                alt="Right Hand"
                width={94}
                height={95}
                style={{ display: "block", width: 94, height: 95 }}
                draggable={false}
              />
            </div>
          </div>

          {/* ═══ HEAD ═══ */}
          <div className="rig-group rig-head" style={{ position: "absolute", inset: 0, zIndex: 12 }}>
            {/* Head Base (Neck Pivot: bottom center of head) */}
            <div
              className="rig-part rig-head-base"
              style={{
                position: "absolute",
                left: 331,
                top: 192,
                width: 278,
                height: 182,
                zIndex: 12,
                transformOrigin: "50% 90%",
              }}
            >
              <img
                src="/avatar_parts/head.png"
                alt="Head Base"
                width={278}
                height={182}
                style={{ display: "block", width: 278, height: 182 }}
                draggable={false}
              />
            </div>

            {/* Hair */}
            <div
              className="rig-part rig-hair"
              style={{
                position: "absolute",
                left: 310,
                top: 100,
                width: 320,
                height: 195,
                zIndex: 15,
                transformOrigin: "50% 80%",
              }}
            >
              <img
                src="/avatar_parts/hair.png"
                alt="Hair"
                width={320}
                height={195}
                style={{ display: "block", width: 320, height: 195 }}
                draggable={false}
              />
            </div>

            {/* Eyes */}
            <div
              className="rig-part rig-eyes"
              style={{
                position: "absolute",
                left: 358,
                top: 217,
                width: 224,
                height: 48,
                zIndex: 13,
                transformOrigin: "50% 50%",
              }}
            >
              <img
                src="/avatar_parts/eyes.png"
                alt="Eyes"
                width={224}
                height={48}
                style={{ display: "block", width: 224, height: 48 }}
                draggable={false}
              />
            </div>

            {/* Mouth & Nose */}
            <div
              className="rig-part rig-mouth-nose"
              style={{
                position: "absolute",
                left: 384,
                top: 244,
                width: 172,
                height: 68,
                zIndex: 14,
                transformOrigin: "50% 50%",
              }}
            >
              <img
                src="/avatar_parts/mouth_nose.png"
                alt="Mouth & Nose"
                width={172}
                height={68}
                style={{ display: "block", width: 172, height: 68 }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AvatarRig.displayName = "AvatarRig";
export default AvatarRig;
