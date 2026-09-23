import { Container } from "@/components/ui";

const highlights = [
  {
    title: "Más de 15 años",
    detail: "de experiencia profesional de Manuel Rolón",
  },
  {
    title: "Contabilidad y finanzas",
    detail: "gestión administrativa y financiera de empresas",
  },
  {
    title: "Outsourcing",
    detail: "supervisión de equipos y servicios tercerizados",
  },
  {
    title: "Sectores diversos",
    detail: "importación, construcción, automotor y servicios",
  },
];

export function ExperienceBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <Container className="relative py-14 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
          Trayectoria profesional
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-2xl text-white sm:text-3xl">
          Experiencia al servicio de tu empresa
        </h2>
        <div data-gsap="stagger" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/15 bg-white/5 p-5">
              <h3 className="font-display text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
