import { Container, SectionHeading } from "./ui";
import { LedgerMotion } from "./motion/LedgerMotion";

/**
 * Qué pasa en cada paso, qué recibís y cuándo. Solo compromisos que el sitio ya hace en
 * otras páginas (propuesta con alcance y honorarios, aviso antes de cada vencimiento):
 * sin plazos en días ni precios hasta que Manuel los confirme.
 */
const steps = [
  {
    title: "Diagnóstico",
    does: "Escuchamos tu caso y revisamos la situación actual de tu empresa.",
    get: "Un panorama claro de lo que está en regla y lo que falta.",
    when: "En la primera consulta",
  },
  {
    title: "Propuesta",
    does: "Armamos el plan de trabajo según lo que encontramos.",
    get: "El alcance y los honorarios por escrito, antes de empezar.",
    when: "Después del diagnóstico",
  },
  {
    title: "Ejecución",
    does: "Implementamos: contabilidad, impuestos, trámites o constitución.",
    get: "Tus inscripciones, libros y declaraciones al día.",
    when: "Desde el primer mes",
  },
  {
    title: "Acompañamiento",
    does: "Seguimos tus obligaciones mes a mes.",
    get: "Aviso antes de cada vencimiento y un interlocutor que conoce tu caso.",
    when: "Todos los meses",
  },
];

const COLUMNS = "lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,11rem)]";

/**
 * "Cómo trabajamos" como un libro mayor: una cabecera bajo filete grueso y un renglón por
 * paso, con columnas (paso · qué hacemos · qué recibís · cuándo). En el celular, cada paso
 * es una ficha con sus rótulos. Los filetes se trazan en orden; el texto nunca se esconde.
 */
export function ProcessSteps() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading
          title="Un proceso simple y transparente"
          subtitle="Desde la primera consulta hasta el acompañamiento mensual, sabés exactamente qué esperar."
        />

        {/* Cabecera de columnas (solo escritorio; en el celular cada dato lleva su rótulo) */}
        <div
          aria-hidden="true"
          className={`mt-12 hidden gap-8 border-b-2 border-navy-900 pb-3 text-sm font-semibold text-navy-900 lg:grid ${COLUMNS}`}
        >
          <span>Paso</span>
          <span>Qué hacemos</span>
          <span>Qué recibís</span>
          <span>Cuándo</span>
        </div>

        <LedgerMotion variant="steps">
          <ol
            data-ledger-trigger
            className="mt-10 border-t-2 border-navy-900 lg:mt-0 lg:border-t-0"
          >
            {steps.map((step, i) => (
              <li key={step.title} className={`relative grid gap-3 py-6 lg:gap-8 ${COLUMNS}`}>
                {/* Renglón: se traza en orden al entrar en pantalla */}
                <span
                  aria-hidden="true"
                  data-ledger-rule
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-rule"
                />
                <h3 className="font-display flex items-baseline gap-3 text-xl text-navy-900">
                  <span className="tabular-nums text-slate-600">{i + 1}</span>
                  {step.title}
                </h3>
                <dl className="contents">
                  <Cell label="Qué hacemos">{step.does}</Cell>
                  <Cell label="Qué recibís" strong>
                    {step.get}
                  </Cell>
                  <Cell label="Cuándo">{step.when}</Cell>
                </dl>
              </li>
            ))}
          </ol>
        </LedgerMotion>
      </Container>
    </section>
  );
}

/** Un dato del renglón: en el celular, rótulo a la izquierda; en escritorio, solo el valor. */
function Cell({
  label,
  strong,
  children,
}: {
  label: string;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-4 lg:block">
      <dt className="text-[15px] font-semibold text-navy-900 sm:text-sm lg:sr-only">{label}</dt>
      <dd
        className={
          strong
            ? "text-[15px] leading-relaxed text-navy-900 sm:text-sm"
            : "text-[15px] leading-relaxed text-slate-600 sm:text-sm"
        }
      >
        {children}
      </dd>
    </div>
  );
}
