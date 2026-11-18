"use client";

import { useEffect, useState } from "react";
import { cn } from "./ui";

/**
 * Índice de una guía con la sección actual marcada (aria-current="location").
 * La sección activa es la última cuyo título ya pasó el tercio superior de la pantalla;
 * al llegar al final de la página, la última. Se recalcula con el scroll (una vez por
 * cuadro) y se marca al instante al tocar un enlace.
 */
export function GuideToc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      // La última sección puede ser corta y no llegar nunca a la línea.
      if (atBottom && current) current = els[els.length - 1].id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <ol className="mt-3 grid gap-0.5 text-sm">
      {sections.map((section) => {
        const isActive = section.id === active;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => setActive(section.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group flex min-h-11 items-center gap-2.5 rounded-sm transition-colors duration-200 hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive ? "font-semibold text-navy-900" : "text-slate-600",
              )}
            >
              {/* La sección actual se marca con un filete corto, como el resto de la marca */}
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-3 shrink-0 origin-left bg-accent-600 transition-transform duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
              {section.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
