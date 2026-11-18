"use client";

import { useEffect, useState } from "react";
import { cn } from "./ui";

/**
 * Índice de una guía con la sección actual marcada (aria-current="location").
 * La sección activa es la última cuyo título ya pasó el tercio superior de la pantalla.
 */
export function GuideToc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      () => {
        const line = window.innerHeight / 3;
        let current: string | null = null;
        for (const el of els) {
          if (el.getBoundingClientRect().top <= line) current = el.id;
        }
        setActive(current);
      },
      // Se recalcula cada vez que una sección cruza la línea del tercio superior.
      { rootMargin: "0px 0px -66% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <ol className="mt-3 grid gap-1 text-sm">
      {sections.map((section) => {
        const isActive = section.id === active;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group flex min-h-9 items-center gap-2.5 rounded-sm transition-colors duration-200 hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
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
