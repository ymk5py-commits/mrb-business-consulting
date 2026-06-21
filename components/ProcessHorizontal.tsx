"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container, SectionHeading } from "./ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  { n: "01", title: "Diagnóstico", text: "Escuchamos tu caso y revisamos la situación actual de tu empresa." },
  { n: "02", title: "Propuesta", text: "Te presentamos un plan claro, con alcance y honorarios definidos." },
  { n: "03", title: "Ejecución", text: "Implementamos: contabilidad, impuestos, trámites o constitución." },
  { n: "04", title: "Acompañamiento", text: "Te acompañamos mes a mes para mantener todo al día." },
];

/**
 * Proceso con scroll horizontal anclado (pinned) en desktop: la sección se fija
 * y los pasos se recorren en horizontal al scrollear vertical. En mobile es una
 * fila deslizable normal.
 */
export function ProcessHorizontal() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const t = track.current;
      const s = section.current;
      if (!t || !s) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const amount = () => t.scrollWidth - window.innerWidth + 96;
        gsap.to(t, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: s,
            start: "top top",
            end: () => "+=" + amount(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-surface py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          kicker="Cómo trabajamos"
          title="Un proceso simple y transparente"
          subtitle="Desde la primera consulta hasta el acompañamiento mensual, sabés exactamente qué esperar."
        />
      </Container>

      <div className="mt-14 overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
        <div
          ref={track}
          className="flex w-max gap-6 px-5 sm:px-8 lg:px-12"
        >
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative flex w-[78vw] shrink-0 flex-col rounded-3xl border border-slate-200 bg-white p-8 sm:w-[20rem] lg:w-[24rem]"
            >
              <span className="font-display text-6xl text-accent/25">{step.n}</span>
              <h3 className="font-display mt-4 text-2xl text-navy-900">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{step.text}</p>
              <span className="mt-6 h-1 w-12 rounded-full bg-linear-to-r from-accent to-accent-bright" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
