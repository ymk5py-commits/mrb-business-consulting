import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container, Section, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import {
  WhatsappIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
} from "@/components/icons";
import { site, whatsappHref } from "@/lib/site.config";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { GsapScope } from "@/components/GsapScope";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Contactá a MRB Business Consulting en Asunción, Paraguay. Escribinos por WhatsApp, llamanos o enviá tu consulta. Atención de lunes a viernes.",
  path: "/contacto",
});

const mapQuery = encodeURIComponent(
  `${site.contact.address.street}, ${site.contact.address.city}, Paraguay`,
);

export default function ContactoPage() {
  return (
    <GsapScope>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Contacto", path: "/contacto" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": absoluteUrl("/contacto"),
            url: absoluteUrl("/contacto"),
            name: "Contacto — MRB Business Consulting",
            inLanguage: "es-PY",
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <section className="bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Contacto" }]} />
          <div data-gsap="reveal">
            <h1 className="font-display mt-6 text-4xl leading-tight text-white sm:text-5xl">
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
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    Escribir por WhatsApp
                  </a>
                </ContactRow>
                <ContactRow icon={<Phone className="h-5 w-5" />} label="Teléfono">
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                    {site.contact.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className="h-5 w-5" />} label="Correo">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-accent">
                    {site.contact.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<MapPin className="h-5 w-5" />} label="Dirección">
                  {site.contact.address.street}, {site.contact.address.city}, {site.country}
                </ContactRow>
                <ContactRow icon={<Clock className="h-5 w-5" />} label="Horario">
                  {site.contact.hours}
                </ContactRow>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <SocialLink href={site.social.instagram} label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </SocialLink>
                <SocialLink href={site.social.facebook} label="Facebook">
                  <FacebookIcon className="h-5 w-5" />
                </SocialLink>
                <SocialLink href={site.social.linkedin} label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5" />
                </SocialLink>
              </div>

              <div data-gsap="reveal" className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  title="Ubicación de MRB Business Consulting"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
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
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-navy-900">{children}</p>
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-900 ring-1 ring-slate-200 transition-colors hover:bg-accent hover:text-white"
    >
      {children}
    </a>
  );
}
