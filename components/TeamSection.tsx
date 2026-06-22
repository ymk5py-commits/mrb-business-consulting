/* ============================================================
 * components/TeamSection.tsx — sección "Nuestro equipo" de /nosotros.
 * Server Component (el "use client" lo aporta <Tilt>). Sin deps nuevas.
 * Los datos viven en lib/team.ts (editá ahí el equipo y las fotos).
 * ============================================================ */
import Image from "next/image";
import { Mail } from "lucide-react";
import { Container, Section, SectionHeading, JsonLd, cn } from "@/components/ui";
import { LinkedinIcon } from "@/components/icons";
import { Tilt } from "@/components/Tilt";
import { team, getInitials, gradientFor, type TeamMember } from "@/lib/team";
import { site } from "@/lib/site.config";
import { absoluteUrl } from "@/lib/seo";

const ORG_ID = `${site.url}/#organization`;

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
          alt={`${member.name}, ${member.role} en ${site.name}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${member.name}, ${member.role}`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-linear-to-br",
        gradientFor(member.name),
        aspect,
        className,
      )}
    >
      {/* Brillo radial: evita el degradé plano */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(115%_85%_at_80%_12%,rgba(5,151,242,0.40),transparent_55%)]"
      />
      {/* Silueta de hombros: da volumen */}
      <svg
        aria-hidden
        viewBox="0 0 100 125"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 size-full text-white/10"
      >
        <circle cx="50" cy="46" r="20" fill="currentColor" />
        <path d="M14 125c0-22 16-38 36-38s36 16 36 38z" fill="currentColor" />
      </svg>
      <span
        className={cn(
          "font-display relative font-medium tracking-tight text-white/90",
          initialsClass,
        )}
      >
        {getInitials(member.name)}
      </span>
    </div>
  );
}

/* ---- Redes (LinkedIn de marca + email); SIEMPRE visibles (táctil) ---- */
function Socials({ member, size = "md" }: { member: TeamMember; size?: "md" | "sm" }) {
  if (!member.linkedin && !member.email) return null;
  const base =
    "inline-flex items-center justify-center rounded-xl bg-surface text-navy-900 ring-1 ring-slate-200 transition hover:bg-navy-900 hover:text-white hover:ring-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const box = size === "md" ? "size-11" : "size-9";
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

/* ---- JSON-LD: un Person por miembro, vinculado al #organization ---- */
function teamSchema() {
  return team.map((m, i) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl("/nosotros")}#person-${i}`,
    name: m.name,
    jobTitle: m.role,
    worksFor: { "@id": ORG_ID },
    ...(m.director ? { founder: { "@id": ORG_ID } } : { memberOf: { "@id": ORG_ID } }),
    ...(m.photo ? { image: absoluteUrl(m.photo) } : {}),
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    ...(m.email ? { email: m.email } : {}),
  }));
}

export function TeamSection() {
  const director = team.find((m) => m.director) ?? team[0]!;
  const members = team.filter((m) => m !== director);

  return (
    <Section tone="surface" id="equipo">
      <JsonLd data={teamSchema()} />
      <Container>
        {/* Cabecera */}
        <div data-gsap="reveal">
          <SectionHeading
            align="left"
            kicker="Nuestro equipo"
            title="Conocé a quienes están detrás de MRB"
            subtitle="Contadores y asesores que dominan el marco normativo paraguayo —la DNIT, el IPS, los Registros Públicos— y se ocupan de tu empresa como si fuera propia."
          />
        </div>

        {/* Director destacado */}
        <div data-gsap="reveal" className="mt-12">
          <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid lg:grid-cols-[minmax(0,22rem)_1fr]">
            <Tilt max={6} className="relative">
              <Avatar
                member={director}
                ratio="portrait"
                initialsClass="text-4xl sm:text-5xl"
                sizes="(min-width: 1024px) 22rem, 100vw"
                priority
                className="size-full"
              />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Director
              </span>
            </Tilt>

            <div className="relative p-6 sm:p-10">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent to-accent-bright"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-600">
                {director.role}
              </p>
              <h3 className="font-display mt-2 text-2xl text-navy-900 sm:text-3xl">
                {director.name}
              </h3>
              <p className="font-serif mt-4 max-w-xl text-base italic leading-relaxed text-slate-600 sm:text-lg">
                {director.bio}
              </p>
              <div className="mt-6">
                <Socials member={director} size="md" />
              </div>
            </div>
          </article>
        </div>

        {/* Grilla de miembros (stagger) */}
        <div data-gsap="stagger" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <article
              key={`${m.name}-${m.role}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_-24px_rgba(0,17,37,0.45)] focus-within:-translate-y-1 focus-within:border-slate-300 focus-within:shadow-[0_18px_40px_-24px_rgba(0,17,37,0.45)] motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0"
            >
              <Avatar
                member={m}
                ratio="square"
                initialsClass="text-3xl"
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 45vw, 100vw"
                className="rounded-xl"
              />
              <h3 className="font-display mt-5 text-lg text-navy-900">{m.name}</h3>
              <p className="mt-1 text-sm font-semibold text-accent-600">{m.role}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{m.bio}</p>
              <div className="mt-5 pt-1">
                <Socials member={m} size="sm" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
