/**
 * CharacterController
 *
 * Central orchestrator for all character animations.
 * Owns GSAP timelines, manages skeletal pivots, state transitions,
 * mouse tracking, nodding, and eye gaze control.
 */

import gsap from "gsap";
import { AnimationState, PART_SELECTORS, PIVOT_POINTS } from "./states";
import {
  createBreathingTimeline,
  startBlinking,
  createMicroSwayTimeline,
  createArmSwayTimeline,
  createHeadMicroTimeline,
} from "./idleAnimation";

export class CharacterController {
  private svg: SVGSVGElement;
  private q: gsap.utils.SelectorFunc;
  private _currentState: AnimationState = AnimationState.IDLE_STANDING;
  private activeTimelines: gsap.core.Timeline[] = [];
  private blinkController: { kill: () => void } | null = null;
  private destroyed = false;

  constructor(svgElement: SVGSVGElement) {
    this.svg = svgElement;
    this.q = gsap.utils.selector(svgElement);
    this.initPivots();
  }

  get currentState(): AnimationState {
    return this._currentState;
  }

  /**
   * Set transformOrigin on all body parts for skeletal joint rotation.
   */
  private initPivots(): void {
    const setPivot = (selector: string, origin: string) => {
      const el = this.q(selector)[0];
      if (el) gsap.set(el, { transformOrigin: origin });
    };

    setPivot(PART_SELECTORS.root, PIVOT_POINTS.root);
    setPivot(PART_SELECTORS.hips, PIVOT_POINTS.hips);
    setPivot(PART_SELECTORS.upperBody, PIVOT_POINTS.upperBody);
    setPivot(PART_SELECTORS.head, PIVOT_POINTS.head);
    setPivot(PART_SELECTORS.neckGroup, PIVOT_POINTS.neck);
    setPivot(PART_SELECTORS.leftUpperArm, PIVOT_POINTS.leftShoulder);
    setPivot(PART_SELECTORS.leftLowerArm, PIVOT_POINTS.leftElbow);
    setPivot(PART_SELECTORS.leftHand, PIVOT_POINTS.leftWrist);
    setPivot(PART_SELECTORS.rightUpperArm, PIVOT_POINTS.rightShoulder);
    setPivot(PART_SELECTORS.rightLowerArm, PIVOT_POINTS.rightElbow);
    setPivot(PART_SELECTORS.rightHand, PIVOT_POINTS.rightWrist);
    setPivot(PART_SELECTORS.leftUpperLeg, PIVOT_POINTS.leftHip);
    setPivot(PART_SELECTORS.leftLowerLeg, PIVOT_POINTS.leftKnee);
    setPivot(PART_SELECTORS.leftFoot, PIVOT_POINTS.leftAnkle);
    setPivot(PART_SELECTORS.rightUpperLeg, PIVOT_POINTS.rightHip);
    setPivot(PART_SELECTORS.rightLowerLeg, PIVOT_POINTS.rightKnee);
    setPivot(PART_SELECTORS.rightFoot, PIVOT_POINTS.rightAnkle);
    setPivot(PART_SELECTORS.leftGaze, PIVOT_POINTS.leftGaze);
    setPivot(PART_SELECTORS.rightGaze, PIVOT_POINTS.rightGaze);
  }

  /**
   * Start idle standing animation.
   */
  startIdle(): void {
    if (this.destroyed) return;

    this._currentState = AnimationState.IDLE_STANDING;
    this.killActiveTimelines();

    const breathTl = createBreathingTimeline(this.q);
    const swayTl = createMicroSwayTimeline(this.q);
    const armTl = createArmSwayTimeline(this.q);
    const headTl = createHeadMicroTimeline(this.q);
    this.blinkController = startBlinking(this.q);

    this.activeTimelines.push(breathTl, swayTl, armTl, headTl);
  }

  /**
   * Dynamic eye gaze & head tracking.
   * @param targetX Normalized X (-1 left, 0 center, 1 right)
   * @param targetY Normalized Y (-1 top, 0 center, 1 bottom)
   * @param duration Transition duration
   */
  lookAt(targetX: number, targetY: number, duration: number = 0.35): void {
    if (this.destroyed) return;

    const tx = Math.max(-1, Math.min(1, targetX));
    const ty = Math.max(-1, Math.min(1, targetY));

    // Shift gaze group up to ±8px horizontally, ±5px vertically
    const gazeX = tx * 8;
    const gazeY = ty * 5;

    // Head turns up to ±7° toward target
    const headRotation = tx * 7;
    const headY = ty * 2;

    // Eyebrows react subtly
    const browY = ty < -0.3 ? -3 : ty > 0.4 ? 1 : 0;

    const leftGaze = this.q(PART_SELECTORS.leftGaze)[0];
    const rightGaze = this.q(PART_SELECTORS.rightGaze)[0];
    const head = this.q(PART_SELECTORS.head)[0];
    const leftBrow = this.q(PART_SELECTORS.leftEyebrow)[0];
    const rightBrow = this.q(PART_SELECTORS.rightEyebrow)[0];

    if (leftGaze && rightGaze) {
      gsap.to([leftGaze, rightGaze], {
        x: gazeX,
        y: gazeY,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (head) {
      gsap.to(head, {
        rotation: headRotation,
        y: headY,
        duration: duration * 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (leftBrow && rightBrow) {
      gsap.to([leftBrow, rightBrow], {
        y: browY,
        duration: duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }

  /**
   * Character nod animation.
   */
  nod(intensity: number = 1): void {
    if (this.destroyed) return;

    const head = this.q(PART_SELECTORS.head)[0];
    if (!head) return;

    const nodAngle = 6 * intensity;

    gsap
      .timeline()
      .to(head, {
        rotation: `+=${nodAngle}`,
        y: "+=3",
        duration: 0.18,
        ease: "power2.out",
      })
      .to(head, {
        rotation: `-=${nodAngle}`,
        y: "-=3",
        duration: 0.3,
        ease: "power2.inOut",
      });
  }

  /**
   * Raise eyebrows (interest/surprise).
   */
  raiseEyebrows(duration: number = 0.8): void {
    if (this.destroyed) return;

    const leftBrow = this.q(PART_SELECTORS.leftEyebrow)[0];
    const rightBrow = this.q(PART_SELECTORS.rightEyebrow)[0];
    if (!leftBrow || !rightBrow) return;

    gsap
      .timeline()
      .to([leftBrow, rightBrow], {
        y: -5,
        duration: 0.15,
        ease: "power2.out",
      })
      .to([leftBrow, rightBrow], {
        y: 0,
        duration: duration,
        ease: "power2.inOut",
      });
  }

  private killActiveTimelines(): void {
    this.activeTimelines.forEach((tl) => tl.kill());
    this.activeTimelines = [];
    this.blinkController?.kill();
    this.blinkController = null;
  }

  destroy(): void {
    this.destroyed = true;
    this.killActiveTimelines();

    const allParts = this.svg.querySelectorAll("[data-part]");
    allParts.forEach((el) => {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "all" });
    });
  }
}
