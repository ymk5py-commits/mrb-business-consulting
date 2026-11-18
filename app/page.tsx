import { ArrowRight } from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { HomeHero } from "@/components/HomeHero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { DirectorPortrait } from "@/components/DirectorPortrait";
import { faqSchema, webPageSchema } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site.config";
import { homeFaqs } from "@/lib/faqs";

const whyUs = [
  {
    title: "Seguimiento de obligaciones",
    text: "Te ayudamos a organizar vencimientos y gestiones ante la DNIT y el IPS.",
  },
  {
    title: "Todo en un solo estudio",
    text: "Contabilidad, impuestos, laboral y legal coordinados por un mismo equipo. Sin vueltas.",
  },
  {
    title: "Experiencia local",
    text: "Conocemos a fondo el marco legal y tributario paraguayo y los circuitos de cada trámite.",
  },
  {
    title: "Atención cercana",
    text: "Un asesor asignado que entiende tu negocio y te responde rápido cuando lo necesitás.",
  },
];

/** Rubros con los que trabajamos (se leen como una oración, no como etiquetas). */
const rubros = [
  "comercio",
  "servicios",
  "importadoras",
  "construcción",
  "gastronomía",
  "tecnología",
  "salud",
  "inmobiliario",
  "transporte y logística",
  "agropecuario",
  "e-commerce",
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/",
            name: `${site.name} — ${site.tagline}`,
            description: site.description,
            hasBreadcrumb: false,
          }),
          faqSchema(homeFaqs),
        ]}
      />

      <HomeHero />

      {/* ============ SERVICIOS: texto | índice ============ */}
      <Section id="servicios" tone="light" className="lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          {/* En escritorio, el texto acompaña la lista al bajar (la lista es mucho más larga) */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              title="Servicios"
              subtitle="Contabilidad, impuestos, sociedades, IPS y trámites, coordinados desde un solo estudio."
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-600">
              ¿No sabés por dónde empezar? Contanos tu caso y te decimos qué servicio necesitás.
            </p>
            {/* Enlace propio (no dentro de la frase) para que tenga 44 px de alto al tocarlo */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-cta
              className="group mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-accent-600 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Escribinos por WhatsApp
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
          <ServicesGrid />
        </Container>
      </Section>

      {/* ============ POR QUÉ MRB: puntos | texto (alterna el lado) ============ */}
      <Section tone="surface" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0 lg:order-2">
            <SectionHeading
              title="Un solo estudio para toda tu gestión"
              subtitle="Dejá de coordinar entre contador, gestor y abogado. En MRB integramos todo con estándares profesionales y trato cercano."
            />
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Acompañamos a empresas de {rubros.join(", ")}, y a profesionales
              independientes.
            </p>
          </div>
          <ul className="grid min-w-0 gap-x-10 sm:grid-cols-2 lg:order-1">
            {whyUs.map((item) => (
              <li key={item.title} className="border-t border-rule py-6">
                <h3 className="font-display text-lg text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProcessSteps />

      {/* ============ SOBRE MRB: texto | retrato ============ */}
      <Section tone="surface" className="lg:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SectionHeading
                title="Profesionales comprometidos con tu tranquilidad"
                subtitle="Somos un equipo de contadores y asesores que entiende los desafíos de emprender y hacer crecer una empresa en Paraguay. Trabajamos para que vos te ocupes de tu negocio y nosotros del resto."
              />
              <Button href="/nosotros" variant="ghost" className="mt-8">
                Conocé a Manuel
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="min-w-0 px-4 sm:px-10 lg:px-6">
              <DirectorPortrait />
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ FAQ: título | preguntas ============ */}
      <Section id="faq" tone="light" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading title="Preguntas frecuentes" />
          </div>
          <Faq items={homeFaqs} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
