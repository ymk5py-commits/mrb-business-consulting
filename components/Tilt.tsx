"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "./ui";

gsap.registerPlugin(useGSAP);

/** Inclina su contenido en 3D según la posición del mouse. Solo desktop. */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe || window.matchMedia("(pointer: coarse)").matches) {
        return;
      }
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.45, ease: "power3" });

      const onMove = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * max);
        ry(px * max);
      });
      const onLeave = contextSafe(() => {
        rx(0);
        ry(0);
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("h-full will-change-transform", className)}>
      {children}
    </div>
  );
}
