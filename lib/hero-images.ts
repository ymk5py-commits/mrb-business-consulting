export const heroImages = {
  office: "/brand/hero-office.webp",
  accounting: "/brand/hero-accounting.webp",
  legal: "/brand/hero-legal.webp",
  payroll: "/brand/hero-payroll.webp",
  audit: "/brand/hero-audit.webp",
  contact: "/brand/hero-contact.webp",
};

export const serviceHeroImages: Record<string, string> = {
  contabilidad: heroImages.accounting,
  impuestos: heroImages.accounting,
  "constitucion-de-sociedades": heroImages.legal,
  "asesoria-laboral-ips": heroImages.payroll,
  "auditoria-consultoria": heroImages.audit,
  "tramites-inscripciones": heroImages.legal,
  "asesoria-legal-societaria": heroImages.legal,
};
