"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/lib/site.config";
import { cn } from "./ui";
import { WhatsappIcon } from "./icons";

/**
 * Botón flotante de WhatsApp, presente en todo el sitio. Se oculta mientras haya
 * otro CTA de WhatsApp a la vista (los marca `data-wa-cta`): así no tapa el botón
 * principal de cada página ni repite la misma acción dos veces en pantalla.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("main [data-wa-cta]");
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0.6 },
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      setHidden(false); // al cambiar de página, vuelve a mostrarse hasta medir de nuevo
    };
  }, [pathname]);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex items-center rounded-full bg-whatsapp p-3 text-paper shadow-md transition-[background-color,scale,opacity,translate] duration-300 ease-[var(--ease-out-soft)] hover:bg-whatsapp-600 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 motion-reduce:transition-none sm:bottom-7 sm:right-7 sm:p-4",
        hidden && "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <WhatsappIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
