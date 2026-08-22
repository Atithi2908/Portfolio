/**
 * Hero Section Scroll Animation
 *
 * ScrollTrigger scrubbed animation for section changes:
 *   - Head tilt & eyebrow raises
 *   - Eye gaze tracking section elements
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PART_SELECTORS, PIVOT_POINTS } from "./states";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroAnimationResult {
  timeline: gsap.core.Timeline;
  kill: () => void;
}

export function createHeroAnimation(
  q: gsap.utils.SelectorFunc
): HeroAnimationResult {
  const leftGaze = q(PART_SELECTORS.leftGaze)[0];
  const rightGaze = q(PART_SELECTORS.rightGaze)[0];
  const head = q(PART_SELECTORS.head)[0];
  const leftBrow = q(PART_SELECTORS.leftEyebrow)[0];
  const rightBrow = q(PART_SELECTORS.rightEyebrow)[0];
  const mouth = q(PART_SELECTORS.mouth)[0];

  if (!leftGaze || !rightGaze || !head) {
    return {
      timeline: gsap.timeline(),
      kill: () => {},
    };
  }

  gsap.set(head, { transformOrigin: PIVOT_POINTS.head });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  /* 0–25%: Look towards hero heading */
  tl.to([leftGaze, rightGaze], { x: 5, y: -1, duration: 0.25, ease: "none" }, 0);
  tl.to(head, { rotation: 4, duration: 0.25, ease: "power1.out" }, 0);

  /* 25–45%: Nod & eyebrows raise on focus statement */
  tl.to(head, { rotation: 7, y: 2, duration: 0.1, ease: "power2.inOut" });
  tl.to(head, { rotation: 4, y: 0, duration: 0.1, ease: "power2.out" });

  if (leftBrow && rightBrow) {
    tl.to([leftBrow, rightBrow], { y: -4, duration: 0.1, ease: "power2.out" }, "<");
    tl.to([leftBrow, rightBrow], { y: 0, duration: 0.1, ease: "power2.inOut" });
  }

  /* 45–75%: Gaze follows action buttons */
  tl.to([leftGaze, rightGaze], { x: 4, y: 3, duration: 0.3, ease: "none" });

  /* 75–100%: Settle gaze toward center for Education */
  tl.to([leftGaze, rightGaze], { x: 2, y: 0, duration: 0.25, ease: "power1.inOut" });
  tl.to(head, { rotation: 1, duration: 0.25, ease: "power1.inOut" }, "<");

  return {
    timeline: tl,
    kill: () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    },
  };
}
