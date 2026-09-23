import {
  ArrowRight,
  ShieldCheck,
  Layers,
  MapPin,
  MessageSquareText,
} from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { VideoHero } from "@/components/VideoHero";
import { ServicesOrbital } from "@/components/ServicesOrbital";
import { ProcessHorizontal } from "@/components/ProcessHorizontal";
import { DisplayCards } from "@/components/DisplayCards";
import { ExperienceBand } from "@/components/ExperienceBand";
import { GsapScope } from "@/components/GsapScope";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { faqSchema } from "@/lib/seo";

const homeFaqs = [
  {
    q: "¿Qué servicios ofrece MRB Business Consulting?",
    a: "Brindamos contabilidad, asesoría tributaria, constitución de sociedades (S.A., S.R.L., E.A.S.), asesoría laboral e IPS, auditoría, trámites e inscripciones y asesoría legal societaria, todo bajo el marco legal paraguayo.",
  },
  {
    q: "¿Atienden a empresas de todo Paraguay?",
    a: "Sí. Trabajamos con clientes en todo el país, con base en Asunción. Gran parte de la gestión se realiza de forma digital, por lo que tu ubicación no es un impedimento.",
  },
  {
    q: "¿Puedo tercerizar toda la contabilidad e impuestos de mi empresa?",
    a: "Por supuesto. Podés delegar en MRB la contabilidad mensual, la liquidación de impuestos ante la DNIT y la gestión laboral, con un equipo profesional y un único punto de contacto.",
  },
  {
    q: "¿Ayudan a constituir una empresa desde cero?",
    a: "Sí. Te asesoramos para elegir el tipo societario adecuado y gestionamos todo el proceso: estatutos, inscripción en los Registros Públicos y obtención del RUC, para que arranques a operar cuanto antes.",
  },
  {
    q: "¿Cómo empiezo a trabajar con MRB?",
    a: "Escribinos por WhatsApp o completá el formulario de contacto. Coordinamos una primera consulta sin compromiso, entendemos tu caso y te enviamos una propuesta a medida.",
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Seguimiento de obligaciones",
    text: "Te ayudamos a organizar vencimientos y gestiones ante la DNIT, el IPS y los Registros Públicos.",
  },
  {
    icon: Layers,
    title: "Todo en un solo estudio",
    text: "Contabilidad, impuestos, laboral y legal coordinados por un mismo equipo. Sin vueltas.",
  },
  {
    icon: MapPin,
    title: "Experiencia local",
    text: "Conocemos a fondo el marco legal y tributario paraguayo y los circuitos de cada trámite.",
  },
  {
    icon: MessageSquareText,
    title: "Atención cercana",
    text: "Un asesor asignado que entiende tu negocio y te responde rápido cuando lo necesitás.",
  },
];

const rubros = [
  "Comercio",
  "Servicios",
  "Importadoras",
  "Construcción",
  "Gastronomía",
  "Tecnología",
  "Salud",
  "Inmobiliario",
  "Transporte y logística",
  "Agropecuario",
  "E-commerce",
  "Profesionales independientes",
];

export default function HomePage() {
  return (
    <GsapScope>
      <JsonLd data={faqSchema(homeFaqs)} />

      <VideoHero />

      {/* ============ SERVICIOS (orbital) ============ */}
      <Section id="servicios" tone="surface">
        <Container>
          <div data-gsap="reveal">
            <SectionHeading
              kicker="Nuestros servicios"
              title="Soluciones integrales para tu empresa"
              subtitle="Tocá cada servicio para ver el detalle y cómo se conectan entre sí."
            />
          </div>
          <div data-gsap="reveal" className="mt-12">
            <ServicesOrbital />
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/servicios" variant="secondary">
              Ver todos los servicios
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ============ RUBROS (banda slider) ============ */}
      <section className="border-y border-slate-200 bg-white py-12">
        <Container>
          <p
            data-gsap="reveal"
            className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
          >
            Acompañamos a empresas de todos los rubros
          </p>
          <InfiniteSlider
            gap={48}
            speed={45}
            speedOnHover={15}
            className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          >
            {rubros.map((r) => (
              <span
                key={r}
                className="whitespace-nowrap text-base font-semibold uppercase tracking-wider text-slate-600 transition-colors duration-300 hover:text-navy-900"
              >
                {r}
              </span>
            ))}
          </InfiniteSlider>
        </Container>
      </section>

      {/* ============ POR QUÉ MRB ============ */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div data-gsap="reveal">
              <SectionHeading
                align="left"
                kicker="Por qué elegirnos"
                title="Un solo estudio para toda tu gestión empresarial"
                subtitle="Dejá de coordinar entre contador, gestor y abogado. En MRB integramos todo con estándares profesionales y trato cercano."
              />
            </div>
            <div data-gsap="stagger" className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {whyUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-slate-200">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display mt-4 text-lg text-navy-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ PROCESO (scroll horizontal anclado) ============ */}
      <ProcessHorizontal />

      <ExperienceBand />

      {/* ============ NOSOTROS TEASER ============ */}
      <Section tone="light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-gsap="reveal">
              <SectionHeading
                align="left"
                kicker="Sobre MRB"
                title="Profesionales comprometidos con tu tranquilidad"
                subtitle="Somos un equipo de contadores y asesores que entiende los desafíos de emprender y hacer crecer una empresa en Paraguay. Trabajamos para que vos te ocupes de tu negocio y nosotros del resto."
              />
              <Button href="/nosotros" variant="ghost" className="mt-8">
                Conocé a Manuel
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div
              data-gsap="reveal"
              className="flex min-h-[24rem] items-center justify-center overflow-hidden"
            >
              <DisplayCards />
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ FAQ ============ */}
      <Section id="faq" tone="surface">
        <Container>
          <div data-gsap="reveal">
            <SectionHeading
              kicker="Preguntas frecuentes"
              title="Respuestas claras antes de empezar"
            />
          </div>
          <div data-gsap="reveal" className="mt-12">
            <Faq items={homeFaqs} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </GsapScope>
  );
}
