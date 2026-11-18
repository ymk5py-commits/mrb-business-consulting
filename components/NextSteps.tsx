import { LedgerMotion } from "./motion/LedgerMotion";

/**
 * Qué pasa después de escribir: solo pasos que el estudio ya hace, sin plazos ni costos
 * hasta que Manuel los confirme. Se muestra donde aparece la duda («¿y después?»):
 * en /contacto, al final del contenido de cada servicio y en la guía.
 */
const nextSteps = [
  {
    title: "Manuel te contesta",
    text: "Por WhatsApp, dentro del horario de atención. Te puede pedir algún dato para entender tu caso.",
  },
  {
    title: "Coordinamos la consulta",
    text: "En la oficina o por teléfono, como te quede mejor.",
  },
  {
    title: "Te pasamos una propuesta cerrada",
    text: "Con el alcance y los honorarios por escrito, antes de empezar a trabajar.",
  },
];

type Props = {
  /** Nivel del título, para respetar el orden de títulos de cada página */
  headingLevel?: 2 | 3;
  /**
   * En una columna ancha de lectura: título y texto en el mismo renglón (desde sm),
   * como una fila del libro mayor. Por defecto, título sobre texto (columna a medias).
   */
  wide?: boolean;
  className?: string;
};

/** Pasos como renglones con filete (el «libro mayor» de la marca), sin tarjetas ni íconos. */
export function NextSteps({ headingLevel = 2, wide = false, className }: Props) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  // Cada paso va un nivel por debajo del título, para no saltar el orden de títulos
  const StepTitle = `h${headingLevel + 1}` as "h3" | "h4";

  return (
    <div className={className}>
      <Heading
        className={`font-display text-2xl text-navy-900 ${wide ? "sm:text-3xl" : ""}`}
      >
        Qué pasa después de escribir
      </Heading>
      <LedgerMotion variant="steps">
        <ol data-ledger-trigger className={wide ? "mt-7" : "mt-6"}>
          {nextSteps.map((step, i) => (
            <li
              key={step.title}
              className={`relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 py-4 ${
                wide ? "sm:grid-cols-[2rem_minmax(0,14rem)_minmax(0,1fr)] sm:gap-x-6" : ""
              }`}
            >
              <span
                aria-hidden="true"
                data-ledger-rule
                className="absolute inset-x-0 top-0 h-px origin-left bg-rule"
              />
              <span aria-hidden="true" className="font-display text-lg tabular-nums text-slate-600">
                {i + 1}
              </span>
              <div className={wide ? "sm:contents" : undefined}>
                <StepTitle className="font-display text-lg text-navy-900">{step.title}</StepTitle>
                <p
                  className={`mt-1 text-[15px] leading-relaxed text-slate-600 lg:text-base ${
                    wide ? "sm:mt-0.5" : ""
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="relative">
            <span data-ledger-rule className="absolute inset-x-0 top-0 h-px origin-left bg-rule" />
          </li>
        </ol>
      </LedgerMotion>
    </div>
  );
}
