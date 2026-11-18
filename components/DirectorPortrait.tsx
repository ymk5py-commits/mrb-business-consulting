/* ============================================================
 * components/DirectorPortrait.tsx — retrato del director para el home
 * (sección "Sobre MRB"): foto y, debajo, sus credenciales como renglones
 * con filete, igual que los datos del hero (el «libro mayor» de la marca).
 * Server Component. Los datos viven en lib/team.ts.
 * ============================================================ */
import Image from "next/image";
import { director } from "@/lib/team";
import { site } from "@/lib/site.config";
import { LedgerMotion } from "./motion/LedgerMotion";

export function DirectorPortrait() {
  if (!director.photo) return null;

  return (
    <figure className="mx-auto w-full max-w-[25rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface ring-1 ring-rule">
        <Image
          src={director.photo}
          alt={`${director.name}, ${director.role} de ${site.name}`}
          fill
          sizes="(min-width: 1024px) 25rem, 90vw"
          className="object-cover"
          style={{ objectPosition: director.photoPosition }}
        />
      </div>

      <figcaption className="mt-6">
        <p className="font-display text-2xl text-navy-900">{director.name}</p>
        <p className="mt-1 text-sm leading-snug text-slate-600">
          {director.role} de {site.shortName}
          {director.headline && ` · ${director.headline}`}
        </p>

        {/* Credenciales como renglones: el filete se traza al entrar en pantalla */}
        {director.highlights && director.highlights.length > 0 && (
          <LedgerMotion variant="steps">
            <ul data-ledger-trigger className="mt-5">
              {director.highlights.map((h) => (
                <li key={h.title} className="relative py-3">
                  <span
                    aria-hidden="true"
                    data-ledger-rule
                    className="absolute inset-x-0 top-0 h-px origin-left bg-rule"
                  />
                  <span className="block text-sm font-semibold text-navy-900">{h.title}</span>
                  <span className="block text-sm text-slate-600">{h.detail}</span>
                </li>
              ))}
              <li aria-hidden="true" className="relative">
                <span
                  data-ledger-rule
                  className="absolute inset-x-0 top-0 h-px origin-left bg-rule"
                />
              </li>
            </ul>
          </LedgerMotion>
        )}
      </figcaption>
    </figure>
  );
}
