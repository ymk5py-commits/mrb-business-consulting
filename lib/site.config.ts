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

  /** URL canónica del sitio. Se actualiza con el dominio propio cuando esté listo. */
  url: "https://mrb-business-consulting.vercel.app",

  locale: "es_PY",
  country: "Paraguay",
  city: "Asunción",

  /* ---- CONTACTO (PLACEHOLDER — reemplazá con tus datos reales) ---- */
  contact: {
    /** Teléfono visible */
    phone: "+595 21 000 000", // PLACEHOLDER
    /** Número de WhatsApp en formato internacional sin "+" ni espacios (para wa.me) */
    whatsapp: "595981234567", // PLACEHOLDER
    email: "contacto@mrbconsulting.com.py", // PLACEHOLDER
    /** Mensaje pre-cargado al abrir WhatsApp */
    whatsappMessage:
      "Hola MRB Business Consulting, quisiera una consulta sobre sus servicios.",
    address: {
      street: "Av. Ejemplo 1234, Edificio Empresarial", // PLACEHOLDER
      city: "Asunción",
      region: "Asunción",
      postalCode: "001411", // PLACEHOLDER
      country: "Paraguay",
    },
    /** Horario de atención */
    hours: "Lunes a Viernes, 08:00 – 17:00",
    /** Para schema.org openingHours */
    openingHours: "Mo-Fr 08:00-17:00",
    /** Coordenadas aprox. de Asunción (ajustar a la ubicación real) */
    geo: { lat: -25.2867, lng: -57.3333 },
  },

  /* ---- REDES SOCIALES (PLACEHOLDER) ---- */
  social: {
    instagram: "https://instagram.com/mrbconsulting", // PLACEHOLDER
    facebook: "https://facebook.com/mrbconsulting", // PLACEHOLDER
    linkedin: "https://www.linkedin.com/company/mrbconsulting", // PLACEHOLDER
  },
} as const;

/** Link directo a WhatsApp con mensaje pre-cargado */
export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;

/** Navegación principal */
export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;
