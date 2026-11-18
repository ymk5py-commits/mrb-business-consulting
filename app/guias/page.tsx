import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, Section, JsonLd } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { heroImages } from "@/lib/hero-images";
import { guides } from "@/lib/guides";
import { pageMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guías Contables y Societarias para Paraguay | MRB",
  absoluteTitle: true,
  description:
    "Guías claras de MRB Business Consulting para abrir y llevar tu empresa en Paraguay: sociedades, impuestos ante la DNIT, IPS y trámites, paso a paso y al día.",
  path: "/guias",
});

const monthYear = (iso: string) =>
  new Intl.DateTimeFormat("es-PY", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

export default function GuiasPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Guías", path: "/guias" },
          ]),
          webPageSchema({
            type: "CollectionPage",
            path: "/guias",
            name: "Guías para tu empresa en Paraguay",
            description:
              "Guías de MRB Business Consulting sobre sociedades, impuestos y trámites en Paraguay.",
          }),
        ]}
      />

      <HeroSection image={heroImages.office}>
        <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Guías" }]} />
          <h1 className="font-display mt-8 max-w-3xl text-balance text-4xl leading-tight text-paper sm:text-5xl">
            Guías para tu empresa en Paraguay
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300">
            Lo que preguntan nuestros clientes, explicado paso a paso: cómo abrir una empresa,
            qué impuestos te tocan y qué trámites vienen después.
          </p>
        </Container>
      </HeroSection>

      <Section tone="light">
        <Container>
          <ul className="max-w-3xl">
            {guides.map((g) => (
              <li key={g.slug} className="border-t border-rule last:border-b">
                <Link
                  href={`/guias/${g.slug}`}
                  className="group grid gap-2 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                >
                  <h2 className="font-display flex items-center gap-2 text-2xl text-navy-900 transition-colors group-hover:text-accent-600">
                    {g.title}
                    <ArrowRight
                      className="h-5 w-5 shrink-0 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="text-base leading-relaxed text-slate-600">{g.excerpt}</p>
                  <p className="text-sm text-slate-500">
                    Revisada en <time dateTime={g.updatedAt}>{monthYear(g.updatedAt)}</time>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
