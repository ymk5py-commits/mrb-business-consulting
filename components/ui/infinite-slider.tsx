"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/components/ui";

type InfiniteSliderProps = {
  children: ReactNode;
  /** Separación entre elementos, en px. */
  gap?: number;
  /** Velocidad en px/segundo. */
  speed?: number;
  /** Velocidad al pasar el mouse (px/s). Omitir para no cambiar. */
  speedOnHover?: number;
  /** Invierte la dirección. */
  reverse?: boolean;
  className?: string;
};

/**
 * Marquee infinito y fluido. Duplica el contenido para un loop sin cortes.
 * Pausa/ralentiza en hover y respeta prefers-reduced-motion (queda estático y visible).
 */
export function InfiniteSlider({
  children,
  gap = 16,
  speed = 60,
  speedOnHover,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [gap, children]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const half = halfRef.current;
    if (!half) return;
    const v = hovered && speedOnHover != null ? speedOnHover : speed;
    const dir = reverse ? 1 : -1;
    let next = x.get() + (dir * v * delta) / 1000;
    if (next <= -half) next += half;
    else if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <motion.div ref={trackRef} className="flex w-max" style={{ x }}>
        <div className="flex shrink-0 items-center" style={{ columnGap: gap, paddingRight: gap }}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          style={{ columnGap: gap, paddingRight: gap }}
          aria-hidden="true"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
