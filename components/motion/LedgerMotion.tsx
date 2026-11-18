"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Movimiento de marca: el «filete contable». Las líneas se trazan de izquierda a
 * derecha, como quien raya un libro mayor, y los datos se asientan sobre ellas.
 *
 * - hero: la regla bajo «regla.» y luego los renglones de los datos (al cargar); las
 *   cifras con data-count se cuentan mientras se asientan.
 * - steps: los filetes de una lista, en orden (al entrar en pantalla). Solo las
 *   líneas: el texto nunca se esconde.
 * - figures: las cifras se cuentan y la barra de composición se mide (al entrar).
 *
 * El contenido es visible por defecto: sin JS, o con «reducir movimiento», no se
 * anima nada. El estado inicial del hero lo pone el CSS (data-motion="on") para
 * que no parpadee; tiene un failsafe a los 3 s por si el script no llega.
 */
type Variant = "hero" | "steps" | "figures";

const EASE = "expo.out";

export function LedgerMotion({ variant, children }: { variant: Variant; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (variant === "hero") {
          // El CSS esconde el estado inicial con un failsafe a los 3 s. Si la
          // hidratación llegó tarde y el failsafe ya mostró el hero, no lo volvemos
          // a esconder; si no, lo cancelamos para que no pise a GSAP.
          const failsafes = (q("[data-ledger-gate]") as HTMLElement[]).flatMap((el) =>
            el
              .getAnimations()
              .filter((a) => (a as CSSAnimation).animationName === "ledger-failsafe"),
          );
          const shown = failsafes.some(
            (a) => a.playState === "finished" || Number(a.currentTime ?? 0) >= 2800,
          );
          if (shown) return;
          failsafes.forEach((a) => a.cancel());
          const tl = gsap.timeline({ defaults: { ease: EASE } });
          tl.fromTo(
            q("[data-ledger-accent]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1 },
            0.2,
          )
            .fromTo(
              q("[data-ledger-rule]"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.9, stagger: 0.11 },
              0.35,
            )
            .fromTo(
              q("[data-ledger-item]"),
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.11 },
              0.5,
            );
          // Las cifras se cuentan mientras se asientan en su renglón.
          (q("[data-count]") as HTMLElement[]).forEach((el, i) => {
            const end = Number(el.dataset.count) || 0;
            const state = { v: 0 };
            el.textContent = "0";
            tl.to(
              state,
              {
                v: end,
                duration: 1.3,
                onUpdate: () => {
                  el.textContent = String(Math.round(state.v));
                },
              },
              0.5 + i * 0.11,
            );
          });
          return;
        }

        const trigger = q("[data-ledger-trigger]")[0] ?? root.firstElementChild;
        if (!trigger) return;

        if (variant === "steps") {
          // Solo se trazan los filetes. El texto queda siempre visible: así lo encuentran
          // Ctrl+F y los lectores de pantalla, y no hay huecos al bajar rápido.
          const rules = q("[data-ledger-rule]");
          gsap.set(rules, { scaleX: 0 });
          gsap.to(rules, {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: EASE,
            scrollTrigger: { trigger, start: "top 85%", once: true },
          });
          return;
        }

        if (variant === "figures") {
          const counters = q("[data-count]") as HTMLElement[];
          const bar = q("[data-bar]");
          const rest = q("[data-bar-rest]");
          const values = counters.map((el) => Number(el.dataset.count) || 0);
          const prefixes = counters.map((el) => el.dataset.countPrefix ?? "");
          counters.forEach((el, i) => (el.textContent = `${prefixes[i]}0`));
          gsap.set(bar, { scaleX: 0 });
          gsap.set(rest, { autoAlpha: 0 });

          const tl = gsap.timeline({
            defaults: { ease: EASE },
            scrollTrigger: { trigger, start: "top 80%", once: true },
          });
          counters.forEach((el, i) => {
            const state = { v: 0 };
            tl.to(
              state,
              {
                v: values[i],
                duration: 1.4,
                onUpdate: () => {
                  el.textContent = `${prefixes[i]}${Math.round(state.v)}`;
                },
              },
              i * 0.12,
            );
          });
          tl.to(bar, { scaleX: 1, duration: 1.2 }, 0.2).to(rest, { autoAlpha: 1, duration: 0.5 }, 0.9);
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  // display: contents — no agrega caja ni rompe grillas; solo delimita el alcance.
  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
