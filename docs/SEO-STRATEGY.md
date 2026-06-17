# Estrategia SEO — MRB Business Consulting (Paraguay)

> Plan generado con `/seo-plan`. Negocio híbrido **consultoría + servicio profesional local** (Asunción, PY).
> Conversión principal: **consulta por WhatsApp / formulario**. Idioma: `es-PY`.

## 1. Posicionamiento y audiencia

- **Quién busca**: emprendedores que quieren constituir una empresa, PYMEs que necesitan
  tercerizar contabilidad/impuestos, empresas extranjeras que se instalan en Paraguay.
- **Intención**: alta (comercial/transaccional local) + informacional ("cómo constituir una S.A.").
- **Diferenciadores E-E-A-T**: experiencia local, dominio del marco legal paraguayo (DNIT, IPS,
  Registros Públicos), "todo en un solo estudio" (contable + fiscal + legal).

## 2. Arquitectura de contenido (URL hierarchy)

```
/                                          Home (Organization + ProfessionalService + LocalBusiness)
/servicios                                 Hub de servicios
/servicios/contabilidad                    Service landing
/servicios/impuestos                        Service landing
/servicios/constitucion-de-sociedades       Service landing (pilar fuerte)
/servicios/asesoria-laboral-ips             Service landing
/servicios/auditoria-consultoria            Service landing
/servicios/tramites-inscripciones           Service landing
/servicios/asesoria-legal-societaria        Service landing
/nosotros                                  About (E-E-A-T, confianza)
/contacto                                  ContactPage + LocalBusiness
```

**Enlazado interno**: Home → hub /servicios → cada servicio. Cada servicio enlaza a 2-3 servicios
relacionados + CTA a /contacto. Footer enlaza los 7 servicios (link equity uniforme).

## 3. Mapa de keywords (localizadas Paraguay)

| Página | Keyword primaria | Secundarias / long-tail |
|---|---|---|
| Home | consultoría empresarial Paraguay | estudio contable y jurídico Asunción, MRB Business Consulting |
| Contabilidad | estudio contable Asunción | servicios contables Paraguay, tercerización contable, contador para empresas |
| Impuestos | asesoría tributaria Paraguay | liquidación de impuestos, declaración IVA, IRE, IRP, Marangatú DNIT |
| Constitución de sociedades | constituir empresa en Paraguay | constituir SRL, crear SA, EAS Paraguay, abrir empresa Asunción |
| Asesoría laboral / IPS | asesoría laboral Paraguay | liquidación de salarios, aportes IPS, trámites MTESS |
| Auditoría y consultoría | auditoría financiera Paraguay | empresa de auditoría Asunción, due diligence, estados financieros |
| Trámites e inscripciones | inscripción RUC Paraguay | sacar RUC, patente municipal Asunción, habilitación empresarial |
| Asesoría legal societaria | asesoría legal societaria Paraguay | reforma de estatutos, actas de asamblea, gobierno corporativo |

**Intención informacional (FAQ / GEO)**: "¿cuánto cuesta constituir una empresa en Paraguay?",
"¿qué impuestos paga una SRL en Paraguay?", "¿qué es una EAS?", "¿cómo sacar el RUC?",
"diferencia entre S.A. y S.R.L. en Paraguay".

## 4. Plan de Schema.org (JSON-LD)

| Tipo de página | Schema |
|---|---|
| Home | `Organization` + `ProfessionalService`/`AccountingService` + `LocalBusiness` (geo Asunción) |
| Servicio | `Service` (con `provider`, `areaServed: Paraguay`) + `BreadcrumbList` |
| Home / Servicio | `FAQPage` en bloques de preguntas frecuentes |
| Contacto | `ContactPage` + `LocalBusiness` (address, openingHours, telephone) |
| Todas | `BreadcrumbList`, `WebSite` con `inLanguage: es-PY` |

## 5. SEO técnico (checklist de implementación)

- [x] `lang="es-PY"`, HTML semántico, jerarquía H1→H3 correcta
- [x] Metadata por página (title ≤ 60c, description ≤ 155c), canonical absoluto
- [x] Open Graph + Twitter Card con imagen de marca (1200×630)
- [x] `sitemap.xml` dinámico (app/sitemap.ts) + `robots.txt` (app/robots.ts)
- [x] `llms.txt` para visibilidad en IA (ChatGPT / Perplexity / AI Overviews)
- [x] SSG (estático) → Core Web Vitals óptimos (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [x] `next/font` (self-host, sin layout shift), `next/image` (formatos modernos, lazy)
- [x] Favicon + apple-touch-icon + web manifest (PWA básica)
- [x] Alt text descriptivo en imágenes, `aria-label` en navegación/botones

## 6. GEO / AI Search (AEO)

- Respuestas extraíbles: bloques de FAQ con pregunta como `<h3>` + respuesta directa al inicio.
- Densidad de hechos: datos concretos del marco PY (tasas IVA 10%/5%, IRE 10%, tipos de sociedad).
- `llms.txt` listando servicios + propuesta de valor para crawlers de IA.
- Entidad clara y consistente: nombre, dirección y teléfono (NAP) idénticos en todo el sitio + schema.

## 7. KPIs

| Métrica | Baseline | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Tráfico orgánico | 0 (sitio nuevo) | 200/mes | 800/mes | 2.500/mes |
| Keywords en top 10 | 0 | 5 | 20 | 50 |
| Páginas indexadas | 0 | 11 | 11+ | 20+ (con blog) |
| Core Web Vitals | — | 100% "Good" | 100% | 100% |
| Conversiones (WhatsApp) | — | medible | crecimiento | crecimiento |

## 8. Roadmap por fases

- **Fase 1 (este deploy)**: 11 páginas core + SEO técnico completo + schema + sitemap.
- **Fase 2 (semanas 5-12)**: blog (`/recursos`) con guías ("Cómo constituir una EAS"), reseñas/Google Business Profile.
- **Fase 3 (3-6 meses)**: link building local, páginas por industria, optimización CWV continua.
- **Fase 4 (6-12 meses)**: autoridad temática, casos de éxito, schema avanzado.
