import { Button, Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { whatsappHref } from "@/lib/site.config";

/** Cierre de página: una frase y la acción. Navy sólido, alineado a la izquierda. */
export function CtaBand({
  title = "¿Listo para ordenar tu empresa?",
  subtitle = "Agendá una consulta sin compromiso. Te respondemos por WhatsApp y te asesoramos según tu caso.",
  whatsapp = whatsappHref,
}: {
  title?: string;
  subtitle?: string;
  /** Link de WhatsApp (por defecto, el mensaje genérico). */
  whatsapp?: string;
}) {
  return (
    <section className="bg-navy-900">
      <Container className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div className="min-w-0">
          <h2 className="font-display text-balance text-3xl text-paper sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-pretty text-slate-300">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp} external variant="whatsapp" size="lg" className="whitespace-nowrap">
            <WhatsappIcon className="h-5 w-5" />
            Escribinos por WhatsApp
          </Button>
          <Button href="/contacto" variant="white" size="lg" className="whitespace-nowrap">
            Otros contactos
          </Button>
        </div>
      </Container>
    </section>
  );
}
