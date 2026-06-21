"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { MagneticButton } from "./MagneticButton";
import { whatsappHref, site } from "@/lib/site.config";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ENTITIES = [
  "DNIT",
  "Marangatú",
  "IPS",
  "MTESS",
  "Registros Públicos",
  "DINAPI",
  "SIFEN",
];

export function VideoHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const titleEl = el?.querySelector<HTMLElement>(".hero-title");
      if (!el || !titleEl) return;

      const split = SplitText.create(titleEl, { type: "chars" });

      // Entrada
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { y: 24, autoAlpha: 0, duration: 0.6 })
        .from(
          split.chars,
          { yPercent: 120, autoAlpha: 0, stagger: 0.025, duration: 0.85, ease: "power4.out" },
          "-=0.2",
        )
        .from(".hero-desc", { y: 26, autoAlpha: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-cta",
          { y: 18, autoAlpha: 0, scale: 0.95, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.4",
        )
        .from(".hero-marquee", { y: 22, autoAlpha: 0, duration: 0.7 }, "-=0.3");

      // Desarme al scrollear (anclado): las letras vuelan, el video hace zoom.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        .to(".hero-video", { scale: 1.28, ease: "none" }, 0)
        .to(".hero-overlay", { opacity: 0.97, ease: "none" }, 0)
        .to(
          split.chars,
          {
            x: () => gsap.utils.random(-540, 540),
            y: () => gsap.utils.random(-440, 440),
            rotation: () => gsap.utils.random(-120, 120),
            autoAlpha: 0,
            ease: "power1.in",
            stagger: { amount: 0.3, from: "center" },
          },
          0,
        )
        .to(".hero-meta", { autoAlpha: 0, y: -60, ease: "power1.in", stagger: 0.04 }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-navy-950"
    >
      {/* Video de fondo */}
      <video
        className="hero-video pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={site.heroVideo}
        aria-hidden="true"
      />
      <div className="hero-overlay absolute inset-0 bg-linear-to-br from-navy-950/92 via-navy-900/80 to-navy-800/85" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-25" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <span className="hero-kicker hero-meta inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright ring-1 ring-white/15">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
          </span>
          Consultoría contable y fiscal en Paraguay
        </span>

        <h1 className="hero-title font-display mt-7 max-w-4xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          Tu empresa, en <span className="text-accent-bright">regla.</span>
        </h1>

        <p className="hero-desc hero-meta mt-7 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
          Contabilidad, impuestos y constitución de sociedades bajo las leyes de
          Paraguay. Llevamos tu empresa al día ante la DNIT, el IPS y los Registros
          Públicos, desde un solo estudio.
        </p>

        <div className="hero-meta mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#2bd96c] to-[#1ebe5b] px-7 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_24px_rgba(30,190,91,0.3)] ring-1 ring-emerald-400/30"
            >
              <WhatsappIcon className="h-5 w-5" />
              Consultá por WhatsApp
            </a>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/servicios"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-7 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-md"
            >
              Ver servicios
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </MagneticButton>
        </div>

        <div className="hero-marquee hero-meta mt-16 w-full max-w-3xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300/80">
            Gestionamos tus trámites ante
          </p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-10">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="flex shrink-0 items-center gap-10"
                  aria-hidden={dup === 1}
                >
                  {ENTITIES.map((name) => (
                    <span
                      key={`${dup}-${name}`}
                      className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-white/55"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="hero-meta absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-white/40">
        Scrolleá ↓
      </div>
    </section>
  );
}
