"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Link2, type LucideIcon } from "lucide-react";
import { services } from "@/lib/services";

type OrbitalNode = {
  id: number;
  title: string;
  content: string;
  kicker: string;
  slug: string;
  icon: LucideIcon;
  relatedIds: number[];
};

const NODES: OrbitalNode[] = services.map((s, i) => ({
  id: i + 1,
  title: s.title,
  content: s.excerpt,
  kicker: s.kicker,
  slug: s.slug,
  icon: s.icon,
  relatedIds: s.related
    .map((rslug) => services.findIndex((x) => x.slug === rslug) + 1)
    .filter((n) => n > 0),
}));

export function ServicesOrbital() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulse, setPulse] = useState<Record<number, boolean>>({});
  const [activeId, setActiveId] = useState<number | null>(null);
  const [radius, setRadius] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Radio responsivo + respeto a reduced-motion
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      setRadius(w < 640 ? 116 : w < 1024 ? 168 : 205);
    };
    apply();
    window.addEventListener("resize", apply);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoRotate(false);
    }
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const t = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(t);
  }, [autoRotate]);

  const getRelated = (id: number) =>
    NODES.find((n) => n.id === id)?.relatedIds ?? [];

  const isRelatedToActive = (id: number) =>
    activeId != null && getRelated(activeId).includes(id);

  const centerOnNode = (id: number) => {
    const idx = NODES.findIndex((n) => n.id === id);
    if (idx < 0) return;
    const targetAngle = (idx / NODES.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => (next[Number(k)] = false));
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveId(id);
        setAutoRotate(false);
        const p: Record<number, boolean> = {};
        getRelated(id).forEach((r) => (p[r] = true));
        setPulse(p);
        centerOnNode(id);
      } else {
        setActiveId(null);
        setPulse({});
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setAutoRotate(true);
        }
      }
      return next;
    });
  };

  const reset = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpanded({});
      setActiveId(null);
      setPulse({});
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setAutoRotate(true);
      }
    }
  };

  const position = (index: number) => {
    const angle = ((index / NODES.length) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      onClick={reset}
      className="relative mx-auto h-[540px] w-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-navy-950 via-navy-900 to-navy-800 sm:h-[620px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-50"
      />
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Núcleo */}
        <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-navy-700 via-accent to-accent-bright">
          <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/20 opacity-70 motion-reduce:hidden" />
          <div
            className="absolute h-24 w-24 animate-ping rounded-full border border-white/10 opacity-50 motion-reduce:hidden"
            style={{ animationDelay: "0.5s" }}
          />
          <span className="font-display text-xs font-extrabold tracking-tight text-white">
            MRB
          </span>
        </div>

        {/* Anillo */}
        <div
          className="absolute rounded-full border border-white/10"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {NODES.map((node, index) => {
          const pos = position(index);
          const isExpanded = expanded[node.id];
          const isRelated = isRelatedToActive(node.id);
          const isPulsing = pulse[node.id];
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              className="absolute cursor-pointer transition-all duration-700"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isExpanded ? 200 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggle(node.id);
              }}
            >
              {isPulsing && (
                <div
                  className="absolute -inset-2 animate-pulse rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(5,151,242,0.25) 0%, rgba(5,151,242,0) 70%)",
                  }}
                />
              )}

              <div
                className={[
                  "relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isExpanded
                    ? "scale-125 border-white bg-white text-navy-900 shadow-lg shadow-accent/30"
                    : isRelated
                      ? "border-accent-bright bg-accent text-white"
                      : "border-white/40 bg-navy-800 text-white",
                ].join(" ")}
              >
                <Icon size={18} strokeWidth={1.75} />
              </div>

              <div
                className={[
                  "absolute left-1/2 top-12 w-max -translate-x-1/2 whitespace-nowrap text-center text-[11px] font-semibold tracking-wide transition-all duration-300",
                  isExpanded ? "scale-110 text-white" : "text-white/60",
                ].join(" ")}
              >
                {node.title}
              </div>

              {isExpanded && (
                <div className="absolute left-1/2 top-20 z-50 w-64 -translate-x-1/2 rounded-2xl border border-white/15 bg-navy-950/90 p-5 text-left shadow-2xl backdrop-blur-lg">
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/40" />
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-bright">
                    {node.kicker}
                  </span>
                  <h3 className="font-display mt-2 text-base font-bold text-white">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {node.content}
                  </p>
                  <Link
                    href={`/servicios/${node.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-bright hover:text-white"
                  >
                    Ver servicio
                    <ArrowRight size={12} />
                  </Link>

                  {node.relatedIds.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <div className="mb-2 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-white/60">
                        <Link2 size={10} />
                        Relacionados
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {node.relatedIds.map((rid) => {
                          const rel = NODES.find((n) => n.id === rid);
                          if (!rel) return null;
                          return (
                            <button
                              key={rid}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggle(rid);
                              }}
                              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {rel.title}
                              <ArrowRight size={9} className="text-white/50" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-xs text-slate-400/80">
        Tocá un servicio para ver el detalle
      </p>
    </div>
  );
}
