"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const INTERACTIVE = "a, button, [role='button'], input, select, textarea, summary, label, .cursor-pointer";

/** Seguidor de cursor (anillo) que crece sobre elementos interactivos. Solo desktop. */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ring.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        gsap.to(el, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE)) {
        gsap.to(el, {
          scale: 2.2,
          backgroundColor: "rgba(5,151,242,0.14)",
          borderColor: "rgba(5,151,242,0.9)",
          duration: 0.28,
        });
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE)) {
        gsap.to(el, {
          scale: 1,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(5,108,242,0.7)",
          duration: 0.28,
        });
      }
    };
    const onLeaveWindow = () => gsap.to(el, { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  });

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border-2 mix-blend-difference md:block"
      style={{ borderColor: "rgba(5,108,242,0.7)" }}
    />
  );
}
