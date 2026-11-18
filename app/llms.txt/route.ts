import { site, clientStats, socialLinks, whatsappHref } from "@/lib/site.config";
import { services, SERVICES_UPDATED_AT, type ServiceFaq } from "@/lib/services";
import { guides } from "@/lib/guides";
import { homeFaqs } from "@/lib/faqs";
import { director, professionals, professionalPath, licensesOf } from "@/lib/team";

export const dynamic = "force-static";

/* ============================================================
 * /llms.txt — resumen del sitio para buscadores y asistentes de IA (GEO).
 * Todo sale de los mismos datos que usan las páginas (site.config, services,
 * faqs, team): si cambia un dato, cambia acá solo.
 * ============================================================ */

const url = (path: string) => `${site.url}${path}`;
const list = (items: string[]) =>
  new Intl.ListFormat("es", { style: "long", type: "conjunction" }).format(items);
/** Primera letra en minúscula, sin tocar siglas (IPS, IVA…). */
const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const faqLines = (faqs: ServiceFaq[]) => faqs.map((f) => `- **${f.q}** ${f.a}`).join("\n");

export function GET() {
  const { address } = site.contact;
  const fullAddress = `${address.building}, ${address.street}, barrio ${address.neighborhood}, ${address.city} (CP ${address.postalCode}), ${address.country}`;

  const team = professionals
    .map((p) => {
      const licenses = licensesOf(p).map((l) => `${l.title} (${l.detail})`);
      const parts = [p.role, p.headline, ...licenses, p.bio].filter(Boolean);
      return `- [${p.name}](${url(professionalPath(p))}): ${parts.join(". ").replace(/\.\./g, ".")}`;
    })
    .join("\n");

  const text = `# ${site.name}

> Estudio contable, tributario y societario en el centro de Asunción, Paraguay. Contabilidad, impuestos ante la DNIT, constitución de sociedades, asesoría laboral e IPS, auditoría y trámites para empresas y personas de todo el país.

Sitio oficial: ${site.url}. Idioma: español de Paraguay (es-PY).
Última actualización: ${SERVICES_UPDATED_AT}.

## Datos clave

- Nombre: ${site.name} (también «MRB» o «MRB Consulting»).
- Qué es: estudio contable, tributario y societario.
- Servicios: ${list(services.map((s) => lowerFirst(s.title)))}.
- Director: ${director.name}, ${[
    `${director.headline} (${director.credentials?.find((c) => c.kind === "degree")?.detail})`,
    director.credentials?.find((c) => c.kind === "specialty")?.title,
  ]
    .filter(Boolean)
    .join(", ")}.
- Experiencia: más de ${director.years} años.
- Clientes: ${clientStats.total} (${clientStats.companies} empresas y ${clientStats.individuals} personas físicas).
- Dirección: ${fullAddress}.
- Horario: ${site.contact.hours}.
- Teléfono y WhatsApp: ${site.contact.phone} (${whatsappHref.split("?")[0]}).
- Zona de atención: todo Paraguay, presencial en Asunción y en forma remota en el resto del país. También asesora a extranjeros que quieren invertir o abrir una empresa en Paraguay.
- Organismos con los que trabaja: DNIT (impuestos, RUC y Marangatú), IPS, MTESS, SUACE, Abogacía del Tesoro, DINAPI y municipalidades.

## Servicios

${services.map((s) => `- [${s.title}](${url(`/servicios/${s.slug}`)}): ${s.excerpt}`).join("\n")}

## Guías

${guides.map((g) => `- [${g.title}](${url(`/guias/${g.slug}`)}): ${g.excerpt} Revisada el ${g.updatedAt}.`).join("\n")}

## Equipo

${team}

## Preguntas frecuentes

### Sobre ${site.shortName}

${faqLines(homeFaqs)}

${services.map((s) => `### ${s.title}\n\n${faqLines(s.faqs)}`).join("\n\n")}

${guides.map((g) => `### ${g.title}\n\n${faqLines(g.faqs)}`).join("\n\n")}

## Contacto y redes oficiales

- [Contacto](${url("/contacto")})
- [WhatsApp](${whatsappHref.split("?")[0]})
${socialLinks.map((s) => `- [${s.label}](${s.href})`).join("\n")}

## Páginas principales

- [Inicio](${url("/")})
- [Servicios](${url("/servicios")})
- [Nosotros](${url("/nosotros")})
- [Equipo profesional](${url("/equipo")})
- [Guías](${url("/guias")})
- [Sitemap XML](${url("/sitemap.xml")})

## Alcance

La información es general y no sustituye una evaluación profesional de cada caso. Consultar con ${site.shortName} los honorarios, requisitos y plazos aplicables.
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
