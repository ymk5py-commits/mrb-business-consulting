import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button, Container, Section, SectionHeading, JsonLd } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { WhatsappIcon } from "@/components/icons";
import { LedgerMotion } from "@/components/motion/LedgerMotion";
import { GuideToc } from "@/components/GuideToc";
import { heroImages } from "@/lib/hero-images";
import { getGuide, guideSlugs, type GuideSection } from "@/lib/guides";
import { getService } from "@/lib/services";
import { director, professionalPath } from "@/lib/team";
import { site, whatsappLink } from "@/lib/site.config";
import {
  pageMetadata,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  personSchema,
  webPageSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.metaTitle,
    absoluteTitle: true,
    description: guide.metaDescription,
    path: `/guias/${slug}`,
  });
}

const monthYear = (iso: string) =>
  new Intl.DateTimeFormat("es-PY", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

/** Prosa de la guía: medida de lectura cómoda (≈68 caracteres). */
const prose = "max-w-[68ch] text-pretty text-base leading-relaxed text-slate-700";

function SectionBody({ section }: { section: GuideSection }) {
  return (
    <>
      {section.paragraphs?.map((p) => (
        <p key={p} className={`mt-4 ${prose}`}>
          {p}
        </p>
      ))}

      {section.list && (
        <ul className="mt-5 grid max-w-[68ch] gap-3">
          {section.list.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.25} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.steps && (
        <LedgerMotion variant="steps">
          <ol data-ledger-trigger className="mt-6 grid max-w-[68ch]">
            {section.steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-5">
                {/* Filete del paso: se traza en orden al entrar en pantalla */}
                <span aria-hidden="true" data-ledger-rule className="absolute inset-x-0 top-0 h-px origin-left bg-rule" />
                <span
                  data-ledger-item
                  className="font-display text-2xl leading-none tabular-nums text-accent-600"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div data-ledger-item>
                  <h3 className="font-display text-lg text-navy-900">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-slate-700">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </LedgerMotion>
      )}

      {section.table && (
        // En el celular, una ficha por columna (E.A.S., S.A., S.R.L.): la tabla entera no entra
        // y obligaba a recordar columnas que no se veían.
        <div className="mt-6 grid gap-8 md:hidden">
          {section.table.columns.slice(1).map((col, c) => (
            <div key={col}>
              <h3 className="font-display border-b border-navy-900/20 pb-2 text-lg text-navy-900">
                {col}
              </h3>
              <dl>
                {section.table!.rows.map(([label, ...cells]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-4 border-b border-rule py-3 text-sm"
                  >
                    <dt className="font-semibold text-navy-900">{label}</dt>
                    <dd className="leading-relaxed text-slate-700">{cells[c]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}

      {section.table && (
        // Desde tablet, la tabla completa; si igual no entra, se desplaza dentro de su caja.
        <div
          className="mt-6 hidden overflow-x-auto md:block"
          role="region"
          aria-label={section.table.caption}
          tabIndex={0}
        >
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">{section.table.caption}</caption>
            <thead>
              <tr className="border-b border-navy-900/20">
                {section.table.columns.map((col, i) => (
                  <th
                    key={col || i}
                    scope="col"
                    className="py-3 pr-4 font-display text-base font-semibold text-navy-900"
                  >
                    {col || <span className="sr-only">Característica</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map(([label, ...cells]) => (
                <tr key={label} className="border-b border-rule align-top">
                  <th scope="row" className="py-3.5 pr-4 font-semibold text-navy-900">
                    {label}
                  </th>
                  {cells.map((cell, i) => (
                    <td key={i} className="py-3.5 pr-4 leading-relaxed text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guias/${guide.slug}`;
  const author = director;
  const waHref = whatsappLink(`Hola ${site.name}, leí la guía «${guide.title}» y quisiera consultar mi caso.`);
  const related = guide.relatedServices.map((s) => getService(s)).filter((s) => s !== undefined);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            path,
            headline: guide.h1,
            description: guide.metaDescription,
            dateModified: guide.updatedAt,
            author,
          }),
          personSchema(author),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Guías", path: "/guias" },
            { name: guide.title, path },
          ]),
          webPageSchema({
            path,
            name: guide.metaTitle,
            description: guide.metaDescription,
            mainEntityId: `${site.url}${path}#article`,
            dateModified: guide.updatedAt,
          }),
          faqSchema(guide.faqs),
        ]}
      />

      <HeroSection image={heroImages.legal}>
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs
            items={[
              { name: "Inicio", href: "/" },
              { name: "Guías", href: "/guias" },
              { name: guide.title },
            ]}
          />
          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl leading-tight text-paper sm:text-5xl">
            {guide.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300">{guide.intro}</p>
          {/* Quién la escribe (E-E-A-T) + fecha de revisión */}
          <p className="mt-6 flex max-w-2xl items-center gap-3 text-sm leading-snug text-slate-300">
            {(author.avatar ?? author.photo) && (
              <Image
                src={(author.avatar ?? author.photo)!}
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full object-cover ring-2 ring-paper/20"
                style={{ objectPosition: author.photoPosition }}
              />
            )}
            <span>
              Escrita por{" "}
              <Link
                href={professionalPath(author)}
                className="rounded-sm font-semibold text-paper underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
              >
                {author.name}
              </Link>
              {author.headline && `, ${author.headline.replace(/^Licenciado en/, "Lic. en")}`}
              <span className="text-slate-400">
                {" "}
                · Revisada en <time dateTime={guide.updatedAt}>{monthYear(guide.updatedAt)}</time>
              </span>
            </span>
          </p>
        </Container>
      </HeroSection>

      <Section tone="light">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <article className="min-w-0">
            {/* En el celular el índice va arriba y plegado (en escritorio está al costado) */}
            <details className="group mb-10 border-y border-rule lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                En esta guía
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-accent-600 transition-transform duration-300 ease-[var(--ease-out-soft)] group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <ol className="grid gap-1 pb-4 text-sm">
                {guide.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-11 items-center rounded-sm text-slate-700 hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {guide.sections.map((section, i) => (
              <section key={section.id} id={section.id} className={i > 0 ? "mt-14" : undefined}>
                <h2 className="font-display text-balance text-2xl text-navy-900 sm:text-3xl">
                  {section.title}
                </h2>
                <SectionBody section={section} />
                {/* Después de los pasos, la consulta en línea (en el celular el aside queda al final) */}
                {section.steps && (
                  <div className="mt-8 flex max-w-[68ch] flex-col gap-4 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-base leading-relaxed text-navy-900">
                      ¿Preferís que lo hagamos nosotros, de principio a fin?
                    </p>
                    <Button href={waHref} external variant="whatsapp" className="shrink-0">
                      <WhatsappIcon className="h-4 w-4" />
                      Consultá tu caso
                    </Button>
                  </div>
                )}
              </section>
            ))}
            <p className="mt-14 max-w-[60ch] border-t border-rule pt-6 text-sm leading-relaxed text-slate-600">
              Esta guía es informativa y resume la normativa vigente a la fecha de revisión. Requisitos,
              plazos y costos pueden cambiar: antes de constituir, consultá tu caso con un profesional.
            </p>
          </article>

          {/* Índice + consulta (fijos al costado en pantallas grandes) */}
          <aside className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <nav aria-label="En esta guía" className="hidden border-t border-rule pt-5 lg:block">
                <p className="text-sm font-semibold text-navy-900">En esta guía</p>
                <GuideToc sections={guide.sections.map(({ id, title }) => ({ id, title }))} />
              </nav>
              <div className="rounded-2xl bg-navy-900 p-6 text-paper lg:mt-8">
                <p className="font-display text-lg">¿Lo hacemos por vos?</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Constituimos tu empresa de principio a fin y la dejamos lista para facturar.
                </p>
                <Button href={waHref} external variant="whatsapp" className="mt-5 w-full">
                  <WhatsappIcon className="h-4 w-4" />
                  Consultá tu caso
                </Button>
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      <Section tone="surface" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading title="Preguntas frecuentes" subtitle={`Sobre ${guide.title.replace(/^Cómo /, "cómo ")}.`} />
          </div>
          <Faq items={guide.faqs} />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="light">
          <Container>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">Servicios relacionados</h2>
            <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <div key={s.slug} className="h-full">
                  <ServiceCard service={s} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand title="¿Querés abrir tu empresa?" whatsapp={waHref} />
    </>
  );
}
