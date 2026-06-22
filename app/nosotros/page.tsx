import type { Metadata } from "next";
import { Target, Eye, Handshake, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { TeamSection } from "@/components/TeamSection";
import { GsapScope } from "@/components/GsapScope";
import { site } from "@/lib/site.config";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros",
  description:
    "Conocé a MRB Business Consulting: un equipo de contadores y asesores comprometidos con el crecimiento de empresas y emprendedores en Paraguay.",
  path: "/nosotros",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Profesionalismo",
    text: "Trabajamos con rigor técnico y actualización permanente sobre la normativa paraguaya.",
  },
  {
    icon: Heart,
    title: "Cercanía",
    text: "Te escuchamos, hablamos claro y estamos cuando nos necesitás.",
  },
  {
    icon: Handshake,
    title: "Transparencia",
    text: "Honorarios y alcances definidos desde el inicio. Sin sorpresas.",
  },
  {
    icon: Sparkles,
    title: "Compromiso",
    text: "Tu tranquilidad y el cumplimiento de tu empresa son nuestra prioridad.",
  },
];

const stats = [
  { to: 10, prefix: "+", suffix: "", label: "años de experiencia" },
  { to: 150, prefix: "+", suffix: "", label: "empresas constituidas" },
  { to: 200, prefix: "+", suffix: "", label: "clientes acompañados" },
  { to: 100, prefix: "", suffix: "%", label: "obligaciones en regla" },
];

export default function NosotrosPage() {
  return (
    <GsapScope>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Nosotros", path: "/nosotros" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: absoluteUrl("/nosotros"),
            name: "Nosotros — MRB Business Consulting",
            inLanguage: "es-PY",
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <section className="bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Nosotros" }]} />
          <div data-gsap="reveal">
            <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
              Tu estudio de confianza en Paraguay
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              En MRB Business Consulting acompañamos a empresas y emprendedores con
              soluciones contables, fiscales y societarias claras, confiables y a medida.
            </p>
          </div>
        </Container>
      </section>

      {/* Historia */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div data-gsap="reveal">
              <SectionHeading
                align="left"
                kicker="Quiénes somos"
                title="Un equipo que entiende tu negocio"
              />
            </div>
            <div data-gsap="reveal" className="space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                MRB Business Consulting nace para resolver un problema concreto: la gestión
                contable, tributaria y legal de una empresa en Paraguay suele estar
                dispersa entre varios profesionales, generando demoras, costos y errores.
              </p>
              <p>
                Reunimos en un mismo estudio a contadores y asesores que dominan el marco
                normativo local —la DNIT, el IPS, los Registros Públicos— para que tengas
                un único punto de contacto, respuestas rápidas y la tranquilidad de estar
                siempre en regla.
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
      <Section tone="light">
        <Container>
          <div data-gsap="stagger" className="grid gap-6 md:grid-cols-2">
            <div className="h-full">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white">
                  <Target className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h2 className="font-display mt-5 text-xl text-navy-900">Nuestra misión</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Acompañar a empresas y emprendedores de Paraguay con soluciones contables,
                  fiscales y legales claras y confiables, para que puedan enfocarse en hacer
                  crecer su negocio.
                </p>
              </div>
            </div>
            <div className="h-full">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
                  <Eye className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h2 className="font-display mt-5 text-xl text-navy-900">Nuestra visión</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Ser el estudio de consultoría empresarial de referencia para las PYMEs del
                  Paraguay, reconocido por la cercanía, la excelencia técnica y los
                  resultados.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Valores */}
      <Section tone="surface">
        <Container>
          <div data-gsap="reveal">
            <SectionHeading
              kicker="Nuestros valores"
              title="Lo que nos guía cada día"
            />
          </div>
          <div data-gsap="stagger" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="h-full">
                  <div className="h-full rounded-2xl border border-slate-200 p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-slate-200">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display mt-4 text-lg text-navy-900">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <section className="bg-navy-900">
        <Container className="py-16">
          <div data-gsap="stagger" className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span
                  data-gsap="count"
                  data-to={s.to}
                  data-prefix={s.prefix}
                  data-suffix={s.suffix}
                  className="font-display block text-4xl text-white sm:text-5xl"
                >
                  {s.prefix}0{s.suffix}
                </span>
                <span className="mt-2 block text-sm text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="¿Trabajamos juntos?" />
    </GsapScope>
  );
}
