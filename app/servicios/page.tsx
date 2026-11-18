import { HeroSection } from "@/components/HeroSection";
import { heroImages } from "@/lib/hero-images";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { services, getService } from "@/lib/services";
import { pageMetadata, breadcrumbSchema, absoluteUrl, webPageSchema } from "@/lib/seo";

const SERVICES_LIST_ID = `${absoluteUrl("/servicios")}#lista-servicios`;

/** Guía rápida: situación habitual → servicio que la resuelve. */
const guide = [
  {
    situation: "Vas a abrir tu empresa",
    text: "Te ayudamos a elegir entre E.A.S., S.A., S.R.L. o unipersonal y la dejamos con RUC y libros, lista para facturar.",
    slugs: ["constitucion-de-sociedades", "tramites-inscripciones"],
  },
  {
    situation: "Llegás de otro país a invertir",
    text: "Coordinamos la Constancia de Inversionista, la empresa y el RUC, en el orden correcto para que nada se trabe.",
    slugs: ["extranjeros", "constitucion-de-sociedades"],
  },
  {
    situation: "Trabajás por tu cuenta",
    text: "Si sos profesional independiente, cobrás alquileres o tenés un comercio unipersonal, llevamos tu IVA, tu IRP y tu facturación.",
    slugs: ["personas-fisicas"],
  },
  {
    situation: "Ya facturás y tenés que declarar",
    text: "Liquidamos IVA, IRE, IRP e IDU en Marangatú y seguimos cada vencimiento de la DNIT para que no pagues multas.",
    slugs: ["impuestos"],
  },
  {
    situation: "Querés tus números al día",
    text: "Llevamos tus libros, balances y conciliaciones todos los meses, sin que necesites un área contable propia.",
    slugs: ["contabilidad"],
  },
  {
    situation: "Tenés o vas a contratar empleados",
    text: "Liquidamos sueldos y aguinaldo, presentamos los aportes al IPS y registramos los contratos ante el MTESS.",
    slugs: ["asesoria-laboral-ips"],
  },
  {
    situation: "Un banco o un inversor pide tus números",
    text: "Auditamos tus estados financieros o hacemos un due diligence antes de comprar, vender o invertir.",
    slugs: ["auditoria-consultoria"],
  },
  {
    situation: "Cambian los socios o el capital",
    text: "Redactamos actas, reformas de estatutos, aumentos de capital y transferencias de acciones.",
    slugs: ["asesoria-legal-societaria"],
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Servicios Contables y Tributarios en Paraguay | MRB",
  absoluteTitle: true,
  description:
    "Contabilidad, impuestos, constitución de sociedades, IPS, auditoría, trámites y asesoría societaria para empresas y personas en Paraguay. Un solo estudio.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
          ]),
          webPageSchema({
            type: "CollectionPage",
            path: "/servicios",
            name: "Servicios contables, tributarios y societarios en Paraguay",
            mainEntityId: SERVICES_LIST_ID,
          }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": SERVICES_LIST_ID,
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
      <HeroSection image={heroImages.office}>
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs
            items={[{ name: "Inicio", href: "/" }, { name: "Servicios" }]}
          />
          <div>
            <h1 className="font-display mt-6 max-w-3xl text-balance text-4xl leading-tight text-paper sm:text-5xl">
              Servicios para tu empresa en Paraguay
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Desde la constitución de tu sociedad hasta la gestión contable, fiscal y
              laboral del día a día. Elegí el servicio que necesitás o escribinos y te
              asesoramos.
            </p>
          </div>
        </Container>
      </HeroSection>

      <Section tone="surface">
        <Container>
          <SectionHeading
            title="Nuestros servicios"
            subtitle="Coordinados desde un mismo estudio en Asunción, para empresas y personas de todo Paraguay."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Guía: título | situaciones */}
      <Section tone="light" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              title="¿Qué servicio necesito?"
              subtitle="Buscá tu situación. Si tu caso combina varias, escribinos: lo resolvemos todo desde un solo estudio."
            />
          </div>
          <ul className="grid min-w-0 gap-x-10 sm:grid-cols-2">
            {guide.map((item) => (
              <li key={item.situation} className="border-t border-rule py-6">
                <h3 className="font-display text-lg text-navy-900">{item.situation}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {item.slugs.map((slug) => {
                    const service = getService(slug);
                    return (
                      service && (
                        <Link
                          key={slug}
                          href={`/servicios/${slug}`}
                          className="rounded-sm text-sm font-semibold text-accent-600 underline underline-offset-4 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                          {service.title}
                        </Link>
                      )
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
