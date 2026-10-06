import { HeroSection } from "@/components/HeroSection";
import { heroImages } from "@/lib/hero-images";
import Image from "next/image";
import Link from "next/link";
import { Container, Section, JsonLd } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { professionals, professionalPath } from "@/lib/team";
import { pageMetadata, breadcrumbSchema, webPageSchema, absoluteUrl, personId, teamSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Equipo de contabilidad, auditoría y Payroll",
  description: "Conocé a Manuel Rolón, Gabriela Duarte Toñanez y María Ernestina Argüello: profesionales de contabilidad, auditoría y Payroll de MRB en Paraguay.",
  path: "/equipo",
});

export default function EquipoPage() {
  return <>
    <JsonLd data={[
      ...teamSchema(),
      breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Equipo", path: "/equipo" }]),
      webPageSchema({ type: "CollectionPage", path: "/equipo", name: "Equipo profesional de MRB" }),
      { "@context": "https://schema.org", "@type": "ItemList", itemListElement: professionals.map((member, index) => ({
        "@type": "ListItem", position: index + 1, url: absoluteUrl(professionalPath(member)), name: member.name, item: { "@id": personId(member) },
      })) },
    ]} />
    <HeroSection image={heroImages.office}>
      <Container className="pb-16 pt-28 sm:pt-32">
        <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Equipo" }]} />
        <h1 className="font-display mt-6 text-4xl sm:text-5xl">Conocé al equipo de MRB</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">Experiencia en contabilidad, auditoría y gestión de personas para acompañar a tu empresa en Paraguay.</p>
      </Container>
    </HeroSection>
    <Section tone="light"><Container className="grid gap-8 md:grid-cols-3">
      {professionals.map((member) => <article key={member.slug}>
        <Link href={professionalPath(member)} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-accent">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
            <Image src={member.photo!} alt={member.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" style={{ objectPosition: member.photoPosition }} />
          </div>
          <h2 className="font-display mt-5 text-2xl text-navy-900 group-hover:text-accent-600">{member.name}</h2>
          <p className="mt-2 text-sm font-semibold text-accent-600">{member.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
          <p className="mt-4 text-sm font-semibold text-navy-900 underline underline-offset-4">Ver perfil profesional</p>
        </Link>
      </article>)}
    </Container></Section>
  </>;
}
