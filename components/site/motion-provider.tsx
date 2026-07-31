"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes Motion drop transform animations by itself
 * when the visitor asks for reduced motion, while still allowing opacity.
 *
 * This is deliberately used INSTEAD of branching on useReducedMotion() in
 * an `initial` prop: that hook reads false during the server render and
 * true on the client, which produces a hydration mismatch React refuses to
 * patch up. Letting Motion handle it keeps the markup identical on both
 * sides.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
