import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/lib/services";

/**
 * Índice de servicios con filetes, en dos grupos: según tu situación y para tu empresa.
 * Cada fila: título, qué incluye y flecha (también en el celular, para que se lea como enlace).
 * Sin tarjetas ni íconos.
 */
export function ServicesGrid() {
  return (
    <div className="grid min-w-0 gap-12">
      {serviceGroups.map((group) => (
        <div key={group.title}>
          <h3 className="font-display text-xl text-navy-900">{group.title}</h3>
          <ul className="mt-4 border-t border-rule">
            {group.services.map((s) => (
              <li key={s.slug} className="border-b border-rule">
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-8"
                >
                  <span className="col-start-1 row-start-1 font-display text-lg text-navy-900 transition-colors group-hover:text-accent-600">
                    {s.title}
                  </span>
                  <span className="col-start-1 row-start-2 text-sm leading-relaxed text-slate-600 sm:col-start-2 sm:row-start-1">
                    {s.excerpt}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="col-start-2 row-span-2 row-start-1 size-4 text-slate-500 transition-[color,translate] duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:text-accent-600 motion-reduce:transition-none sm:col-start-3 sm:row-span-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
