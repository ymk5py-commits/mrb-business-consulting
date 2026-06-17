import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Layers,
  MapPin,
  MessageSquareText,
} from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { PixelHero } from "@/components/PixelHero";
import { ServicesOrbital } from "@/components/ServicesOrbital";
import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/motion";
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
    title: "Cumplimiento garantizado",
    text: "Tus obligaciones ante la DNIT, el IPS y los Registros Públicos siempre en regla y en término.",
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

const steps = [
  { n: "01", title: "Diagnóstico", text: "Escuchamos tu caso y revisamos la situación actual de tu empresa." },
  { n: "02", title: "Propuesta", text: "Te presentamos un plan claro, con alcance y honorarios definidos." },
  { n: "03", title: "Ejecución", text: "Implementamos: contabilidad, impuestos, trámites o constitución." },
  { n: "04", title: "Acompañamiento", text: "Te acompañamos mes a mes para mantener todo al día." },
];

// Rubros que atiende el estudio (banda tipo "logo cloud").
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

// Métricas de confianza — EDITÁ con tus números reales.
const stats = [
  { value: "+10", label: "años de experiencia" },
  { value: "+150", label: "empresas constituidas" },
  { value: "+200", label: "clientes acompañados" },
  { value: "100%", label: "obligaciones en regla" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <PixelHero />

      {/* ============ SERVICIOS (orbital) ============ */}
      <Section id="servicios" tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              kicker="Nuestros servicios"
              title="Soluciones integrales para tu empresa"
              subtitle="Tocá cada servicio para ver el detalle y cómo se conectan entre sí."
            />
          </Reveal>
          <Reveal className="mt-12">
            <ServicesOrbital />
          </Reveal>
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
          <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
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
                className="whitespace-nowrap text-base font-semibold uppercase tracking-wider text-slate-400 transition-colors duration-300 hover:text-navy-900"
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
            <Reveal>
              <SectionHeading
                align="left"
                kicker="Por qué elegirnos"
                title="Un solo estudio para toda tu gestión empresarial"
                subtitle="Dejá de coordinar entre contador, gestor y abogado. En MRB integramos todo con estándares profesionales y trato cercano."
              />
            </Reveal>
            <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {whyUs.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-slate-200">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display mt-4 text-lg text-navy-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ============ PROCESO ============ */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              kicker="Cómo trabajamos"
              title="Un proceso simple y transparente"
              subtitle="Desde la primera consulta hasta el acompañamiento mensual, sabés exactamente qué esperar."
            />
          </Reveal>
          <div className="relative mt-14">
            {/* línea conectora (desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-12 hidden h-px bg-linear-to-r from-transparent via-accent/30 to-transparent lg:block"
            />
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <StaggerItem key={step.n}>
                  <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-7">
                    <span className="font-display text-4xl text-accent/30">{step.n}</span>
                    <h3 className="font-display mt-3 text-lg text-navy-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ============ STATS ============ */}
      <section className="relative overflow-hidden bg-navy-900">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <Container className="relative py-16">
          <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <CountUp
                  value={s.value}
                  className="font-display block text-4xl text-white sm:text-5xl"
                />
                <span className="mt-2 block text-sm text-slate-400">{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============ NOSOTROS TEASER ============ */}
      <Section tone="light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading
                align="left"
                kicker="Sobre MRB"
                title="Profesionales comprometidos con tu tranquilidad"
                subtitle="Somos un equipo de contadores y asesores que entiende los desafíos de emprender y hacer crecer una empresa en Paraguay. Trabajamos para que vos te ocupes de tu negocio y nosotros del resto."
              />
              <Button href="/nosotros" variant="ghost" className="mt-8">
                Conocé al equipo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {[
                "Trato directo y personalizado",
                "Información clara, sin tecnicismos",
                "Tecnología y procesos al día",
                "Confidencialidad y compromiso",
              ].map((item) => (
                <StaggerItem
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-surface p-5"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-navy-900">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ============ FAQ ============ */}
      <Section id="faq" tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              kicker="Preguntas frecuentes"
              title="Respuestas claras antes de empezar"
            />
          </Reveal>
          <Reveal className="mt-12" delay={0.1}>
            <Faq items={homeFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
