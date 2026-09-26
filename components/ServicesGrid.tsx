import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

/** Índice de servicios con filetes: título, qué incluye y flecha. Sin tarjetas ni íconos. */
export function ServicesGrid() {
  return (
    <ul className="min-w-0 border-t border-rule">
      {services.map((s) => (
        <li key={s.slug} className="border-b border-rule">
          <Link
            href={`/servicios/${s.slug}`}
            className="group grid gap-1 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
          >
            <span className="font-display text-lg text-navy-900 transition-colors group-hover:text-accent-600">
              {s.title}
            </span>
            <span className="text-sm leading-relaxed text-slate-600">{s.excerpt}</span>
            <ArrowRight
              aria-hidden="true"
              className="hidden size-4 text-slate-400 transition-colors group-hover:text-accent-600 sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
