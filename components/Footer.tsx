import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { socialIcons } from "./icons";
import { site, navLinks, addressLine, mapsHref, socialLinks } from "@/lib/site.config";
import { services } from "@/lib/services";

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <Logo variant="white" className="h-12" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              {site.description}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((s) => {
                  const Icon = socialIcons[s.network];
                  return (
                    <SocialLink key={s.network} href={s.href} label={s.label}>
                      <Icon className="h-5 w-5" />
                    </SocialLink>
                  );
                })}
              </div>
            )}
          </div>

          {/* Servicios */}
          <FooterCol title="Servicios">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/servicios/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Empresa */}
          <FooterCol title="Empresa">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Contacto */}
          <FooterCol title="Contacto">
            <ContactItem icon={<MapPin className="h-4 w-4" />}>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={footerLink}>
                {addressLine}
              </a>
            </ContactItem>
            <ContactItem icon={<Phone className="h-4 w-4" />}>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={footerLink}>
                {site.contact.phone}
              </a>
            </ContactItem>
            {site.contact.email && (
              <ContactItem icon={<Mail className="h-4 w-4" />}>
                <a href={`mailto:${site.contact.email}`} className={`${footerLink} break-all`}>
                  {site.contact.email}
                </a>
              </ContactItem>
            )}
            <ContactItem icon={<Clock className="h-4 w-4" />}>
              {site.contact.hours}
            </ContactItem>
          </FooterCol>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">
              © {year} {site.legalName}. Todos los derechos reservados.
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-slate-400">
              La información de este sitio es de carácter general e informativo y no
              constituye asesoramiento legal, contable o tributario vinculante.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/** Links del footer: hover + foco visible sobre fondo navy */
const footerLink =
  "rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className={`text-sm text-slate-400 ${footerLink}`}>
        {children}
      </Link>
    </li>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-slate-400">
      <span className="mt-0.5 text-accent-bright">{icon}</span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
    >
      {children}
    </a>
  );
}
