import { HeroSection } from "@/components/HeroSection";
import { heroImages } from "@/lib/hero-images";
import type { Metadata } from "next";
import { Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { TeamSection } from "@/components/TeamSection";
import { ExperienceBand } from "@/components/ExperienceBand";
import { site } from "@/lib/site.config";
import { pageMetadata, breadcrumbSchema, webPageSchema, ORG_ID } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Nuestro equipo | MRB Business Consulting",
    description:
      "Conocé a Manuel Rolón, Gabriela Duarte Toñanez y María Ernestina Argüello: el equipo de contabilidad, auditoría y Payroll de MRB en Paraguay.",
    path: "/nosotros",
  }),
  title: { absolute: "Nuestro equipo | MRB Business Consulting" },
};

const values = [
  {
    title: "Profesionalismo",
    text: "Trabajamos con rigor técnico y actualización permanente sobre la normativa paraguaya.",
  },
  {
    title: "Cercanía",
    text: "Te escuchamos, hablamos claro y estamos cuando nos necesitás.",
  },
  {
    title: "Transparencia",
    text: "Honorarios y alcances definidos desde el inicio. Sin sorpresas.",
  },
  {
    title: "Compromiso",
    text: "Tu tranquilidad y el cumplimiento de tu empresa son nuestra prioridad.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Nosotros", path: "/nosotros" },
          ]),
          webPageSchema({
            type: "AboutPage",
            path: "/nosotros",
            name: "Nosotros — MRB Business Consulting",
            description: `Quiénes somos en ${site.name}: nuestro equipo de contabilidad, auditoría y Payroll.`,
            mainEntityId: ORG_ID,
          }),
        ]}
      />

      <HeroSection image={heroImages.office}>
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Nosotros" }]} />
          <div>
            <h1 className="font-display mt-6 max-w-3xl text-balance text-4xl leading-tight text-paper sm:text-5xl">
              Tu estudio de confianza en Paraguay
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              En MRB Business Consulting acompañamos a empresas y emprendedores con
              soluciones contables, fiscales y societarias claras, confiables y a medida.
            </p>
          </div>
        </Container>
      </HeroSection>

      {/* Historia */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading title="Un equipo que entiende tu negocio" />
            </div>
            <div className="space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                MRB Business Consulting nace para resolver un problema concreto: la gestión
                contable, tributaria y legal de una empresa en Paraguay suele estar
                dispersa entre varios profesionales, generando demoras, costos y errores.
              </p>
              <p>
                Reunimos en un mismo estudio a contadores y asesores que dominan el marco
                normativo local —la DNIT, el IPS, los Registros Públicos— para que tengas
                un único punto de contacto y una gestión más ordenada.
              </p>
              <p>
                Trabajamos con empresas unipersonales, S.R.L., S.A. y E.A.S. de distintos
                rubros, desde su constitución hasta su operación diaria, con un trato
                cercano y honorarios transparentes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Equipo */}
      <TeamSection />

      {/* Misión / Visión */}
      <Section tone="light" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-x-16 md:grid-cols-2">
            <div className="border-t border-rule py-8">
              <h2 className="font-display text-2xl text-navy-900">Nuestra misión</h2>
              <p className="mt-3 max-w-lg leading-relaxed text-slate-600">
                Acompañar a empresas y emprendedores de Paraguay con soluciones contables,
                fiscales y legales claras y confiables, para que puedan enfocarse en hacer
                crecer su negocio.
              </p>
            </div>
            <div className="border-t border-rule py-8">
              <h2 className="font-display text-2xl text-navy-900">Nuestra visión</h2>
              <p className="mt-3 max-w-lg leading-relaxed text-slate-600">
                Ser el estudio de consultoría empresarial de referencia para las PYMEs del
                Paraguay, reconocido por la cercanía, la excelencia técnica y los
                resultados.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Valores: título | lista */}
      <Section tone="surface" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading title="Lo que nos guía cada día" />
          </div>
          <ul className="grid min-w-0 gap-x-10 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v.title} className="border-t border-rule py-6">
                <h3 className="font-display text-lg text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ExperienceBand />

      <CtaBand title="¿Trabajamos juntos?" />
    </>
  );
}
