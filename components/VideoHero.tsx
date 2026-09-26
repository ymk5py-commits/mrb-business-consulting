"use client";

import { useRef, useState } from "react";
import { preconnect, preload } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Container, cn } from "./ui";
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
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // Conexión al CDN del video + poster con prioridad: el primer cuadro aparece
  // enseguida (LCP rápido y estable) mientras el video termina de cargar.
  preconnect(new URL(site.heroVideo).origin);
  preload(site.heroPoster, { as: "image", fetchPriority: "high" });

  // Pausa/reanuda el video y las animaciones en loop del hero (WCAG 2.2.2).
  const togglePause = () => {
    const v = video.current;
    if (!v) return;
    if (paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  useGSAP(
    () => {
      const el = root.current;
      const titleEl = el?.querySelector<HTMLElement>(".hero-title");
      if (!el || !titleEl) return;

      // words+chars: las letras se animan igual, pero una palabra nunca se parte
      // entre dos líneas ("e / n regla" en mobile con type "chars" solo).
      const split = SplitText.create(titleEl, { type: "words,chars" });

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
        ref={video}
        className="hero-video pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={site.heroPoster}
        aria-hidden="true"
      >
        {/* Celulares: versión 360p (~0,7 MB); resto: 720p */}
        <source src={site.heroVideoMobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={site.heroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay absolute inset-0 bg-linear-to-br from-navy-950/92 via-navy-900/80 to-navy-800/85" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-25" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <span className="hero-kicker hero-meta inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright ring-1 ring-white/15">
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright/70",
                paused && "hidden",
              )}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
          </span>
          Estudio contable en Lambaré
        </span>

        <h1 className="hero-title font-display mt-7 max-w-4xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          Tu empresa, en <span className="text-accent-bright">regla.</span>
        </h1>

        <p className="hero-desc hero-meta mt-7 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
          Contabilidad, impuestos y constitución de sociedades bajo las leyes de
          Paraguay. Desde Lambaré llevamos tu empresa al día ante la DNIT, el IPS y los
          Registros Públicos, estés donde estés.
        </p>

        <div className="hero-meta mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#2bd96c] to-[#1ebe5b] px-7 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_24px_rgba(30,190,91,0.3)] ring-1 ring-emerald-400/30 transition-[filter,box-shadow] duration-200 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_14px_32px_rgba(30,190,91,0.45)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <WhatsappIcon className="h-5 w-5" />
              Consultá por WhatsApp
            </a>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/servicios"
              className="hero-cta group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-7 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-colors duration-200 hover:bg-white/15 hover:ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Ver servicios
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </MagneticButton>
        </div>

        <div className="hero-marquee hero-meta mt-16 w-full max-w-3xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-300/80">
            Gestionamos tus trámites ante
          </p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
            <div
              className="flex w-max animate-marquee gap-10"
              style={paused ? { animationPlayState: "paused" } : undefined}
            >
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

      <div
        aria-hidden="true"
        className="hero-meta absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/50"
      >
        Scrolleá ↓
      </div>

      <button
        type="button"
        onClick={togglePause}
        aria-pressed={paused}
        aria-label="Pausar animación de fondo"
        title={paused ? "Reanudar animación" : "Pausar animación"}
        className="hero-meta absolute bottom-5 left-5 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-8"
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </section>
  );
}
