import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "./icons";
import { site, navLinks } from "@/lib/site.config";
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
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href={site.social.instagram} label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </SocialLink>
            </div>
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
              {site.contact.address.street}, {site.contact.address.city}
            </ContactItem>
            <ContactItem icon={<Phone className="h-4 w-4" />}>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.contact.phone}
              </a>
            </ContactItem>
            <ContactItem icon={<Mail className="h-4 w-4" />}>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </ContactItem>
            <ContactItem icon={<Clock className="h-4 w-4" />}>
              {site.contact.hours}
            </ContactItem>
          </FooterCol>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              © {year} {site.legalName}. Todos los derechos reservados.
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-slate-500">
              La información de este sitio es de carácter general e informativo y no
              constituye asesoramiento legal, contable o tributario vinculante.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

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
      <Link
        href={href}
        className="text-sm text-slate-400 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-slate-400">
      <span className="mt-0.5 text-accent-bright">{icon}</span>
      <span>{children}</span>
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-accent hover:text-white"
    >
      {children}
    </a>
  );
}
