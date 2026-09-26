import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { whatsappHref } from "@/lib/site.config";
import { WhatsappIcon } from "./icons";

/** Grilla de servicios del home: 7 servicios + una tarjeta de consulta (4 × 2 en desktop). */
export function ServicesGrid() {
  return (
    <ul data-reveal-group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.slug}>
            <Link
              href={`/servicios/${s.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[0_18px_40px_-28px_rgba(0,17,37,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors duration-200 group-hover:bg-accent">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-accent-600">
                {s.kicker}
              </p>
              <h3 className="font-display mt-1 text-lg text-navy-900">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                Ver servicio
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </li>
        );
      })}

      {/* 8ª tarjeta: completa la grilla y ofrece ayuda para elegir */}
      <li>
        <div className="flex h-full flex-col rounded-2xl bg-navy-900 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
            ¿No sabés por dónde empezar?
          </p>
          <p className="font-display mt-2 text-lg">Contanos tu caso</p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
            Te decimos qué servicio necesitás y cómo seguir, sin compromiso.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            <WhatsappIcon className="h-4 w-4" />
            Escribinos
          </a>
        </div>
      </li>
    </ul>
  );
}
