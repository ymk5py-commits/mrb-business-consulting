import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/lib/services";
import { getGuide } from "@/lib/guides";

/**
 * Cada renglón tiene dos formas:
 * - apilada: título, «para quién es», qué incluye y flecha a la derecha (celular, y entre
 *   1024 y 1279 px, donde la columna de servicios de la home es angosta);
 * - ancha, de 4 columnas (640–1023 px y desde 1280 px): título · qué incluye · para quién es · flecha,
 *   con «para quién es» a la derecha, alineada como la columna de importes de un libro mayor.
 * Por eso cada posición se declara en los cuatro anchos. Con `wide` (página a todo el ancho,
 * como /servicios) la forma de 4 columnas rige desde 640 px, sin pasar por la apilada.
 */
const ROW = {
  base: "group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4",
  sm: "sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,9rem)_auto] sm:items-baseline sm:gap-x-6",
  lg: "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-4",
  xl: "xl:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,10rem)_auto] xl:items-baseline xl:gap-x-6",
};

const AUDIENCE = {
  base: "col-start-1 row-start-2 text-left text-[15px] font-medium leading-snug text-slate-700 lg:text-base",
  sm: "sm:col-start-3 sm:row-start-1 sm:text-right sm:font-normal sm:text-slate-600",
  lg: "lg:col-start-1 lg:row-start-2 lg:text-left lg:font-medium lg:text-slate-700",
  xl: "xl:col-start-3 xl:row-start-1 xl:text-right xl:font-normal xl:text-slate-600",
};

const EXCERPT = {
  base: "col-start-1 row-start-3 text-[15px] leading-relaxed text-slate-600 lg:text-base",
  sm: "sm:col-start-2 sm:row-start-1",
  lg: "lg:col-start-1 lg:row-start-3",
  xl: "xl:col-start-2 xl:row-start-1",
};

const ARROW = {
  base: "col-start-2 row-span-3 row-start-1 size-4 text-slate-500 transition-[color,translate] duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:text-accent-600 motion-reduce:transition-none",
  sm: "sm:col-start-4 sm:row-span-1",
  lg: "lg:col-start-2 lg:row-span-3",
  xl: "xl:col-start-4 xl:row-span-1",
};

type Layout = { base: string; sm: string; lg: string; xl: string };
const layout = (l: Layout, wide: boolean) =>
  wide ? `${l.base} ${l.sm}` : `${l.base} ${l.sm} ${l.lg} ${l.xl}`;

/**
 * Índice de servicios como un libro mayor, en tres grupos de tres: según tu situación,
 * mes a mes y cuando lo necesitás. Sin tarjetas ni íconos.
 * Debajo de cada grupo, las guías de sus servicios (un enlace propio: las filas ya son enlaces).
 */
export function ServicesGrid({ wide = false }: { wide?: boolean } = {}) {
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
                  <Link href={`/servicios/${s.slug}`} className={layout(ROW, wide)}>
                    <span className="col-start-1 row-start-1 font-display text-lg text-navy-900 transition-colors group-hover:text-accent-600">
                      {s.title}
                    </span>
                    <span className={layout(AUDIENCE, wide)}>{s.audience}</span>
                    <span className={layout(EXCERPT, wide)}>{s.excerpt}</span>
                    <ArrowRight aria-hidden="true" className={layout(ARROW, wide)} />
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
