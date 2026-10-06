import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, JsonLd, Button } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { professionals, professionalPath, gabriela, payrollProfessional } from "@/lib/team";
import { absoluteUrl, pageMetadata, breadcrumbSchema, webPageSchema, personSchema, personId } from "@/lib/seo";
import { whatsappLink } from "@/lib/site.config";

export function generateStaticParams() { return professionals.map((member) => ({ slug: member.slug! })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = professionals.find((p) => p.slug === slug);
  if (!member) return {};
  const meta = pageMetadata({ title: `${member.name} — ${member.role}`, description: member.bio, path: professionalPath(member) });
  return { ...meta, openGraph: { ...meta.openGraph, images: [{ url: absoluteUrl(member.photo!), alt: member.name }] }, twitter: { ...meta.twitter, images: [absoluteUrl(member.photo!)] } };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = professionals.find((p) => p.slug === slug);
  if (!member) notFound();
  const path = professionalPath(member);
  const service = member === gabriela ? { path: "/servicios/auditoria-consultoria", title: "Auditoría y consultoría" }
    : member === payrollProfessional ? { path: "/servicios/asesoria-laboral-ips", title: "Payroll y asesoría laboral" }
    : { path: "/servicios/contabilidad", title: "Contabilidad para empresas" };
  return <>
    <JsonLd data={[
      personSchema(member),
      webPageSchema({ type: "ProfilePage", path, name: member.name, description: member.bio, mainEntityId: personId(member) }),
      breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Equipo", path: "/equipo" }, { name: member.name, path }]),
    ]} />
    <section className="bg-navy-950"><Container className="pb-8 pt-28 sm:pt-32"><Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Equipo", href: "/equipo" }, { name: member.name }]} /></Container></section>
    <Section tone="surface"><Container>
      <article className="overflow-hidden rounded-3xl border border-rule bg-paper lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <div className="relative aspect-[3/4] lg:aspect-auto">
          <Image src={member.photo!} alt={member.name} fill priority sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" style={{ objectPosition: member.photoPosition }} />
        </div>
        <div className="p-6 sm:p-10">
          <p className="text-sm font-semibold text-accent-600">{member.role}</p>
          <h1 className="font-display mt-2 text-3xl text-navy-900 sm:text-4xl">{member.name}</h1>
          <p className="mt-3 text-sm font-semibold text-navy-900">{member.headline}</p>
          {member === gabriela && <p className="mt-4 text-sm leading-relaxed text-navy-900">Auditor externo impositivo habilitado por la DNIT · Registro N.º 363/2022<br />REPSE N.º 010107</p>}
          <p className="mt-6 leading-relaxed text-slate-600">{member.bio}</p>
          <h2 className="font-display mt-8 text-xl text-navy-900">Formación profesional</h2>
          <ul className="mt-4 space-y-4">{member.credentials?.map((credential) => <li key={credential.title}>
            <p className="text-sm font-semibold text-navy-900">{credential.title}</p><p className="mt-1 text-sm text-slate-600">{credential.detail}</p>
          </li>)}</ul>
          <h2 className="font-display mt-8 text-xl text-navy-900">Experiencia en</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{member.sectors?.join(" · ")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href={whatsappLink(`Hola MRB, quisiera consultar por ${service.title.toLowerCase()}.`)} external variant="whatsapp">Consultar con MRB</Button>
            <Link href={service.path} className="text-sm font-semibold text-accent-600 underline underline-offset-4">{service.title}</Link>
          </div>
        </div>
      </article>
    </Container></Section>
  </>;
}
