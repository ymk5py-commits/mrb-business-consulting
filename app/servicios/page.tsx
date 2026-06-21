import type { Metadata } from "next";
import { Container, Section, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { GsapScope } from "@/components/GsapScope";
import { Tilt } from "@/components/Tilt";
import { services } from "@/lib/services";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Servicios contables, fiscales y societarios en Paraguay",
  description:
    "Conocé los servicios de MRB Business Consulting: contabilidad, impuestos, constitución de sociedades, asesoría laboral e IPS, auditoría, trámites y asesoría legal societaria.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <GsapScope>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(`/servicios/${s.slug}`),
            })),
          },
        ]}
      />

      {/* Header band */}
      <section className="bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            items={[{ name: "Inicio", href: "/" }, { name: "Servicios" }]}
          />
          <div data-gsap="reveal">
            <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
              Servicios para tu empresa en Paraguay
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Desde la constitución de tu sociedad hasta la gestión contable, fiscal y
              laboral del día a día. Elegí el servicio que necesitás o escribinos y te
              asesoramos.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <Container>
          <div data-gsap="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Tilt key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </Tilt>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </GsapScope>
  );
}
