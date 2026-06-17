import { Button, Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { whatsappHref } from "@/lib/site.config";

export function CtaBand({
  title = "¿Listo para ordenar tu empresa?",
  subtitle = "Agendá una consulta sin compromiso. Te respondemos por WhatsApp y te asesoramos según tu caso.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-700">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">{subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={whatsappHref} external variant="whatsapp" size="lg">
              <WhatsappIcon className="h-5 w-5" />
              Escribinos por WhatsApp
            </Button>
            <Button href="/contacto" variant="white" size="lg">
              Otras formas de contacto
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
