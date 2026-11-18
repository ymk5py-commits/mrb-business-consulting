import type { Metadata } from "next";
import { site, socialLinks, whatsappHref, mapsHref } from "./site.config";
import { services } from "./services";
import { professionals, professionalPath, director, type Credential, type TeamMember } from "./team";

/** Convierte una ruta relativa en URL absoluta canónica. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

/** Imagen social por defecto (app/opengraph-image.tsx, 1200×630). */
export const DEFAULT_OG_IMAGE = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

type PageMetaInput = {
  title?: string;
  description?: string;
  path?: string;
  /** true = <title> exacto, sin el sufijo de la plantilla del layout
   *  ("| MRB Business Consulting"). Usarlo cuando el título ya incluye la marca
   *  o cuando el sufijo lo llevaría a más de 60 caracteres. */
  absoluteTitle?: boolean;
  /** Imagen social propia (p. ej. la foto de un perfil). Por defecto, la imagen OG del sitio. */
  image?: { url: string; width?: number; height?: number; alt: string };
};

/** Construye metadata consistente para cada página (canonical + OG + Twitter). */
export function pageMetadata({
  title,
  description,
  path = "/",
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE,
}: PageMetaInput = {}): Metadata {
  const url = absoluteUrl(path);
  const desc = description ?? site.description;
  const socialTitle = title ?? `${site.name} — ${site.tagline}`;
  const images = [{ ...image, url: absoluteUrl(image.url) }];
  return {
    ...(title ? { title: absoluteTitle ? { absolute: title } : title } : {}),
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title: socialTitle,
      description: desc,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: desc,
      images,
    },
  };
}

/* ============================================================
 * Schema.org (JSON-LD)
 * ============================================================
 * @id estables y compartidos entre páginas: así Google y los asistentes de IA
 * entienden que cada mención se refiere siempre a la misma entidad.
 * ============================================================ */

export const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** @id de cada Service (lo comparten hasOfferCatalog, /servicios y /servicios/[slug]). */
export function serviceId(slug: string): string {
  return `${absoluteUrl(`/servicios/${slug}`)}#service`;
}

/** @id de cada Person del equipo. */
export function personId(member: TeamMember): string {
  return `${absoluteUrl(professionalPath(member))}#person`;
}

/** @id del BreadcrumbList de una página. */
export function breadcrumbId(path: string): string {
  return `${absoluteUrl(path)}#breadcrumb`;
}

/** @id del WebPage (o subtipo) de una página. */
export function webPageId(path: string): string {
  return `${absoluteUrl(path)}#webpage`;
}

/** Teléfono en formato E.164 (sin espacios), como lo esperan schema.org y Google. */
const E164_PHONE = `+${site.contact.whatsapp}`;

/** Temas en los que el estudio es experto (Organization.knowsAbout). */
const ORG_KNOWS_ABOUT = [
  "Contabilidad",
  "IVA",
  "IRE",
  "IRP",
  "IDU",
  "Facturación electrónica SIFEN",
  "Marangatú",
  "Sociedades E.A.S., S.A. y S.R.L.",
  "IPS",
  "MTESS",
  "NIIF para PYMEs",
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "AccountingService"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: ["MRB", "MRB Consulting"],
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo-mrb-navy.png"),
      width: 5000,
      height: 2500,
    },
    image: absoluteUrl("/brand/hero-office.webp"),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    telephone: E164_PHONE,
    priceRange: "$$",
    // Oficina en el centro de Asunción; atención remota a todo el país.
    areaServed: [
      { "@type": "City", name: "Asunción" },
      { "@type": "Country", name: "Paraguay" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address.street}, ${site.contact.address.building}`,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: "PY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    hasMap: mapsHref,
    openingHoursSpecification: site.contact.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: E164_PHONE,
      url: whatsappHref,
      areaServed: "PY",
      availableLanguage: { "@type": "Language", name: "Spanish", alternateName: "es" },
    },
    knowsLanguage: "es",
    knowsAbout: ORG_KNOWS_ABOUT,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Servicios de ${site.name}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": serviceId(s.slug),
          name: s.title,
          url: absoluteUrl(`/servicios/${s.slug}`),
        },
      })),
    },
    // Si se confirma que Manuel fundó el estudio, sumar `founder: { "@id": personId(director) }`.
    employee: { "@id": personId(director) },
    member: professionals.map((member) => ({ "@id": personId(member) })),
    // Solo redes reales cargadas en site.config (las vacías no se publican).
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((s) => s.href) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "es-PY",
    publisher: { "@id": ORG_ID },
  };
}

type WebPageType = "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage" | "ProfilePage";

/** WebPage (o subtipo) por página: la vincula con el WebSite, la Organization,
 *  su entidad principal y su breadcrumb. */
export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
  mainEntityId,
  dateModified,
  hasBreadcrumb = true,
}: {
  type?: WebPageType;
  path: string;
  name: string;
  description?: string;
  mainEntityId?: string;
  /** Fecha ISO de la última actualización real del contenido. */
  dateModified?: string;
  /** false en el home: no tiene breadcrumb. */
  hasBreadcrumb?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": webPageId(path),
    url: absoluteUrl(path),
    name,
    ...(description ? { description } : {}),
    inLanguage: "es-PY",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { "@id": breadcrumbId(path) } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const currentPath = items[items.length - 1]?.path ?? "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(currentPath),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  slug: string;
  name: string;
  description: string;
}) {
  const path = `/servicios/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(input.slug),
    name: input.name,
    description: input.description,
    url: absoluteUrl(path),
    serviceType: input.name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Paraguay" },
    inLanguage: "es-PY",
    mainEntityOfPage: { "@id": webPageId(path) },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es-PY",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Person por miembro del equipo (/nosotros), vinculado a la Organization. */
export function teamSchema() {
  return professionals.map(personSchema);
}

/** credentialCategory de schema.org para cada tipo de credencial. */
const CREDENTIAL_CATEGORY: Record<Credential["kind"], string> = {
  degree: "degree",
  diploma: "certificate",
  specialty: "certificate",
  license: "license",
};

export function personSchema(m: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(m),
    name: m.name,
    url: absoluteUrl(professionalPath(m)),
    jobTitle: m.role,
    description: m.bio,
    worksFor: { "@id": ORG_ID },
    ...(m.alumniOf?.length
      ? { alumniOf: m.alumniOf.map((name) => ({ "@type": "CollegeOrUniversity", name })) }
      : {}),
    ...(m.credentials?.length ? {
      hasCredential: m.credentials.map((credential) => ({
        "@type": "EducationalOccupationalCredential",
        name: credential.title,
        credentialCategory: CREDENTIAL_CATEGORY[credential.kind],
        ...(credential.detail ? { description: credential.detail } : {}),
        ...(credential.recognizedBy
          ? { recognizedBy: { "@type": "GovernmentOrganization", name: credential.recognizedBy } }
          : {}),
      })),
    } : {}),
    ...(m.sectors?.length ? { knowsAbout: m.sectors } : {}),
    ...(m.photo ? { image: absoluteUrl(m.photo) } : {}),
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    ...(m.email ? { email: m.email } : {}),
  };
}
