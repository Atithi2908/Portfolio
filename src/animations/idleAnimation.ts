/**
 * Idle animation behaviors: breathing, blinking, micro-sway, arm sway, head tilt.
 *
 * Designed with expressive, visible amplitudes so the 2D character feels alive and interactive.
 */

import gsap from "gsap";
import { PART_SELECTORS, PIVOT_POINTS } from "./states";

/**
 * Start breathing cycle.
 * Expands torso upward from the waist pivot point.
 */
export function createBreathingTimeline(
  q: gsap.utils.SelectorFunc
): gsap.core.Timeline {
  const upperBody = q(PART_SELECTORS.upperBody)[0];
  if (!upperBody) return gsap.timeline();

  gsap.set(upperBody, { transformOrigin: PIVOT_POINTS.upperBody });

  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(upperBody, {
    scaleY: 1.025,
    scaleX: 1.01,
    y: -1.5,
    duration: 2.0,
    ease: "sine.inOut",
  });
  return tl;
}

/**
 * Start blinking loop.
 * Eyelids scaleY 0 -> 1 -> 0 with smooth easing at random intervals (1.8s – 4s).
 */
export function startBlinking(
  q: gsap.utils.SelectorFunc
): { kill: () => void } {
  const leftEyelid = q(PART_SELECTORS.leftEyelid)[0];
  const rightEyelid = q(PART_SELECTORS.rightEyelid)[0];

  if (!leftEyelid || !rightEyelid) return { kill: () => {} };

  gsap.set(leftEyelid, { transformOrigin: "180px 83px", scaleY: 0 });
  gsap.set(rightEyelid, { transformOrigin: "220px 83px", scaleY: 0 });

  let delayedCall: gsap.core.Tween | null = null;
  let killed = false;

  function doBlink() {
    if (killed) return;

    const isDoubleBlink = Math.random() < 0.2;
    const tl = gsap.timeline({
      onComplete: () => {
        if (killed) return;
        const nextDelay = 1.8 + Math.random() * 2.8;
        delayedCall = gsap.delayedCall(nextDelay, doBlink);
      },
    });

    // Blink close
    tl.to([leftEyelid, rightEyelid], {
      scaleY: 1.1,
      duration: 0.1,
      ease: "power2.in",
    });
    // Blink open
    tl.to([leftEyelid, rightEyelid], {
      scaleY: 0,
      duration: 0.12,
      ease: "power2.out",
    });

    if (isDoubleBlink) {
      tl.to(
        [leftEyelid, rightEyelid],
        { scaleY: 1.1, duration: 0.08, ease: "power2.in" },
        "+=0.06"
      );
      tl.to([leftEyelid, rightEyelid], {
        scaleY: 0,
        duration: 0.12,
        ease: "power2.out",
      });
    }
  }

  delayedCall = gsap.delayedCall(0.8 + Math.random() * 1.5, doBlink);

  return {
    kill: () => {
      killed = true;
      delayedCall?.kill();
    },
  };
}

/**
 * Create micro-sway timeline.
 * Weight shift across hips and root group.
 */
export function createMicroSwayTimeline(
  q: gsap.utils.SelectorFunc
): gsap.core.Timeline {
  const root = q(PART_SELECTORS.root)[0];
  if (!root) return gsap.timeline();

  gsap.set(root, { transformOrigin: PIVOT_POINTS.root });

  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(root, {
    rotation: 1.2,
    x: 1.5,
    duration: 3.5,
    ease: "sine.inOut",
  });
  tl.to(root, {
    rotation: -1.0,
    x: -1.5,
    duration: 4.0,
    ease: "sine.inOut",
  });
  return tl;
}

/**
 * Create arm sway timeline.
 * Gentle arm movement at shoulder joints.
 */
export function createArmSwayTimeline(
  q: gsap.utils.SelectorFunc
): gsap.core.Timeline {
  const leftUpperArm = q(PART_SELECTORS.leftUpperArm)[0];
  const rightUpperArm = q(PART_SELECTORS.rightUpperArm)[0];

  if (!leftUpperArm || !rightUpperArm) return gsap.timeline();

  gsap.set(leftUpperArm, { transformOrigin: PIVOT_POINTS.leftShoulder });
  gsap.set(rightUpperArm, { transformOrigin: PIVOT_POINTS.rightShoulder });

  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(leftUpperArm, { rotation: 2.5, duration: 3.0, ease: "sine.inOut" }, 0);
  tl.to(
    rightUpperArm,
    { rotation: -2.5, duration: 3.2, ease: "sine.inOut" },
    0
  );
  return tl;
}

/**
 * Create head micro-tilt timeline.
 */
export function createHeadMicroTimeline(
  q: gsap.utils.SelectorFunc
): gsap.core.Timeline {
  const head = q(PART_SELECTORS.head)[0];
  if (!head) return gsap.timeline();

  gsap.set(head, { transformOrigin: PIVOT_POINTS.head });

  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(head, { rotation: 2.0, y: -0.5, duration: 3.8, ease: "sine.inOut" });
  tl.to(head, { rotation: -1.5, y: 0.5, duration: 4.2, ease: "sine.inOut" });
  return tl;
}
