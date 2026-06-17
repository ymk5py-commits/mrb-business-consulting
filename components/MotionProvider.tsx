"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respeta prefers-reduced-motion a nivel global: para esos usuarios, Framer Motion
 * desactiva los desplazamientos (transform/layout) pero las animaciones igualmente
 * llegan a su estado final visible (opacity 1). Así nada queda atascado en "hidden".
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
