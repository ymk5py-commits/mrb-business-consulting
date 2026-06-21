"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

/**
 * Scroll suave con inercia (ScrollSmoother) en desktop. En touch usa el scroll
 * nativo (mejor UX y evita conflictos). El header, cursor, barra de progreso y
 * FAB viven FUERA de este wrapper (son fixed) — ver layout.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (
        typeof window === "undefined" ||
        window.matchMedia("(pointer: coarse)").matches
      ) {
        return;
      }
      ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: 1.2,
        effects: true,
        smoothTouch: 0,
      });
    },
    { scope: wrapper },
  );

  // Al navegar: volver arriba y recalcular posiciones.
  useGSAP(
    () => {
      const sm = ScrollSmoother.get();
      if (sm) sm.scrollTo(0, false);
      else window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    },
    { dependencies: [pathname] },
  );

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
