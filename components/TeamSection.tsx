/* ============================================================
 * components/TeamSection.tsx — ficha profesional de /nosotros.
 * Server Component, sin animaciones.
 * Los datos viven en lib/team.ts (editá ahí el equipo y las fotos).
 * ============================================================ */
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button, Container, Section, SectionHeading, JsonLd, cn } from "@/components/ui";
import { LinkedinIcon, WhatsappIcon } from "@/components/icons";
import {
  professionals,
  director,
  getInitials,
  CREDENTIAL_ICONS,
  type TeamMember,
  professionalPath,
} from "@/lib/team";
import { site, whatsappHref } from "@/lib/site.config";
import { teamSchema } from "@/lib/seo";


/* ---- Avatar: next/image si hay foto; placeholder branded si no ---- */
function Avatar({
  member,
  ratio,
  initialsClass,
  sizes,
  priority,
  className,
}: {
  member: TeamMember;
  ratio: "portrait" | "square";
  initialsClass: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const aspect = ratio === "portrait" ? "aspect-[4/5]" : "aspect-square";

  if (member.photo) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", aspect, className)}>
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role} de ${site.name}`}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: member.photoPosition }}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${member.name}, ${member.role}`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-navy-900",
        aspect,
        className,
      )}
    >
      {/* Silueta de hombros: da volumen */}
      <svg
        aria-hidden
        viewBox="0 0 100 125"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 size-full text-paper/10"
      >
        <circle cx="50" cy="46" r="20" fill="currentColor" />
        <path d="M14 125c0-22 16-38 36-38s36 16 36 38z" fill="currentColor" />
      </svg>
      <span
        className={cn(
          "font-display relative font-medium tracking-tight text-paper/90",
          initialsClass,
        )}
      >
        {getInitials(member.name)}
      </span>
    </div>
  );
}

/* ---- Contacto profesional, si existe un enlace verificado ---- */
function Socials({ member, size = "md" }: { member: TeamMember; size?: "md" | "sm" }) {
  if (!member.linkedin && !member.email) return null;
  const base =
    "inline-flex items-center justify-center rounded-xl bg-surface text-navy-900 ring-1 ring-rule transition hover:bg-navy-900 hover:text-paper hover:ring-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const box = size === "md" ? "size-11" : "size-10";
  const icon = size === "md" ? "size-5" : "size-4";
  return (
    <div className="flex items-center gap-2">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Perfil de LinkedIn de ${member.name}`}
          className={cn(base, box)}
        >
          <LinkedinIcon className={icon} />
        </a>
      )}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          aria-label={`Escribir un correo a ${member.name}`}
          className={cn(base, box)}
        >
          <Mail className={icon} strokeWidth={1.75} />
        </a>
      )}
    </div>
  );
}

export function TeamSection() {
  const members = professionals.filter((m) => m !== director);
  const firstName = director.name.split(" ")[0];

  return (
    <Section tone="surface" id="equipo">
      <JsonLd data={teamSchema()} />
      <Container>
        {/* Cabecera */}
        <div>
          <SectionHeading
            title="Conocé a quienes están detrás de MRB"
            subtitle="Contabilidad, auditoría y Payroll: profesionales que acompañan la gestión de tu empresa en Paraguay."
          />
        </div>

        {/* Director destacado */}
        <div className="mt-12">
          <article className="overflow-hidden rounded-3xl border border-rule bg-paper lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
            <div className="relative">
              <Avatar
                member={director}
                ratio="portrait"
                initialsClass="text-4xl sm:text-5xl"
                sizes="(min-width: 1024px) 24rem, 100vw"
                priority
                className="size-full"
              />
            </div>

            <div className="flex min-w-0 flex-col p-6 sm:p-10 xl:p-12">
              <p className="text-sm font-semibold text-accent-600">
                {director.role} de {site.shortName}
              </p>
              <h3 className="font-display mt-2 text-3xl text-navy-900 sm:text-4xl">
                {director.name}
              </h3>
              {director.headline && (
                <p className="mt-2 text-base text-slate-600">{director.headline}</p>
              )}

              {director.quote ? (
                <blockquote className="mt-7 max-w-2xl border-l-2 border-rule pl-5">
                  <p className="font-serif text-lg italic leading-relaxed text-navy-900 sm:text-xl">
                    “{director.quote}”
                  </p>
                </blockquote>
              ) : (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
                  {director.bio}
                </p>
              )}

              {director.credentials && director.credentials.length > 0 && (
                <ul className="mt-8 grid gap-4">
                  {director.credentials.map((c) => {
                    const Icon = CREDENTIAL_ICONS[c.kind];
                    return (
                      <li key={c.title} className="flex gap-3">
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-rule">
                          <Icon className="size-5" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug text-navy-900">
                            {c.title}
                          </p>
                          {c.detail && (
                            <p className="mt-0.5 text-sm leading-snug text-slate-600">
                              {c.detail}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {director.sectors && director.sectors.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm font-semibold text-slate-500">Experiencia en</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {director.sectors.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface px-3 py-1 text-sm text-navy-900 ring-1 ring-rule"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-5 pt-9">
                {director.years && (
                  <p className="flex items-center gap-3">
                    <span className="font-display text-4xl leading-none tabular-nums text-navy-900">
                      +{director.years}
                    </span>
                    <span className="text-sm leading-tight text-slate-600">
                      años de
                      <br />
                      experiencia
                    </span>
                  </p>
                )}
                <Button href={whatsappHref} external variant="whatsapp">
                  <WhatsappIcon className="h-4 w-4" />
                  Hablar con {firstName}
                </Button>
                <Socials member={director} size="md" />
                <Link href={professionalPath(director)} className="text-sm font-semibold text-accent-600 underline underline-offset-4">Ver perfil profesional</Link>
              </div>
            </div>
          </article>
        </div>

        {/* Grilla de miembros (stagger) */}
        {members.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {members.map((m) => (
              <article
                key={`${m.name}-${m.role}`}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-rule bg-paper"
              >
                <Avatar
                  member={m}
                  ratio="portrait"
                  initialsClass="text-3xl"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="font-display text-2xl text-navy-900">{m.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-600">{m.role}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{m.bio}</p>
                {m.headline && <p className="mt-4 text-sm leading-relaxed text-slate-600">{m.headline}</p>}
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                  <Link href={professionalPath(m)} className="rounded-sm text-sm font-semibold text-accent-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent">Ver perfil profesional</Link>
                  <Socials member={m} size="sm" />
                </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
