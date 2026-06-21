"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Envuelve la Home y cablea animaciones de scroll (GSAP ScrollTrigger) a los
 * elementos marcados con data-gsap. Solo anima transform/opacity (60fps) y se
 * limpia solo al desmontar (useGSAP). Las animaciones se ven siempre.
 */
export function GsapScope({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ease = "power3.out";

      // Recalcular posiciones cuando cargan las fuentes (evita triggers corridos)
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      // Reveals: si el bloque tiene un encabezado, se revela palabra por palabra
      // (SplitText con máscara); el resto del bloque hace fade + subida.
      gsap.utils.toArray<HTMLElement>('[data-gsap="reveal"]').forEach((el) => {
        const heading = el.querySelector<HTMLElement>("h1, h2");
        if (heading) {
          SplitText.create(heading, {
            type: "words",
            mask: "words",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 115,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.045,
                scrollTrigger: { trigger: el, start: "top 84%" },
              }),
          });
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        } else {
          gsap.from(el, {
            opacity: 0,
            y: 44,
            duration: 0.85,
            ease,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        }
      });

      // Grupos escalonados (anima los hijos directos)
      gsap.utils.toArray<HTMLElement>('[data-gsap="stagger"]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(":scope > *");
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 38,
          duration: 0.7,
          ease,
          stagger: 0.1,
          scrollTrigger: { trigger: group, start: "top 82%" },
        });
      });

      // Contadores numéricos
      gsap.utils.toArray<HTMLElement>('[data-gsap="count"]').forEach((el) => {
        const to = parseFloat(el.dataset.to || "0");
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Parallax del hero (contenido sube y se desvanece; fondo se mueve menos)
      const hero = root.current?.querySelector('[data-gsap="hero-section"]');
      if (hero) {
        const content = hero.querySelector('[data-gsap="hero-parallax"]');
        const bg = hero.querySelector('[data-gsap="hero-bg"]');
        if (content) {
          gsap.to(content, {
            yPercent: -12,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (bg) {
          gsap.to(bg, {
            yPercent: 16,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // Parallax genérico (data-speed = % de desplazamiento)
      gsap.utils.toArray<HTMLElement>('[data-gsap="parallax"]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "10");
        gsap.to(el, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Proceso: la línea se dibuja y los pasos aparecen al scrollear
      const proc = root.current?.querySelector('[data-gsap="process"]');
      if (proc) {
        const line = proc.querySelector('[data-gsap="process-line"]');
        const steps = proc.querySelectorAll<HTMLElement>('[data-gsap="process-step"]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: proc, start: "top 78%", end: "top 35%", scrub: 1 },
        });
        if (line) {
          tl.from(line, { scaleX: 0, transformOrigin: "left center", ease: "none" }, 0);
        }
        if (steps.length) {
          tl.from(steps, { opacity: 0, y: 32, stagger: 0.25, ease: "none" }, 0);
        }
      }
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
