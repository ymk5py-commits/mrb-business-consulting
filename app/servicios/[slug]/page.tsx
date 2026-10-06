import { HeroSection } from "@/components/HeroSection";
import { heroImages, serviceHeroImages } from "@/lib/hero-images";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { WhatsappIcon } from "@/components/icons";
import { getService, serviceSlugs, SERVICES_UPDATED_AT } from "@/lib/services";
import { director, gabriela, payrollProfessional, professionalPath } from "@/lib/team";
import { AuditProfessional } from "@/components/AuditProfessional";
import { PayrollProfessional } from "@/components/PayrollProfessional";
import { site, whatsappLink, clientStats } from "@/lib/site.config";
import {
  pageMetadata,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
  serviceId,
} from "@/lib/seo";

/** "septiembre de 2026" — fecha visible de la última actualización del contenido. */
const updatedLabel = new Intl.DateTimeFormat("es-PY", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(SERVICES_UPDATED_AT));

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
  const professional = slug === "auditoria-consultoria"
    ? gabriela
    : slug === "asesoria-laboral-ips" ? payrollProfessional : director;

  // El mensaje de WhatsApp ya dice qué servicio se consulta (lead mejor calificado).
  const waHref = whatsappLink(
    `Hola ${site.name}, quisiera consultar por el servicio de ${service.title.toLowerCase()}.`,
  );
  const related = service.related
    .map((s) => getService(s))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            slug: service.slug,
            name: service.title,
            description: service.metaDescription,
          }),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
            { name: service.title, path: `/servicios/${service.slug}` },
          ]),
          webPageSchema({
            path: `/servicios/${service.slug}`,
            name: service.metaTitle,
            description: service.metaDescription,
            mainEntityId: serviceId(service.slug),
            dateModified: SERVICES_UPDATED_AT,
          }),
          faqSchema(service.faqs),
        ]}
      />

      {/* HERO */}
      <HeroSection image={serviceHeroImages[service.slug] ?? heroImages.office}>
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs
            items={[
              { name: "Inicio", href: "/" },
              { name: "Servicios", href: "/servicios" },
              { name: service.title },
            ]}
          />
          <div>
            <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl leading-tight text-paper sm:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {service.intro}
            </p>
            {/* Quién está a cargo (E-E-A-T) + fecha de actualización */}
            <p className="mt-6 flex max-w-2xl items-center gap-3 text-sm leading-snug text-slate-300">
              {(professional.avatar ?? professional.photo) && (
                <Image
                  src={(professional.avatar ?? professional.photo)!}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-full object-cover ring-2 ring-paper/20"
                  style={{ objectPosition: professional.photoPosition }}
                />
              )}
              <span>
                Servicio a cargo de{" "}
                <Link
                  href={professionalPath(professional)}
                  className="rounded-sm font-semibold text-paper underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
                >
                  {professional.name}
                </Link>
                {professional.headline && `, ${professional.headline.replace(/^Licenciado en/, "Lic. en")}`}
                <span className="text-slate-400">
                  {" "}
                  · Actualizado en <time dateTime={SERVICES_UPDATED_AT}>{updatedLabel}</time>
                </span>
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={waHref} external variant="whatsapp" size="lg">
                <WhatsappIcon className="h-5 w-5" />
                Consultá por este servicio
              </Button>
              <Button href="/servicios" variant="white" size="lg">
                <ArrowLeft className="h-5 w-5" />
                Todos los servicios
              </Button>
            </div>
          </div>
        </Container>
      </HeroSection>

      {/* CONTENIDO */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-14">
            {/* Main */}
            <div className="lg:col-span-2">
              <div>
                <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">
                  Qué incluye este servicio
                </h2>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" strokeWidth={2} />
                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="mt-10 border-l-2 border-rule pl-6">
                  <h3 className="font-display text-lg text-navy-900">¿Para quién es?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.forWho}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display mt-14 text-2xl text-navy-900 sm:text-3xl">
                  Por qué con MRB
                </h2>
              </div>
              <ul className="mt-7 grid gap-x-8 sm:grid-cols-3">
                {service.highlights.map((h) => (
                  <li key={h.title} className="border-t border-rule py-5">
                    <h3 className="font-display text-base text-navy-900">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aside CTA (sticky) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-navy-900 p-7 text-paper">
                <h3 className="font-display text-xl">Consulta sin compromiso</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Contanos tu caso y te asesoramos sobre {service.title.toLowerCase()} para
                  tu empresa.
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4">
                  <div>
                    <dt className="text-xs text-slate-400">Clientes</dt>
                    <dd className="font-display text-2xl tabular-nums text-paper">
                      {clientStats.total}
                    </dd>
                  </div>
                  {professional.years && (
                    <div>
                      <dt className="text-xs text-slate-400">Experiencia</dt>
                      <dd className="font-display text-2xl tabular-nums text-paper">
                        +{professional.years} años
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={waHref} external variant="whatsapp" className="w-full">
                    <WhatsappIcon className="h-4 w-4" />
                    Escribir por WhatsApp
                  </Button>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-paper/10 px-5 py-2.5 text-sm font-medium text-paper ring-1 ring-paper/15 transition-colors hover:bg-paper/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
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

      {slug === "auditoria-consultoria" && <AuditProfessional />}
      {slug === "asesoria-laboral-ips" && <PayrollProfessional />}

      {/* FAQ: título | preguntas */}
      <Section tone="surface" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              title="Preguntas frecuentes"
              subtitle={`Sobre ${service.title.toLowerCase()}.`}
            />
          </div>
          <Faq items={service.faqs} />
        </Container>
      </Section>

      {/* Relacionados */}
      {related.length > 0 && (
        <Section tone="light">
          <Container>
            <div>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">
                  Servicios relacionados
                </h2>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-accent-600 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(
                (s) =>
                  s && (
                    <div key={s.slug} className="h-full">
                      <ServiceCard service={s} />
                    </div>
                  ),
              )}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand title={`¿Necesitás ${service.title.toLowerCase()}?`} whatsapp={waHref} />
    </>
  );
}
