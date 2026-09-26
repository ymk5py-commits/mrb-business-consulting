import { Container } from "@/components/ui";
import { director } from "@/lib/team";
import { clientStats as clients } from "@/lib/site.config";

const totalClients = clients.total;
const companiesPct = (clients.companies / totalClients) * 100;

export function ExperienceBand() {
  return (
    <section className="bg-navy-900">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display max-w-md text-balance text-2xl text-paper sm:text-3xl">
              Experiencia al servicio de empresas y personas
            </h2>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
              Sociedades y personas físicas que ya delegan su gestión contable y tributaria
              en {director.name.split(" ")[0]} y el equipo de MRB.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Clientes + composición */}
            <div className="rounded-2xl border border-slate-700 p-6">
              <p className="font-display text-5xl leading-none tabular-nums text-paper">
                {totalClients}
              </p>
              <p className="mt-2 text-sm text-slate-300">clientes confían en MRB</p>
              <div
                aria-hidden="true"
                className="mt-5 flex h-2 overflow-hidden rounded-full bg-slate-700"
              >
                <span className="bg-accent-bright" style={{ width: `${companiesPct}%` }} />
                <span className="flex-1 bg-slate-300" />
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent-bright" />
                  <span className="tabular-nums font-semibold text-paper">{clients.companies}</span>
                  sociedades
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2 rounded-full bg-slate-300" />
                  <span className="tabular-nums font-semibold text-paper">
                    {clients.individuals}
                  </span>
                  personas físicas
                </li>
              </ul>
            </div>

            {/* Años de experiencia */}
            {director.years && (
              <div className="rounded-2xl border border-slate-700 p-6">
                <p className="font-display text-5xl leading-none tabular-nums text-paper">
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
