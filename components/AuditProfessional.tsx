import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { gabriela } from "@/lib/team";

const specialties = [
  "Auditoría de estados contables",
  "Auditoría externa impositiva",
  "Outsourcing contable",
  "Due diligence",
  "Auditoría de controles internos",
  "Consultoría impositiva",
];

export function AuditProfessional() {
  return (
    <Section tone="surface" id="profesional">
      <Container>
        <article className="overflow-hidden rounded-3xl border border-rule bg-paper lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <div className="relative aspect-[3/4] lg:aspect-auto">
            <Image src={gabriela.photo!} alt="C.P. Gabriela Duarte Toñanez, profesional de auditoría y consultoría de MRB" fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" style={{ objectPosition: gabriela.photoPosition }} />
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-sm font-semibold text-accent-600">Contabilidad integral y auditoría</p>
            <h2 className="font-display mt-2 text-3xl text-navy-900 sm:text-4xl">C.P. {gabriela.name}</h2>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-navy-900">Auditor externo impositivo habilitado por la DNIT · Registro N.º 363/2022<br />REPSE N.º 010107</p>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{gabriela.bio}</p>
            <h3 className="mt-7 text-sm font-semibold text-navy-900">Formación profesional</h3>
            <ul className="mt-3 grid gap-3">
              {gabriela.credentials?.map((credential) => (
                <li key={credential.title}>
                  <p className="text-sm font-medium text-navy-900">{credential.title}</p>
                  <p className="text-sm text-slate-600">{credential.detail}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 text-sm font-semibold text-navy-900">Áreas de experiencia</h3>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {specialties.map((specialty) => <li key={specialty}>{specialty}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">Experiencia en empresas nacionales e internacionales de servicios, industria, automotor e importación.</p>
          </div>
        </article>
      </Container>
    </Section>
  );
}
