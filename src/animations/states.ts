/**
 * Animation state machine definitions for the character animation system.
 */

export enum AnimationState {
  IDLE_STANDING = "IDLE_STANDING",
  LOOKING_RIGHT = "LOOKING_RIGHT",
  NODDING = "NODDING",
  WALKING = "WALKING",
  SITTING_DOWN = "SITTING_DOWN",
  READING = "READING",
  STANDING_UP = "STANDING_UP",
  CODING = "CODING",
  CO_WORKING = "CO_WORKING",
  LOOK_UP = "LOOK_UP",
  HEAD_OPEN = "HEAD_OPEN",
  TECH_ABSORBING = "TECH_ABSORBING",
  TECH_COMPLETE = "TECH_COMPLETE",
}

/**
 * Pivot points for each body part in SVG coordinate space (viewBox 0 0 400 800).
 */
export const PIVOT_POINTS = {
  root: "200 400",
  hips: "200 355",
  upperBody: "200 340",
  head: "200 148",
  neck: "200 148",
  leftShoulder: "138 178",
  rightShoulder: "262 178",
  leftElbow: "120 275",
  rightElbow: "280 275",
  leftWrist: "112 365",
  rightWrist: "288 365",
  leftHip: "172 355",
  rightHip: "228 355",
  leftKnee: "168 505",
  rightKnee: "232 505",
  leftAnkle: "166 638",
  rightAnkle: "234 638",
  leftGaze: "180 92",
  rightGaze: "220 92",
} as const;

/**
 * Selector strings for querying character body parts via data-part attributes.
 */
export const PART_SELECTORS = {
  root: '[data-part="root"]',
  hips: '[data-part="hips"]',
  upperBody: '[data-part="upper-body"]',
  torsoShape: '[data-part="torso-shape"]',
  collar: '[data-part="collar"]',
  neckGroup: '[data-part="neck-group"]',
  neckShape: '[data-part="neck-shape"]',
  head: '[data-part="head"]',
  face: '[data-part="face"]',
  hair: '[data-part="hair"]',
  leftEye: '[data-part="left-eye"]',
  rightEye: '[data-part="right-eye"]',
  leftGaze: '[data-part="left-gaze"]',
  rightGaze: '[data-part="right-gaze"]',
  leftPupil: '[data-part="left-pupil"]',
  rightPupil: '[data-part="right-pupil"]',
  leftIris: '[data-part="left-iris"]',
  rightIris: '[data-part="right-iris"]',
  leftEyelid: '[data-part="left-eyelid"]',
  rightEyelid: '[data-part="right-eyelid"]',
  leftEyebrow: '[data-part="left-eyebrow"]',
  rightEyebrow: '[data-part="right-eyebrow"]',
  mouth: '[data-part="mouth"]',
  leftUpperArm: '[data-part="left-upper-arm"]',
  leftLowerArm: '[data-part="left-lower-arm"]',
  leftHand: '[data-part="left-hand"]',
  rightUpperArm: '[data-part="right-upper-arm"]',
  rightLowerArm: '[data-part="right-lower-arm"]',
  rightHand: '[data-part="right-hand"]',
  leftUpperLeg: '[data-part="left-upper-leg"]',
  leftLowerLeg: '[data-part="left-lower-leg"]',
  leftFoot: '[data-part="left-foot"]',
  rightUpperLeg: '[data-part="right-upper-leg"]',
  rightLowerLeg: '[data-part="right-lower-leg"]',
  rightFoot: '[data-part="right-foot"]',
} as const;
