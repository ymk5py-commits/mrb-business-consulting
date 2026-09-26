/* ============================================================
 * MRB Business Consulting — Configuración central del sitio
 * ============================================================
 *  👉 EDITÁ AQUÍ tus datos reales. Todo el sitio (header, footer,
 *  contacto, SEO, schema, botón de WhatsApp) lee de este archivo.
 *  Los valores marcados con "PLACEHOLDER" son de ejemplo.
 * ============================================================ */

export const site = {
  name: "MRB Business Consulting",
  shortName: "MRB",
  legalName: "MRB Business Consulting",
  /** Propuesta de valor corta (≈ 60 caracteres) */
  tagline: "Contabilidad, impuestos y constitución de empresas en Paraguay",
  /** Descripción para SEO (≈ 155 caracteres) */
  description:
    "Estudio de consultoría contable, fiscal y societaria en Paraguay. Constitución de empresas (S.A., S.R.L., E.A.S.), liquidación de impuestos, IPS y trámites ante la DNIT.",

  /** URL canónica del sitio (dominio propio; el apex redirige a www). */
  url: "https://www.mrbconsulting.com.py",

  locale: "es_PY",
  country: "Paraguay",
  city: "Lambaré",

  /** Video de fondo del hero. PLACEHOLDER (stock) — reemplazá por tu propio video .mp4.
   *  720p: va bajo un overlay oscuro, así que no se nota frente al 4K y pesa 2 MB (vs 6 MB). */
  heroVideo:
    "https://videos.pexels.com/video-files/3254066/3254066-hd_1280_720_25fps.mp4",
  /** Versión liviana (360p, ~0,7 MB) para pantallas chicas: bajo el overlay no se nota. */
  heroVideoMobile:
    "https://videos.pexels.com/video-files/3254066/3254066-sd_640_360_25fps.mp4",
  /** Primer cuadro del video: se ve mientras carga (y fija un LCP rápido). */
  heroPoster: "/hero-poster.jpg",

  /* ---- CONTACTO ---- */
  contact: {
    /** Teléfono visible */
    phone: "+595 976 960 533",
    /** Número de WhatsApp en formato internacional sin "+" ni espacios (para wa.me) */
    whatsapp: "595976960533",
    /** Email de contacto. Vacío = no se muestra. Cargarlo cuando exista la casilla
     *  (contacto@mrbconsulting.com.py rebotaba: el dominio no tiene registros MX). */
    email: "" as string,
    /** Mensaje pre-cargado al abrir WhatsApp */
    whatsappMessage:
      "Hola MRB Business Consulting, quisiera una consulta sobre sus servicios.",
    address: {
      street: "Calle Ángel Gabriel casi Fortín Isla Poí",
      neighborhood: "Barrio Mbachió",
      city: "Lambaré",
      region: "Central",
      country: "Paraguay",
    },
    /** Horario de atención */
    hours: "Lunes a Viernes, 08:00 – 17:00",
    /** Para schema.org openingHours */
    openingHours: "Mo-Fr 08:00-17:00",
    /** Ángel Gabriel casi Fortín Isla Poí (Mbachió, Lambaré), según OpenStreetMap */
    geo: { lat: -25.35834, lng: -57.6249 },
  },

  /* ---- REDES SOCIALES ----
   * Vacías hasta tener perfiles propios de MRB: las URLs de ejemplo ("mrbconsulting")
   * eran de otras empresas. Al cargarlas aparecen solas en contacto, footer y schema. */
  social: {
    instagram: "" as string,
    facebook: "" as string,
    linkedin: "" as string,
  },
} as const;

/** Link de WhatsApp con un mensaje pre-cargado (por defecto, el genérico). */
export function whatsappLink(message: string = site.contact.whatsappMessage): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Link directo a WhatsApp con el mensaje genérico */
export const whatsappHref = whatsappLink();

/** Cartera de clientes (dato real, sept. 2026). Editá acá: el total se calcula solo. */
export const clientStats = {
  companies: 7,
  individuals: 24,
  get total() {
    return this.companies + this.individuals;
  },
};

/** Redes con URL cargada (las vacías no se muestran ni van al schema). */
export const socialLinks = (
  [
    { network: "instagram", label: "Instagram", href: site.social.instagram },
    { network: "facebook", label: "Facebook", href: site.social.facebook },
    { network: "linkedin", label: "LinkedIn", href: site.social.linkedin },
  ] as const
).filter((s) => s.href !== "");

/** Dirección en una línea: "Calle …, Barrio …, Lambaré" */
export const addressLine = [
  site.contact.address.street,
  site.contact.address.neighborhood,
  site.contact.address.city,
].join(", ");

/** Abre la ubicación en Google Maps (app en el celular, web en desktop) */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${site.contact.geo.lat},${site.contact.geo.lng}`;

/** Navegación principal */
export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;
