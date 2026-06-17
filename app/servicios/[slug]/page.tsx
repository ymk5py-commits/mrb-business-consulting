import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { WhatsappIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getService, serviceSlugs } from "@/lib/services";
import { site, whatsappHref } from "@/lib/site.config";
import {
  pageMetadata,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const base = pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/servicios/${slug}`,
  });
  return { ...base, title: { absolute: service.metaTitle } };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = service.related
    .map((s) => getService(s))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.metaDescription,
            path: `/servicios/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
            { name: service.title, path: `/servicios/${service.slug}` },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      {/* HERO */}
      <section className="bg-linear-to-br from-navy-950 via-navy-900 to-navy-800">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Inicio", href: "/" },
              { name: "Servicios", href: "/servicios" },
              { name: service.title },
            ]}
          />
          <Reveal>
            <div className="mt-8 flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-bright ring-1 ring-white/15">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                {service.kicker}
              </span>
            </div>
            <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {service.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappHref} external variant="whatsapp" size="lg">
                <WhatsappIcon className="h-5 w-5" />
                Consultá por este servicio
              </Button>
              <Button href="/servicios" variant="white" size="lg">
                <ArrowLeft className="h-5 w-5" />
                Todos los servicios
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CONTENIDO */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-14">
            {/* Main */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">
                  Qué incluye este servicio
                </h2>
              </Reveal>
              <Stagger className="mt-7 grid gap-4 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <StaggerItem key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal>
                <div className="mt-10 rounded-2xl border border-slate-200 bg-surface p-7">
                  <h3 className="font-display text-lg text-navy-900">¿Para quién es?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.forWho}
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display mt-14 text-2xl text-navy-900 sm:text-3xl">
                  Por qué con MRB
                </h2>
              </Reveal>
              <Stagger className="mt-7 grid gap-6 sm:grid-cols-3">
                {service.highlights.map((h) => (
                  <StaggerItem key={h.title} className="h-full">
                    <div className="h-full rounded-2xl border border-slate-200 p-6">
                      <h3 className="font-display text-base text-navy-900">{h.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Aside CTA (sticky) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-navy-900 p-7 text-white">
                <h3 className="font-display text-xl">Consulta sin compromiso</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Contanos tu caso y te asesoramos sobre {service.title.toLowerCase()} para
                  tu empresa.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={whatsappHref} external variant="whatsapp" className="w-full">
                    <WhatsappIcon className="h-4 w-4" />
                    Escribir por WhatsApp
                  </Button>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                  >
                    <Phone className="h-4 w-4" />
                    {site.contact.phone}
                  </a>
                </div>
                <p className="mt-5 text-xs text-slate-400">
                  Horario de atención: {site.contact.hours}
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            kicker="Preguntas frecuentes"
            title={`Sobre ${service.title.toLowerCase()}`}
          />
          <div className="mt-12">
            <Faq items={service.faqs} />
          </div>
        </Container>
      </Section>

      {/* Relacionados */}
      {related.length > 0 && (
        <Section tone="light">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">
                  Servicios relacionados
                </h2>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-600"
                >
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(
                (s) =>
                  s && (
                    <StaggerItem key={s.slug} className="h-full">
                      <ServiceCard service={s} />
                    </StaggerItem>
                  ),
              )}
            </Stagger>
          </Container>
        </Section>
      )}

      <CtaBand title={`¿Necesitás ${service.title.toLowerCase()}?`} />
    </>
  );
}
