import type { Metadata } from "next";
import { site } from "./site.config";
import { services } from "./services";

/** Convierte una ruta relativa en URL absoluta canónica. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

type PageMetaInput = {
  title?: string;
  description?: string;
  path?: string;
};

/** Construye metadata consistente para cada página (canonical + OG + Twitter). */
export function pageMetadata({
  title,
  description,
  path = "/",
}: PageMetaInput = {}): Metadata {
  const url = absoluteUrl(path);
  const desc = description ?? site.description;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title: title ?? `${site.name} — ${site.tagline}`,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? `${site.name} — ${site.tagline}`,
      description: desc,
    },
  };
}

/* ============================================================
 * Schema.org (JSON-LD)
 * ============================================================ */

const ORG_ID = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "AccountingService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    logo: absoluteUrl("/brand/logo-mrb-navy.png"),
    image: absoluteUrl("/brand/logo-mrb-circle.png"),
    email: site.contact.email,
    telephone: site.contact.phone,
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Paraguay" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin],
    knowsAbout: services.map((s) => s.title),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "es-PY",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Paraguay" },
    inLanguage: "es-PY",
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
