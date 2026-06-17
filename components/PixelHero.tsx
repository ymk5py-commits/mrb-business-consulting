"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "./ui";
import { WhatsappIcon } from "./icons";
import { whatsappHref, site } from "@/lib/site.config";

/* ----------------------------------------------------------------------------
 * Canvas de píxeles (motor físico de aparición + shimmer en ripple radial)
 * -------------------------------------------------------------------------- */

type Pixel = {
  size: number;
  isIdle: boolean;
  appear: () => void;
  disappear: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number,
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const maxSizeInt = 2;
  let size = 0;
  const sizeStep = rand(0.12, 0.28);
  const minSize = 0.5;
  const maxSize = rand(0.5, 2);
  const speed = rand(0.08, 0.4) * baseSpeed;
  let counter = 0;
  const counterStep = rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008;
  let isIdle = false;
  let isReverse = false;
  let isShimmer = false;

  const draw = () => {
    const offset = maxSizeInt * 0.5 - size * 0.5;
    ctx.fillStyle = color;
    ctx.fillRect(x + offset, y + offset, size, size);
  };

  const shimmer = () => {
    if (size >= maxSize) isReverse = true;
    else if (size <= minSize) isReverse = false;
    if (isReverse) size -= speed;
    else size += speed;
  };

  return {
    get size() {
      return size;
    },
    get isIdle() {
      return isIdle;
    },
    appear() {
      isIdle = false;
      if (counter <= delay) {
        counter += counterStep;
        return;
      }
      if (size >= maxSize) isShimmer = true;
      if (isShimmer) shimmer();
      else size += sizeStep;
      draw();
    },
    disappear() {
      isShimmer = false;
      counter = 0;
      if (size <= 0) {
        isIdle = true;
        return;
      }
      size -= 0.1;
      draw();
    },
  };
}

function PixelCanvas({
  colors,
  gap = 10,
  speed = 35,
}: {
  colors: string[];
  gap?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    if (w === 0 || h === 0) return;
    canvas.width = w;
    canvas.height = h;

    const effectiveSpeed = Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = Math.sqrt(dx * dx + dy * dy) * 0.6;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }
    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  useEffect(() => {
    init();

    const frameInterval = 1000 / 60;
    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const pixel of pixelsRef.current) pixel.appear();
    };
    animationRef.current = requestAnimationFrame(loop);

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Hero
 * -------------------------------------------------------------------------- */

const PIXEL_COLORS = [
  "#0b3b7a",
  "#0560d8",
  "#056cf2",
  "#0597f2",
  "#3b8cf5",
  "#7cc4ff",
];

const ENTITIES = [
  "DNIT",
  "Marangatú",
  "IPS",
  "MTESS",
  "Registros Públicos",
  "DINAPI",
  "SIFEN",
];

export function PixelHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative isolate flex min-h-[88svh] flex-col justify-center overflow-hidden bg-linear-to-br from-navy-950 via-navy-900 to-navy-800 py-16 sm:py-20">
      {/* Canvas de píxeles + viñeta */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <PixelCanvas colors={PIXEL_COLORS} gap={10} speed={35} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 42%, transparent 0%, rgba(0,17,43,0.65) 70%, #001127 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright ring-1 ring-white/15 transition-all duration-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright/70 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
          </span>
          Consultoría contable y fiscal en Paraguay
        </span>

        <h1 className="glass-text mt-7 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          <span className="font-serif italic font-medium">Tu empresa,</span>
          <span className="font-display font-extrabold tracking-tight">en regla.</span>
        </h1>

        <p
          className={cn(
            "mt-7 max-w-2xl text-base leading-relaxed text-slate-300 transition-all duration-700 sm:text-lg",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "150ms" }}
        >
          Contabilidad, impuestos y constitución de sociedades bajo las leyes de
          Paraguay. Llevamos tu empresa al día ante la DNIT, el IPS y los Registros
          Públicos, desde un solo estudio.
        </p>

        <div
          className={cn(
            "mt-9 flex flex-col items-center justify-center gap-3 transition-all duration-700 sm:flex-row",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#2bd96c] to-[#1ebe5b] px-7 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_24px_rgba(30,190,91,0.25)] ring-1 ring-emerald-400/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <WhatsappIcon className="h-5 w-5" />
            Consultá por WhatsApp
          </a>
          <Link
            href="/servicios"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-7 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver servicios
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Marquee de entidades */}
        <div
          className={cn(
            "mt-16 w-full transition-all duration-700",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "450ms" }}
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400/80">
            Gestionamos tus trámites ante
          </p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-12">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="flex shrink-0 items-center gap-12"
                  aria-hidden={dup === 1}
                >
                  {ENTITIES.map((name) => (
                    <span
                      key={`${dup}-${name}`}
                      className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-white/45 transition-colors duration-300 hover:text-white/90"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            {site.city}, Paraguay · Atención en todo el país
          </p>
        </div>
      </div>
    </section>
  );
}
