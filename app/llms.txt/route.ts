import { site, addressLine } from "@/lib/site.config";
import { services, SERVICES_UPDATED_AT } from "@/lib/services";
import { professionals, professionalPath } from "@/lib/team";

export const dynamic = "force-static";

export function GET() {
  const text = `# ${site.name}

> ${site.description}

Sitio oficial: ${site.url}. Idioma: español de Paraguay (es-PY).
Contenido actualizado: ${SERVICES_UPDATED_AT}.

## Contacto y atención

- Dirección: ${addressLine}, Paraguay.
- Teléfono y WhatsApp: ${site.contact.phone}.
- Horario: ${site.contact.hours}.
- Atención presencial en Lambaré y remota para todo Paraguay.
- [Contacto](${site.url}/contacto)
- [LinkedIn oficial](${site.social.linkedin})

## Servicios

${services.map((s) => `- [${s.title}](${site.url}/servicios/${s.slug}): ${s.excerpt}`).join("\n")}

## Profesionales

${professionals.map((p) => `- [${p.name}](${site.url}${professionalPath(p)}): ${p.headline}. ${p.bio}`).join("\n")}

## Páginas principales

- [Inicio](${site.url}/)
- [Servicios](${site.url}/servicios)
- [Nosotros](${site.url}/nosotros)
- [Equipo profesional](${site.url}/equipo)
- [Sitemap XML](${site.url}/sitemap.xml)

## Alcance

La información es general y no sustituye una evaluación profesional de cada caso. Consultar con MRB los honorarios, requisitos y plazos aplicables. Las credenciales profesionales y los servicios se describen en las páginas enlazadas.
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
