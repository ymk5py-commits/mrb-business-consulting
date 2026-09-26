import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { Container, Section, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { WhatsappIcon, socialIcons } from "@/components/icons";
import { site, whatsappHref, addressLine, mapsHref, socialLinks } from "@/lib/site.config";
import { pageMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";
import { GsapScope } from "@/components/GsapScope";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Contacto: WhatsApp, Teléfono y Dirección en Lambaré | MRB",
    description:
      "Contactá a MRB Business Consulting en Lambaré (Gran Asunción). Escribinos por WhatsApp, llamanos o enviá tu consulta. Lunes a viernes, de 08:00 a 17:00.",
    path: "/contacto",
  }),
  title: { absolute: "Contacto: WhatsApp, Teléfono y Dirección en Lambaré | MRB" },
};

const mapSrc = `https://www.google.com/maps?q=${site.contact.geo.lat},${site.contact.geo.lng}&z=16&output=embed`;

/** Links de texto dentro de las filas: hover + foco visible */
const rowLink =
  "rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export default function ContactoPage() {
  return (
    <GsapScope>
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
            description: `Contactá a ${site.name} en Lambaré (Gran Asunción), Paraguay: WhatsApp, teléfono y dirección.`,
          }),
        ]}
      />

      <section className="bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Contacto" }]} />
          <div data-gsap="reveal">
            <h1 className="font-display mt-6 text-balance text-4xl leading-tight text-white sm:text-5xl">
              Hablemos de tu empresa
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Estamos para ayudarte. Escribinos por WhatsApp, completá el formulario o
              visitanos en {site.city}. Te respondemos a la brevedad.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Form */}
            <div>
              <div data-gsap="reveal">
                <h2 className="font-display text-2xl text-navy-900">Envianos tu consulta</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Completá tus datos y te contactamos. Los campos con{" "}
                  <span className="text-accent">*</span> son obligatorios.
                </p>
              </div>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Info */}
            <div>
              <div data-gsap="reveal">
                <h2 className="font-display text-2xl text-navy-900">Datos de contacto</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Elegí el canal que prefieras.
                </p>
              </div>

              <div data-gsap="stagger" className="mt-6 space-y-4">
                <ContactRow icon={<WhatsappIcon className="h-5 w-5" />} label="WhatsApp">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={rowLink}>
                    Escribir por WhatsApp
                  </a>
                </ContactRow>
                <ContactRow icon={<Phone className="h-5 w-5" />} label="Teléfono">
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={rowLink}>
                    {site.contact.phone}
                  </a>
                </ContactRow>
                {site.contact.email && (
                  <ContactRow icon={<Mail className="h-5 w-5" />} label="Correo">
                    <a href={`mailto:${site.contact.email}`} className={`${rowLink} break-all`}>
                      {site.contact.email}
                    </a>
                  </ContactRow>
                )}
                <ContactRow icon={<MapPin className="h-5 w-5" />} label="Dirección">
                  <span className="block">{addressLine}, {site.country}</span>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${rowLink} mt-1 inline-flex items-center gap-1 font-semibold text-accent-600`}
                  >
                    Cómo llegar
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </ContactRow>
                <ContactRow icon={<Clock className="h-5 w-5" />} label="Horario">
                  {site.contact.hours}
                </ContactRow>
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-7 flex items-center gap-3">
                  {socialLinks.map((s) => {
                    const Icon = socialIcons[s.network];
                    return (
                      <SocialLink key={s.network} href={s.href} label={s.label}>
                        <Icon className="h-5 w-5" />
                      </SocialLink>
                    );
                  })}
                </div>
              )}

              <div data-gsap="reveal" className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
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
    </GsapScope>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-navy-900">{children}</div>
      </div>
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-900 ring-1 ring-slate-200 transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}
