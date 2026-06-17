import { Button, Container } from "./ui";
import { WhatsappIcon } from "./icons";
import { Reveal } from "./motion";
import { whatsappHref } from "@/lib/site.config";

export function CtaBand({
  title = "¿Listo para ordenar tu empresa?",
  subtitle = "Agendá una consulta sin compromiso. Te respondemos por WhatsApp y te asesoramos según tu caso.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-navy-900 via-navy-800 to-navy-700">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />
      <Container className="relative py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
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
        </Reveal>
      </Container>
    </section>
  );
}
