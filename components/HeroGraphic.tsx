"use client";

import { motion, type Variants } from "motion/react";
import { Check, FileText, ShieldCheck, TrendingUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const panelV: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE, delay: 0.3 },
  },
};

/** Chip flotante: entra (opacity/scale) y luego flota en loop (y). */
function Float({
  children,
  className,
  delay = 0,
  amplitude = 9,
  duration = 4.5,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [0, -amplitude, 0] }}
      transition={{
        opacity: { duration: 0.5, delay, ease: EASE },
        scale: { duration: 0.5, delay, ease: EASE },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 },
      }}
    >
      {children}
    </motion.div>
  );
}

const bars = [42, 68, 54, 82, 63, 90];
const rows = [
  { label: "IVA", value: "al día" },
  { label: "IRE", value: "presentado" },
  { label: "IPS", value: "al día" },
];

export function HeroGraphic() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
      {/* Panel principal: mini-dashboard tributario */}
      <motion.div
        variants={panelV}
        initial="hidden"
        animate="show"
        className="relative z-10 rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-navy-950/40 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent-bright">
              <TrendingUp className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-white">Estado del mes</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Al día
          </span>
        </div>

        {/* Gráfico de barras (crece al entrar) */}
        <div className="mt-6 flex h-24 items-end gap-2.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-full origin-bottom rounded-t-md bg-linear-to-t from-accent to-accent-bright"
              style={{ height: `${h}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: EASE }}
            />
          ))}
        </div>

        <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.9 + i * 0.12, ease: EASE }}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-300">
                Liquidación de <span className="font-semibold text-white">{r.label}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                {r.value}
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/20">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chip: RUC activo (arriba-izquierda) */}
      <Float
        delay={0.7}
        className="absolute -left-5 top-24 z-20 hidden sm:block"
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy-800/80 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] text-slate-400">RUC</p>
            <p className="text-xs font-semibold text-white">Activo</p>
          </div>
        </div>
      </Float>

      {/* Chip: Factura electrónica (arriba-derecha) */}
      <Float
        delay={0.95}
        duration={5}
        className="absolute -right-5 top-20 z-20 hidden sm:block"
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy-800/80 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-bright/20 text-accent-bright">
            <FileText className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] text-slate-400">Factura</p>
            <p className="text-xs font-semibold text-white">electrónica</p>
          </div>
        </div>
      </Float>

      {/* Badge: 100% en regla (abajo-derecha) */}
      <Float
        delay={1.15}
        duration={5.5}
        amplitude={7}
        className="absolute -bottom-8 right-4 z-20"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3 shadow-2xl">
          <span className="font-display text-2xl text-navy-900">100%</span>
          <span className="text-xs font-medium leading-tight text-slate-500">
            obligaciones
            <br />
            en regla
          </span>
        </div>
      </Float>
    </div>
  );
}
