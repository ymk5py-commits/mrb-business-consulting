# Plan de acción SEO — MRB Business Consulting (sept. 2026)

Estado: ✅ hecho en el código (se publica con el deploy) · 👤 lo tiene que hacer Manuel o el equipo · 🔜 próxima iteración de desarrollo.

## Critical — ya
| # | Acción | Estado |
|---|---|---|
| 1 | Canonical, OG, sitemap y robots al dominio propio + redirect 308 del alias `vercel.app` | ✅ |
| 2 | Quitar las redes de terceros (íconos y `sameAs`) y el email sin MX | ✅ |
| 3 | Dirección real + geo en la esquina Ángel Gabriel × Fortín Isla Poí | ✅ |
| 4 | Después del deploy: en Google Search Console (la propiedad ya está verificada por TXT) enviar `sitemap.xml` y pedir indexación de `/`, `/nosotros` y `/contacto`. En Bing Webmaster Tools usar "Importar desde GSC" | 👤 |
| 5 | Crear la ficha de **Google Business Profile** (checklist abajo) | 👤 |

## High — esta semana
| # | Acción | Estado |
|---|---|---|
| 6 | Crear la casilla real (Google Workspace o Zoho) con MX y SPF, y cargarla en `lib/site.config.ts` → `contact.email` | 👤 |
| 7 | Crear Instagram, Facebook y LinkedIn **con otro handle** (`mrbconsulting` ya es de terceros) y cargarlos en `site.social`. Aparecen solos en el sitio y en el schema | 👤 |
| 8 | Pedir reseñas en Google a los 31 clientes (mensaje abajo), de a 5 a 8 por semana | 👤 |
| 9 | Headers de seguridad, favicon, manifest, robots para IA, llms.txt | ✅ |
| 10 | Títulos y descripciones (≤ 60 y ≤ 155 caracteres) orientados a Lambaré / Gran Asunción | ✅ |
| 11 | Firma "Servicio a cargo de Manuel Rolón" + fecha en los servicios; FAQs de IVA, E.A.S. y persona física | ✅ |
| 12 | Redirect directo `http://mrbconsulting.com.py` → `https://www.mrbconsulting.com.py` (hoy son 2 saltos). Vercel → Domains | 👤 |

## Medium — este mes
| # | Acción | Estado |
|---|---|---|
| 13 | 3 a 5 testimonios reales, con permiso de los clientes, en home y servicios | 👤 + 🔜 |
| 14 | Honorarios orientativos ("desde Gs. …") por servicio, si Manuel lo aprueba | 👤 + 🔜 |
| 15 | Sección "Requisitos y plazos" en constitución, impuestos e IPS, y tabla comparativa S.A. / S.R.L. / E.A.S. (datos a validar con Manuel) | 🔜 |
| 16 | Página o sección para **personas físicas** (24 de los 31 clientes): RUC, IVA, IRP, facturación electrónica | 🔜 |
| 17 | Página `/privacidad` breve | 🔜 |
| 18 | Confirmar si Manuel es fundador (`employee` → `founder`), su LinkedIn y el código postal real | 👤 |
| 19 | Unificar las librerías de animación (hoy GSAP + motion) para bajar JS e INP | 🔜 |

## Low — backlog
| # | Acción | Estado |
|---|---|---|
| 20 | Blog o recursos: "Cómo constituir una E.A.S. paso a paso", "Calendario de vencimientos DNIT" | 🔜 |
| 21 | Citaciones en directorios paraguayos serios, gremio de contadores, Cámara de Comercio y perfil de egresado (UCP y USIL) | 👤 |
| 22 | Nota de opinión en un medio económico local sobre un tema tributario | 👤 |
| 23 | Foto real de la oficina para el schema y la ficha de Google | 👤 |
| 24 | Re-auditar en 3 meses con datos de GSC y CrUX | 🔜 |

## Checklist: ficha de Google Business Profile
- **Nombre:** "MRB Business Consulting" (sin palabras clave agregadas).
- **Categoría principal:** Contador. **Secundarias:** Asesor fiscal, Consultor de negocios, Servicio de preparación de impuestos.
- **Tipo:** si Manuel recibe clientes en la oficina (aunque sea con cita), dirección visible. Si no, negocio de área de servicio con la dirección oculta: Lambaré, Asunción, San Lorenzo, Fernando de la Mora, Luque, Ñemby, Villa Elisa, Capiatá.
- **Teléfono:** +595 976 960 533 · **Horario:** lunes a viernes de 08:00 a 17:00 · **Web:** https://www.mrbconsulting.com.py
- **Servicios:** los 7 del sitio. **Fotos:** fachada o interior, Manuel y el logo.
- **Descripción (editar antes de publicar):** "MRB Business Consulting es un estudio contable, tributario y societario con base en Lambaré (Gran Asunción), Paraguay. Ayudamos a PyMEs y personas físicas con contabilidad, impuestos ante la DNIT, constitución de sociedades (S.A., S.R.L., E.A.S.), asesoría laboral e IPS, auditoría y trámites. Atendemos clientes de todo el país. Dirigido por Manuel Rolón, Lic. en Ciencias Contables con más de 15 años de experiencia."
- Una vez creada, tomar el pin exacto de Google y actualizar `site.contact.geo`.

## Mensaje para pedir reseñas (WhatsApp)
> Hola [Nombre], ¿cómo estás? Te escribe Manuel, de MRB. Estamos armando nuestra ficha en Google y nos ayudaría mucho que nos dejes una reseña corta contando tu experiencia con nosotros. Es este link, no lleva ni un minuto: [link]. ¡Gracias por confiar en MRB!

Enviar a todos por igual, sin filtrar por satisfacción (Google prohíbe elegir a quién pedírsela), en tandas de 5 a 8 por semana.
