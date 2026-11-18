import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { whatsappHref, clientStats } from "@/lib/site.config";
import { director } from "@/lib/team";
import { LedgerMotion } from "./motion/LedgerMotion";

const ENTITIES = [
  "DNIT",
  "IPS",
  "MTESS",
  "DINAPI",
];

/**
 * Hero del home (Split Studio): a la izquierda la propuesta, a la derecha el
 * respaldo con datos reales del estudio y un fondo de oficina suave.
 */
export function HomeHero() {
  const facts = [
    {
      value: `+${director.years ?? 15} años`,
      label: "de experiencia en gestión contable y financiera",
    },
    {
      value: `${clientStats.total} clientes`,
      label: `${clientStats.companies} sociedades y ${clientStats.individuals} personas físicas`,
    },
    { value: "Asunción", label: "Oficina en el centro · atendemos en todo el país" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/brand/hero-office.webp" alt="" fill priority sizes="100vw" className="scale-105 object-cover object-center blur-[3px]" quality={80} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,16,38,0.92)_0%,rgba(0,16,38,0.80)_48%,rgba(0,16,38,0.70)_100%)]" />
      </div>
      <LedgerMotion variant="hero">
      <Container className="relative grid gap-12 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-20 lg:pb-32 lg:pt-40">
        <div className="min-w-0">
          <h1 className="font-display text-balance text-5xl leading-[1.02] tracking-[-0.038em] sm:text-6xl lg:text-7xl">
            Tu empresa, en{" "}
            <span className="relative inline-block text-accent-bright">
              regla.
              {/* La regla: el filete del logo, trazado bajo la palabra */}
              <span
                aria-hidden="true"
                data-ledger-accent
                data-ledger-gate="rule"
                className="absolute -bottom-[0.16em] left-[0.03em] right-[0.32em] h-[0.06em] origin-left bg-accent-bright"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            Estudio contable, tributario y societario en Asunción. Llevamos tu empresa al
            día ante la DNIT y el IPS, estés donde estés.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-cta
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-6 text-sm font-semibold text-paper transition-[background-color,scale] duration-200 ease-[var(--ease-out-soft)] hover:bg-whatsapp-600 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <WhatsappIcon className="h-5 w-5" />
              Consultá por WhatsApp
            </a>
            <Link
              href="/servicios"
              className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-sm text-sm font-semibold text-paper underline decoration-slate-500 underline-offset-8 transition-colors hover:decoration-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
            >
              Ver servicios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Respaldo: datos reales del estudio */}
        <ul className="relative min-w-0">
          {facts.map((f) => (
            <li key={f.value} className="relative py-5">
              {/* Renglones del libro mayor: se trazan al cargar */}
              <span aria-hidden="true" data-ledger-rule data-ledger-gate="rule" className="absolute inset-x-0 top-0 h-px origin-left bg-slate-600" />
              <div data-ledger-item data-ledger-gate="item">
                <p className="font-display text-3xl tabular-nums text-paper sm:text-4xl">
                  {f.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-slate-300">{f.label}</p>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="relative">
            <span data-ledger-rule data-ledger-gate="rule" className="absolute inset-x-0 top-0 h-px origin-left bg-slate-600" />
          </li>
        </ul>
      </Container>
      </LedgerMotion>

      {/* Entidades ante las que gestionamos: una línea fija */}
      <div className="relative border-t border-white/10 bg-navy-950/65">
        <Container className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5 text-sm">
          <span className="text-slate-400">Trámites ante</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-semibold text-slate-200">
            {ENTITIES.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
