import { Container, SectionHeading } from "./ui";
import { LedgerMotion } from "./motion/LedgerMotion";

const steps = [
  { title: "Diagnóstico", text: "Escuchamos tu caso y revisamos la situación actual de tu empresa." },
  { title: "Propuesta", text: "Te presentamos un plan claro, con alcance y honorarios definidos." },
  { title: "Ejecución", text: "Implementamos: contabilidad, impuestos, trámites o constitución." },
  { title: "Acompañamiento", text: "Te acompañamos mes a mes para mantener todo al día." },
];

/** "Cómo trabajamos": 4 pasos en orden, separados por filetes (sin tarjetas). */
export function ProcessSteps() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHeading
          title="Un proceso simple y transparente"
          subtitle="Desde la primera consulta hasta el acompañamiento mensual, sabés exactamente qué esperar."
        />

        <LedgerMotion variant="steps">
          <ol data-ledger-trigger className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative py-6">
                {/* Filete del paso: se traza en orden al entrar en pantalla */}
                <span aria-hidden="true" data-ledger-rule className="absolute inset-x-0 top-0 h-px origin-left bg-rule" />
                <div data-ledger-item>
                  <p className="font-display text-sm tabular-nums text-accent-600">
                    Paso {i + 1}
                  </p>
                  <h3 className="font-display mt-2 text-xl text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </LedgerMotion>
      </Container>
    </section>
  );
}
