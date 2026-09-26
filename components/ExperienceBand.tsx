import { Container } from "@/components/ui";
import { director } from "@/lib/team";
import { clientStats as clients } from "@/lib/site.config";

const totalClients = clients.total;
const companiesPct = (clients.companies / totalClients) * 100;

export function ExperienceBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
              Trayectoria y clientes
            </p>
            <h2 className="font-display mt-3 max-w-md text-balance text-2xl text-white sm:text-3xl">
              Experiencia al servicio de empresas y personas
            </h2>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
              Sociedades y personas físicas que ya delegan su gestión contable y tributaria
              en {director.name.split(" ")[0]} y el equipo de MRB.
            </p>
          </div>

          <div data-reveal-group className="grid gap-4 sm:grid-cols-2">
            {/* Clientes + composición */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="font-display text-5xl leading-none tabular-nums text-white">
                {totalClients}
              </p>
              <p className="mt-2 text-sm text-slate-300">clientes confían en MRB</p>
              <div
                aria-hidden="true"
                className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/10"
              >
                <span className="bg-accent-bright" style={{ width: `${companiesPct}%` }} />
                <span className="flex-1 bg-white/70" />
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent-bright" />
                  <span className="tabular-nums font-semibold text-white">{clients.companies}</span>
                  sociedades
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2 rounded-full bg-white/70" />
                  <span className="tabular-nums font-semibold text-white">
                    {clients.individuals}
                  </span>
                  personas físicas
                </li>
              </ul>
            </div>

            {/* Años de experiencia */}
            {director.years && (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <p className="font-display text-5xl leading-none tabular-nums text-white">
                  +{director.years}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  años de experiencia en gestión contable y financiera
                </p>
                {director.sectors && (
                  <p className="mt-5 text-xs leading-relaxed text-slate-400">
                    {director.sectors.join(" · ")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
