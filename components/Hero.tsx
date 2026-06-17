"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Button, Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { whatsappHref, site } from "@/lib/site.config";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE, delay: 0.35 },
  },
};
const checkItem: Variants = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const cardItems = [
  "Constitución de S.A., S.R.L. y E.A.S.",
  "Liquidación de IVA, IRE e IRP",
  "Contabilidad mensual y estados financieros",
  "Aportes al IPS y gestión laboral",
  "Inscripción de RUC y patente municipal",
];

export function Hero() {
  const reduce = useReducedMotion();
  const animate = reduce ? undefined : "show";
  const initial = reduce ? false : "hidden";

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
      {/* grid + aurora glows */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -bottom-44 -left-24 h-[24rem] w-[24rem] rounded-full bg-accent-bright/15 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={container} initial={initial} animate={animate}>
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright ring-1 ring-white/15"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright/70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
              </span>
              Consultoría empresarial en Paraguay
            </motion.span>

            <motion.h1
              variants={item}
              className="font-display mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              Contabilidad, impuestos y tu{" "}
              <span className="text-accent-bright">empresa</span>, en un solo lugar
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              Estudio de consultoría contable, fiscal y societaria. Constituimos tu
              empresa, llevamos tu contabilidad y mantenemos tus impuestos al día ante
              la DNIT — bajo las leyes de Paraguay.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappHref} external variant="whatsapp" size="lg">
                <WhatsappIcon className="h-5 w-5" />
                Consultá por WhatsApp
              </Button>
              <Button href="/servicios" variant="white" size="lg">
                Ver servicios
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent-bright" /> Cumplimiento DNIT e IPS
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent-bright" /> Respuesta rápida
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-bright" /> {site.city}, Paraguay
              </span>
            </motion.div>
          </motion.div>

          {/* Floating card */}
          <motion.div
            variants={card}
            initial={initial}
            animate={animate}
            className="lg:justify-self-end"
          >
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-navy-950/40 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
                Resolvemos por vos
              </p>
              <motion.ul
                variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
                initial={initial}
                animate={animate}
                className="mt-5 space-y-3.5"
              >
                {cardItems.map((it) => (
                  <motion.li
                    key={it}
                    variants={reduce ? undefined : checkItem}
                    className="flex items-start gap-3 text-slate-200"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed">{it}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <Link
                href="/servicios"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-bright transition-colors hover:text-white"
              >
                Conocé todos los servicios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
