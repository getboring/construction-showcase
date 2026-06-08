export type EasingFunction =
  | "none"
  | "power1.in"
  | "power1.out"
  | "power1.inOut"
  | "power2.in"
  | "power2.out"
  | "power2.inOut"
  | "power3.in"
  | "power3.out"
  | "power3.inOut"
  | "power4.in"
  | "power4.out"
  | "power4.inOut"
  | "back.in"
  | "back.out"
  | "back.inOut"
  | "circ.in"
  | "circ.out"
  | "circ.inOut"
  | "expo.in"
  | "expo.out"
  | "expo.inOut";

export const easings = {
  smooth: "power2.out" as EasingFunction,
  snappy: "power3.out" as EasingFunction,
  elastic: "back.out(1.7)" as string,
  dramatic: "power4.inOut" as EasingFunction,
  linear: "none" as EasingFunction,
} as const;

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  dramatic: 0.8,
  scroll: 1,
} as const;

export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;