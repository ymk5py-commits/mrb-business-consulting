import { Container } from "@/components/ui";

const highlights = [
  {
    value: "31",
    label: "clientes en total",
  },
  {
    value: "7",
    label: "sociedades",
  },
  {
    value: "24",
    label: "personas físicas",
  },
  {
    value: "+15",
    label: "años de experiencia profesional de Manuel",
  },
];

export function ExperienceBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <Container className="relative py-14 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
          Trayectoria y clientes
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-2xl text-white sm:text-3xl">
          Experiencia al servicio de empresas y personas
        </h2>
        <div data-gsap="stagger" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/15 bg-white/5 p-5">
              <p className="font-display text-4xl text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
