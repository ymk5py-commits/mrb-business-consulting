import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { whatsappHref, site } from "@/lib/site.config";

const ENTITIES = [
  "DNIT",
  "Marangatú",
  "IPS",
  "MTESS",
  "Registros Públicos",
  "DINAPI",
  "SIFEN",
];

/** Hero del home: estático y sobrio (imagen de fondo bajo un overlay navy). */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src={site.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-navy-950/92 via-navy-900/85 to-navy-800/88"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-25" />

      <Container className="flex min-h-[88svh] flex-col items-center justify-center pb-20 pt-32 text-center sm:pt-36">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright ring-1 ring-white/15">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-bright" />
          Estudio contable en Lambaré
        </span>

        <h1 className="font-display mt-7 max-w-4xl text-balance text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
          Tu empresa, en <span className="text-accent-bright">regla.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg">
          Contabilidad, impuestos y constitución de sociedades bajo las leyes de Paraguay.
          Desde Lambaré llevamos tu empresa al día ante la DNIT, el IPS y los Registros
          Públicos, estés donde estés.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            <WhatsappIcon className="h-5 w-5" />
            Consultá por WhatsApp
          </a>
          <Link
            href="/servicios"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-7 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Ver servicios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 w-full max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300/80">
            Gestionamos tus trámites ante
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {ENTITIES.map((name) => (
              <li
                key={name}
                className="text-sm font-semibold uppercase tracking-wider text-white/60"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
