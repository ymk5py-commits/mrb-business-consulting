/* ============================================================
 * components/DirectorPortrait.tsx — retrato del director para el home
 * (sección "Sobre MRB"): la foto sola, con su nombre y cargo debajo.
 * Las credenciales van en la columna del texto, como renglones con filete
 * (el «libro mayor» de la marca), no flotando sobre la foto.
 * Server Component. Los datos viven en lib/team.ts.
 * ============================================================ */
import Image from "next/image";
import { director } from "@/lib/team";
import { site } from "@/lib/site.config";

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

      <figcaption className="mt-5">
        <p className="font-display text-2xl text-navy-900">{director.name}</p>
        <p className="mt-1 text-[15px] leading-snug text-slate-600 lg:text-base">
          {director.role} de {site.shortName}
          {director.headline && ` · ${director.headline}`}
        </p>
      </figcaption>
    </figure>
  );
}
