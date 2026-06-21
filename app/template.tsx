"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * template.tsx se re-monta en cada navegación → transición de entrada (fade + leve
 * subida) entre páginas, dando sensación de transición fluida tipo agencia.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
