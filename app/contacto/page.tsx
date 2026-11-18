import { HeroSection } from "@/components/HeroSection";
import { heroImages } from "@/lib/hero-images";
import type { Metadata } from "next";
import { Phone, ArrowUpRight } from "lucide-react";
import { Button, Container, Section, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { WhoReplies } from "@/components/WhoReplies";
import { LedgerMotion } from "@/components/motion/LedgerMotion";
import { WhatsappIcon, socialIcons } from "@/components/icons";
import { site, whatsappHref, addressLine, mapsHref, socialLinks } from "@/lib/site.config";
import { pageMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contacto: WhatsApp, Teléfono y Dirección en Asunción | MRB",
  absoluteTitle: true,
  description:
    "Contactá a MRB Business Consulting en Asunción. Escribinos por WhatsApp, llamanos o vení a la oficina. Lunes a viernes de 9 a 18 y sábados de 9 a 12.",
  path: "/contacto",
});

/**
 * Qué pasa después de escribir: solo pasos que el estudio ya hace, sin plazos ni costos
 * hasta que Manuel los confirme.
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

const mapSrc = `https://www.google.com/maps?q=${site.contact.geo.lat},${site.contact.geo.lng}&z=16&output=embed`;

/** Links de texto dentro de las filas: hover + foco visible */
const rowLink =
  "inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Contacto", path: "/contacto" },
          ]),
          webPageSchema({
            type: "ContactPage",
            path: "/contacto",
            name: "Contacto — MRB Business Consulting",
            description: `Contactá a ${site.name} en Asunción, Paraguay: WhatsApp, teléfono y dirección.`,
          }),
        ]}
      />

      <HeroSection image={heroImages.contact}>
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Contacto" }]} />
          <div>
            <h1 className="font-display mt-6 text-balance text-4xl leading-tight text-paper sm:text-5xl">
              Hablemos de tu empresa
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Escribinos por WhatsApp, llamanos o vení a la oficina en {site.city}. Atendemos
              de lunes a viernes de 9 a 18 y los sábados de 9 a 12.
            </p>
            {/* Una sola acción con peso; el teléfono, como enlace de texto */}
            <div className="mt-8 flex flex-col gap-x-7 gap-y-3 sm:flex-row sm:items-center">
              <Button href={whatsappHref} external variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <WhatsappIcon className="h-5 w-5" />
                Escribinos por WhatsApp
              </Button>
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2 self-start whitespace-nowrap rounded-sm text-sm font-semibold text-paper underline decoration-slate-500 underline-offset-8 transition-colors hover:decoration-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper sm:self-auto"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                O llamanos al {site.contact.phone}
              </a>
            </div>
            {/* El horario ya está en el párrafo de arriba: acá alcanza con quién contesta */}
            <WhoReplies detail="Director del estudio" className="mt-6" />
          </div>
        </Container>
      </HeroSection>

      <Section tone="surface">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-x-16">
            {/* Qué pasa después: renglones con filete */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <h2 className="font-display text-2xl text-navy-900">Qué pasa después de escribir</h2>
              <LedgerMotion variant="steps">
                <ol data-ledger-trigger className="mt-6">
                  {nextSteps.map((step, i) => (
                    <li key={step.title} className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 py-4">
                      <span
                        aria-hidden="true"
                        data-ledger-rule
                        className="absolute inset-x-0 top-0 h-px origin-left bg-rule"
                      />
                      <span aria-hidden="true" className="font-display text-lg tabular-nums text-slate-600">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-navy-900">{step.title}</h3>
                        <p className="mt-1 text-[15px] leading-relaxed text-slate-600 lg:text-base">{step.text}</p>
                      </div>
                    </li>
                  ))}
                  <li aria-hidden="true" className="relative">
                    <span data-ledger-rule className="absolute inset-x-0 top-0 h-px origin-left bg-rule" />
                  </li>
                </ol>
              </LedgerMotion>
            </div>

            {/* El formulario: arma el mensaje y abre WhatsApp. En el celular va antes de los datos y el mapa;
                en escritorio ocupa la columna derecha y acompaña al bajar. */}
            <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-2xl text-navy-900">Armá tu mensaje</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Completá estos datos y se abre WhatsApp con el mensaje listo para enviar.
                Solo el nombre es obligatorio.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Datos de contacto: renglones con filete, sin íconos */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-2">
              <h2 className="font-display text-2xl text-navy-900">Datos de contacto</h2>
              <dl className="mt-6 border-t border-rule">
                <ContactRow label="Teléfono">
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={rowLink}>
                    {site.contact.phone}
                  </a>
                </ContactRow>
                {site.contact.email && (
                  <ContactRow label="Correo">
                    <a href={`mailto:${site.contact.email}`} className={`${rowLink} break-all`}>
                      {site.contact.email}
                    </a>
                  </ContactRow>
                )}
                <ContactRow label="Dirección">
                  <span className="block py-2.5">{addressLine}, {site.country}</span>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${rowLink} gap-1 font-semibold text-accent-600`}
                  >
                    Cómo llegar
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </ContactRow>
                <ContactRow label="Horario">
                  <span className="block py-2.5">{site.contact.hours}</span>
                </ContactRow>
                {socialLinks.length > 0 && (
                  <ContactRow label="Redes">
                    <span className="flex flex-wrap items-center gap-3 py-1">
                      {socialLinks.map((s) => {
                        const Icon = socialIcons[s.network];
                        return (
                          <SocialLink key={s.network} href={s.href} label={s.label}>
                            <Icon className="h-5 w-5" />
                          </SocialLink>
                        );
                      })}
                    </span>
                  </ContactRow>
                )}
              </dl>

              <div className="mt-8 overflow-hidden rounded-lg ring-1 ring-rule">
                <iframe
                  title="Ubicación de MRB Business Consulting"
                  src={mapSrc}
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] items-baseline gap-4 border-b border-rule py-2">
      <dt className="py-2.5 text-sm font-semibold text-slate-600">{label}</dt>
      <dd className="min-w-0 text-sm text-navy-900">{children}</dd>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper text-navy-900 ring-1 ring-rule transition-colors hover:bg-accent hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}
