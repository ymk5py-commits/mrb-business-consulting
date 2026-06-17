import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Clock,
  Layers,
  MapPin,
  MessageSquareText,
} from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { ServiceCard } from "@/components/ServiceCard";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { WhatsappIcon } from "@/components/icons";
import { services } from "@/lib/services";
import { whatsappHref, site } from "@/lib/site.config";
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

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
        {/* glow decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-accent-bright/10 blur-3xl"
        />
        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright ring-1 ring-white/15">
                Consultoría empresarial en Paraguay
              </span>
              <h1 className="font-display mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                Contabilidad, impuestos y tu{" "}
                <span className="text-accent-bright">empresa</span>, en un solo lugar
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Estudio de consultoría contable, fiscal y societaria. Constituimos tu
                empresa, llevamos tu contabilidad y mantenemos tus impuestos al día ante
                la DNIT — bajo las leyes de Paraguay.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappHref} external variant="whatsapp" size="lg">
                  <WhatsappIcon className="h-5 w-5" />
                  Consultá por WhatsApp
                </Button>
                <Button href="/servicios" variant="white" size="lg">
                  Ver servicios
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent-bright" /> Cumplimiento DNIT e IPS
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent-bright" /> Respuesta rápida
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent-bright" /> {site.city}, Paraguay
                </span>
              </div>
            </div>

            {/* Tarjeta de servicios destacados */}
            <div className="reveal lg:justify-self-end">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
                  Resolvemos por vos
                </p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    "Constitución de S.A., S.R.L. y E.A.S.",
                    "Liquidación de IVA, IRE e IRP",
                    "Contabilidad mensual y estados financieros",
                    "Aportes al IPS y gestión laboral",
                    "Inscripción de RUC y patente municipal",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-200">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/servicios"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-bright hover:text-white"
                >
                  Conocé todos los servicios
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ SERVICIOS ============ */}
      <Section id="servicios" tone="surface">
        <Container>
          <SectionHeading
            kicker="Nuestros servicios"
            title="Soluciones integrales para tu empresa"
            subtitle="Todo lo que tu negocio necesita para constituirse, operar y crecer en regla en Paraguay."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
            {/* Card CTA */}
            <div className="flex flex-col justify-between rounded-2xl bg-navy-900 p-7 text-white">
              <div>
                <h3 className="font-display text-xl">¿No sabés cuál necesitás?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Contanos sobre tu empresa y te recomendamos el servicio justo, sin
                  compromiso.
                </p>
              </div>
              <Button href={whatsappHref} external variant="whatsapp" className="mt-6 w-fit">
                <WhatsappIcon className="h-4 w-4" />
                Hablemos
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ POR QUÉ MRB ============ */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              align="left"
              kicker="Por qué elegirnos"
              title="Un solo estudio para toda tu gestión empresarial"
              subtitle="Dejá de coordinar entre contador, gestor y abogado. En MRB integramos todo con estándares profesionales y trato cercano."
            />
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
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

      {/* ============ PROCESO ============ */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            kicker="Cómo trabajamos"
            title="Un proceso simple y transparente"
            subtitle="Desde la primera consulta hasta el acompañamiento mensual, sabés exactamente qué esperar."
          />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.n}
                className="relative rounded-2xl border border-slate-200 bg-white p-7"
              >
                <span className="font-display text-4xl text-accent/30">{step.n}</span>
                <h3 className="font-display mt-3 text-lg text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============ STATS ============ */}
      <section className="bg-navy-900">
        <Container className="py-16">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display block text-4xl text-white sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-sm text-slate-400">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ============ NOSOTROS TEASER ============ */}
      <Section tone="light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
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
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Trato directo y personalizado",
                "Información clara, sin tecnicismos",
                "Tecnología y procesos al día",
                "Confidencialidad y compromiso",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-surface p-5"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-navy-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ FAQ ============ */}
      <Section id="faq" tone="surface">
        <Container>
          <SectionHeading
            kicker="Preguntas frecuentes"
            title="Respuestas claras antes de empezar"
          />
          <div className="mt-12">
            <Faq items={homeFaqs} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
