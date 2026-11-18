"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/lib/site.config";
import { cn } from "./ui";
import { WhatsappIcon } from "./icons";

/** Debajo de esta posición (px) el botón siempre se ve: es el hero, donde aún no se lee texto. */
const REVEAL_ABOVE = 480;
/** Cuánto hay que bajar o subir (px) para que cuente como un cambio de dirección. */
const DIRECTION_STEP = 8;

/**
 * Botón flotante de WhatsApp, presente en todo el sitio. Se oculta de dos maneras:
 * - mientras haya otro CTA de WhatsApp a la vista (los marca `data-wa-cta`): así no tapa
 *   el botón principal de cada página ni repite la misma acción dos veces en pantalla;
 * - en pantallas chicas, mientras se baja leyendo: tapaba el final de las líneas de texto.
 *   Vuelve al subir un poco, y siempre aparece al recibir el foco del teclado.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);

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

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 1023px)");
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (!narrow.matches || y < REVEAL_ABOVE) {
        setScrollHidden(false);
      } else if (y > lastY + DIRECTION_STEP) {
        setScrollHidden(true);
      } else if (y < lastY - DIRECTION_STEP) {
        setScrollHidden(false);
      } else {
        return; // movimiento chico: se conserva la última posición de referencia
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      setScrollHidden(false);
    };
  }, [pathname]);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex items-center rounded-full bg-whatsapp p-3 text-paper shadow-md transition-[background-color,scale,opacity,translate] duration-300 ease-[var(--ease-out-soft)] hover:bg-whatsapp-600 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 motion-reduce:transition-none sm:bottom-7 sm:right-7 sm:p-4",
        hidden && "pointer-events-none translate-y-3 opacity-0",
        // Escondido por scroll: sin tocar (no tapa texto) pero alcanzable con el teclado
        scrollHidden &&
          !hidden &&
          "pointer-events-none translate-y-3 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100",
      )}
    >
      <WhatsappIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
