import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { payrollProfessional as member, professionalPath } from "@/lib/team";

const specialties = [
  "Estructuración de áreas de Recursos Humanos",
  "Gestión estratégica de talento humano",
  "Transformación organizacional",
  "Implementación de sistemas ISO",
];

export function PayrollProfessional() {
  return (
    <Section tone="surface" id="profesional">
      <Container>
        <article className="overflow-hidden rounded-3xl border border-rule bg-paper lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <div className="relative aspect-[3/4] lg:aspect-auto">
            <Image
              src={member.photo!}
              alt="María Ernestina Argüello Aguilera, profesional de Payroll y gestión de talento humano de MRB"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
              style={{ objectPosition: member.photoPosition }}
            />
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-sm font-semibold text-accent-600">Payroll y gestión de talento humano</p>
            <h2 className="font-display mt-2 text-3xl text-navy-900 sm:text-4xl">{member.name}</h2>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-navy-900">{member.headline}</p>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{member.bio}</p>
            <h3 className="mt-7 text-sm font-semibold text-navy-900">Formación profesional</h3>
            <ul className="mt-3 grid gap-3">
              {member.credentials?.map((credential) => (
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
            <h3 className="mt-7 text-sm font-semibold text-navy-900">Sectores</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.sectors?.join(" · ")}</p>
            <Link href={professionalPath(member)} className="mt-6 inline-block text-sm font-semibold text-accent-600 underline underline-offset-4">Ver perfil profesional</Link>
          </div>
        </article>
      </Container>
    </Section>
  );
}
