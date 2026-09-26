import { Container, SectionHeading } from "./ui";

const steps = [
  { n: "01", title: "Diagnóstico", text: "Escuchamos tu caso y revisamos la situación actual de tu empresa." },
  { n: "02", title: "Propuesta", text: "Te presentamos un plan claro, con alcance y honorarios definidos." },
  { n: "03", title: "Ejecución", text: "Implementamos: contabilidad, impuestos, trámites o constitución." },
  { n: "04", title: "Acompañamiento", text: "Te acompañamos mes a mes para mantener todo al día." },
];

/** "Cómo trabajamos": 4 pasos en grilla (sin scroll anclado ni animaciones). */
export function ProcessSteps() {
  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-28">
      <Container>
        <div data-reveal>
          <SectionHeading
            kicker="Cómo trabajamos"
            title="Un proceso simple y transparente"
            subtitle="Desde la primera consulta hasta el acompañamiento mensual, sabés exactamente qué esperar."
          />
        </div>

        <ol data-reveal-group className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7"
            >
              <span aria-hidden="true" className="font-display text-5xl text-accent/25">
                {step.n}
              </span>
              <h3 className="font-display mt-4 text-xl text-navy-900">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
