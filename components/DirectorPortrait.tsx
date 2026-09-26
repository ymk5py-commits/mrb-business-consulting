/* ============================================================
 * components/DirectorPortrait.tsx — retrato del director para el home
 * (sección "Sobre MRB"): foto + credenciales flotantes.
 * Server Component. Los datos viven en lib/team.ts.
 * ============================================================ */
import Image from "next/image";
import { director, CREDENTIAL_ICONS } from "@/lib/team";
import { site } from "@/lib/site.config";

export function DirectorPortrait() {
  if (!director.photo) return null;

  return (
    <figure className="relative mx-auto w-full max-w-[25rem]">
      {/* Halo de marca detrás de la foto */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-accent/25 via-accent-bright/10 to-transparent blur-2xl"
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface shadow-[0_40px_70px_-40px_rgba(0,17,37,0.6)] ring-1 ring-slate-900/10">
        <Image
          src={director.photo}
          alt={`${director.name}, ${director.role} de ${site.name}`}
          fill
          sizes="(min-width: 1024px) 25rem, 90vw"
          className="object-cover"
          style={{ objectPosition: director.photoPosition }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-navy-950/95 via-navy-950/60 to-transparent"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">
            {director.role} de {site.shortName}
          </p>
          <p className="font-display mt-1 text-2xl">{director.name}</p>
          {director.headline && (
            <p className="mt-1 text-sm leading-snug text-slate-200">{director.headline}</p>
          )}
        </figcaption>
      </div>

      {/* Credenciales flotantes: arriba a la derecha y al medio a la izquierda */}
      {director.highlights?.slice(0, 2).map((h, i) => {
        const Icon = CREDENTIAL_ICONS[h.kind];
        return (
          <div
            key={h.title}
            className={
              i === 0
                ? "absolute -right-2 top-6 flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-3 shadow-[0_18px_40px_-20px_rgba(0,17,37,0.45)] ring-1 ring-slate-200 sm:-right-10 sm:top-8 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-4"
                : "absolute -left-2 top-[46%] flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-3 shadow-[0_18px_40px_-20px_rgba(0,17,37,0.45)] ring-1 ring-slate-200 sm:-left-10 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-4"
            }
          >
            <span
              className={
                i === 0
                  ? "inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent text-white sm:size-9"
                  : "inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white sm:size-9"
              }
            >
              <Icon className="size-4 sm:size-5" strokeWidth={1.75} />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold text-navy-900 sm:text-sm">{h.title}</span>
              <span className="block text-[11px] text-slate-600 sm:text-xs">{h.detail}</span>
            </span>
          </div>
        );
      })}
    </figure>
  );
}
