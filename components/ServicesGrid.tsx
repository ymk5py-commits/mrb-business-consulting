import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/lib/services";
import { getGuide } from "@/lib/guides";

/**
 * Índice de servicios como un libro mayor, en tres grupos de tres: según tu situación,
 * mes a mes y cuando lo necesitás. Cada renglón: servicio, qué incluye y, en la columna
 * derecha alineada como la de los importes, para quién es. En el celular, «para quién es»
 * pasa a una línea bajo el título. Sin tarjetas ni íconos.
 * Debajo de cada grupo, las guías de sus servicios (un enlace propio: las filas ya son enlaces).
 */
export function ServicesGrid() {
  return (
    <div className="grid min-w-0 gap-12">
      {serviceGroups.map((group) => {
        const guides = [...new Set(group.services.map((s) => s.guide).filter(Boolean))]
          .map((slug) => getGuide(slug!))
          .filter((g) => g !== undefined);
        return (
          <div key={group.title}>
            <h3 className="font-display text-xl text-navy-900">{group.title}</h3>
            <ul className="mt-4 border-t border-rule">
              {group.services.map((s) => (
                <li key={s.slug} className="border-b border-rule">
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,8.5rem)_auto] sm:items-baseline sm:gap-x-6"
                  >
                    <span className="col-start-1 row-start-1 font-display text-lg text-navy-900 transition-colors group-hover:text-accent-600">
                      {s.title}
                    </span>
                    <span className="col-start-1 row-start-2 text-[15px] font-medium leading-snug text-slate-700 sm:col-start-3 sm:row-start-1 sm:text-right sm:text-sm sm:font-normal sm:text-slate-500">
                      {s.audience}
                    </span>
                    <span className="col-start-1 row-start-3 text-[15px] leading-relaxed text-slate-600 sm:col-start-2 sm:row-start-1 sm:text-sm">
                      {s.excerpt}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="col-start-2 row-span-3 row-start-1 size-4 text-slate-500 transition-[color,translate] duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:text-accent-600 motion-reduce:transition-none sm:col-start-4 sm:row-span-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-accent-600 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Guía: {g.title}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}
