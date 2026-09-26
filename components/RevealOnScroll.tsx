"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Aparición sutil (fade + 12 px) de los bloques marcados con `data-reveal` o de los
 * hijos de `data-reveal-group`, una sola vez al entrar en pantalla.
 * - Solo oculta lo que está DEBAJO del viewport al montar: nada visible parpadea.
 * - Sin JS o con "reducir movimiento", todo se ve directamente.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-group] > *",
    );
    const fold = window.innerHeight * 0.92;
    const pending = [...targets].filter((el) => el.getBoundingClientRect().top > fold);
    if (pending.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("reveal-in");
          el.classList.remove("reveal-pending");
          // Al terminar (del propio bloque, no de un hijo) vuelve a sus transiciones.
          const done = (e: TransitionEvent) => {
            if (e.target !== el) return;
            el.classList.remove("reveal-in");
            el.removeEventListener("transitionend", done);
          };
          el.addEventListener("transitionend", done);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of pending) {
      el.classList.add("reveal-pending");
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const el of pending) el.classList.remove("reveal-pending", "reveal-in");
    };
  }, [pathname]);

  return null;
}
