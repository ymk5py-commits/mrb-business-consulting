import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { WhoReplies } from "./WhoReplies";
import { LedgerMotion } from "./motion/LedgerMotion";
import { whatsappHref } from "@/lib/site.config";

/**
 * Cierre de página: una frase y la acción. Navy sólido, alineado a la izquierda.
 * Una sola acción con peso (WhatsApp); el resto de los canales, como enlace de texto.
 */
export function CtaBand({
  title = "¿Listo para ordenar tu empresa?",
  subtitle = "Escribinos, contanos tu caso y coordinamos una primera consulta sin compromiso.",
  whatsapp = whatsappHref,
}: {
  title?: string;
  subtitle?: string;
  /** Link de WhatsApp (por defecto, el mensaje genérico). */
  whatsapp?: string;
}) {
  return (
    <section className="bg-navy-900">
      <Container className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-16 lg:gap-y-10">
        {/* El «saldo»: doble filete que cierra la página como se cierra una cuenta */}
        <LedgerMotion variant="steps">
          <div data-ledger-trigger aria-hidden="true" className="relative h-[5px] lg:col-span-2">
            <span data-ledger-rule className="absolute inset-x-0 top-0 h-px origin-left bg-slate-500" />
            <span data-ledger-rule className="absolute inset-x-0 bottom-0 h-px origin-left bg-slate-500" />
          </div>
        </LedgerMotion>
        <div className="min-w-0">
          <h2 className="font-display text-balance text-3xl text-paper sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-pretty text-slate-300">{subtitle}</p>
        </div>
        <div className="min-w-0">
          <div className="flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
            <Button href={whatsapp} external variant="whatsapp" size="lg" className="whitespace-nowrap">
              <WhatsappIcon className="h-5 w-5" />
              Escribinos por WhatsApp
            </Button>
            <Link
              href="/contacto"
              className="group inline-flex min-h-11 items-center gap-1.5 self-start whitespace-nowrap rounded-sm text-sm font-semibold text-paper underline decoration-slate-500 underline-offset-8 transition-colors hover:decoration-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper sm:self-auto"
            >
              Teléfono y dirección
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
          <WhoReplies className="mt-5" />
        </div>
      </Container>
    </section>
  );
}
