"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Las animaciones de marca (hero, reveals, orbital) se reproducen siempre, incluso
 * si el sistema tiene activado "Reducir movimiento", por pedido explícito del dueño.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
