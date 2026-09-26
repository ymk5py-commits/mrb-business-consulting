import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { socialIcons } from "./icons";
import { site, navLinks, addressLine, mapsHref, socialLinks } from "@/lib/site.config";
import { services } from "@/lib/services";

/** Links del footer: hover + foco visible sobre fondo navy */
const footerLink =
  "rounded-sm transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

/**
 * Footer "mast-headed": marca y datos de contacto en una franja, luego una línea
 * de secciones y otra de servicios. Sin columnas de índice ni fila de íconos.
 */
export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div className="min-w-0">
            <Logo variant="white" className="h-11" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {site.tagline}.
            </p>
          </div>

          <address className="min-w-0 text-sm not-italic leading-relaxed lg:justify-self-end lg:text-right">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={footerLink}>
              {addressLine}
            </a>
            <br />
            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={footerLink}>
              {site.contact.phone}
            </a>
            {site.contact.email && (
              <>
                {" · "}
                <a href={`mailto:${site.contact.email}`} className={`${footerLink} break-all`}>
                  {site.contact.email}
                </a>
              </>
            )}
            <br />
            <span className="text-slate-400">{site.contact.hours}</span>
          </address>
        </div>

        <nav aria-label="Pie de página" className="mt-10 border-t border-slate-800 pt-6 text-sm">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-medium text-slate-200">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={footerLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-slate-400">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className={footerLink}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {socialLinks.length > 0 && (
          <ul className="mt-6 flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = socialIcons[s.network];
              return (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-700 hover:ring-slate-500 ${footerLink}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {year} {site.legalName}.
          </p>
          <p className="max-w-xl leading-relaxed sm:text-right">
            La información de este sitio es de carácter general e informativo y no
            constituye asesoramiento legal, contable o tributario vinculante.
          </p>
        </div>
      </Container>
    </footer>
  );
}
