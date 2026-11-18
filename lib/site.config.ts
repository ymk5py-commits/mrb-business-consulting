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
  city: "Asunción",


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
    /** Oficina desde noviembre de 2026 (antes: Barrio Mbachió, Lambaré). */
    address: {
      building: "Edificio Alfar 1, piso 11",
      street: "Cerro Corá 247 entre Yegros e Iturbe",
      neighborhood: "La Catedral",
      postalCode: "001101",
      city: "Asunción",
      region: "Asunción",
      country: "Paraguay",
    },
    /** Horario de atención */
    hours: "Lunes a viernes de 09:00 a 18:00 · Sábados de 09:00 a 12:00",
    /** Para schema.org (openingHoursSpecification) */
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      { days: ["Saturday"], opens: "09:00", closes: "12:00" },
    ],
    /** Edificio Alfar 1, Cerro Corá 247 (La Catedral, Asunción), según OpenStreetMap */
    geo: { lat: -25.28448, lng: -57.63338 },
  },

  /* ---- REDES SOCIALES ----
   * Perfiles oficiales de MRB. Una red vacía ("") no se muestra; las cargadas
   * aparecen solas en contacto, footer, schema (sameAs) y llms.txt. */
  social: {
    instagram: "https://www.instagram.com/mrb.consulting/" as string,
    facebook: "https://www.facebook.com/profile.php?id=61596385053356" as string,
    linkedin: "https://www.linkedin.com/company/mrb-business-consulting-py/" as string,
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

/** Dirección en una línea: "Edificio …, piso …, Calle …, Asunción" */
export const addressLine = [
  site.contact.address.building,
  site.contact.address.street,
  site.contact.address.city,
].join(", ");

/** Abre la ubicación en Google Maps (app en el celular, web en desktop) */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${site.contact.geo.lat},${site.contact.geo.lng}`;

/** Navegación principal */
export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Guías", href: "/guias" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;
