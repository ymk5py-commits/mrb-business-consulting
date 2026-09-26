# Auditoría SEO completa — MRB Business Consulting

- **Fecha:** 26 de septiembre de 2026
- **Sitio:** https://www.mrbconsulting.com.py (Next.js 16, estático, Vercel)
- **Tipo de negocio detectado:** servicio profesional local (estudio contable, tributario y societario) con base en Lambaré (Gran Asunción) y atención remota a todo Paraguay.
- **Método:** 10 especialistas en paralelo (técnico, contenido/E-E-A-T, schema, sitemap, performance, visual/mobile, IA/GEO, SXO, SEO local y backlinks) sobre el build de producción local y el dominio en vivo. Sin datos de Google Search Console, CrUX ni Moz (no hay credenciales configuradas; la cuota pública de PageSpeed estaba agotada ese día).

## Resumen ejecutivo

| | Antes de los fixes | Después de los fixes (estimado) |
|---|---|---|
| **SEO Health Score** | **67 / 100** | **~83 / 100** |

El "después" es una estimación: se re-verificaron con scripts los puntos técnicos, on-page y de schema (títulos, canonicals, H1, grafo JSON-LD sin referencias colgadas, headers, redirect, robots, sitemap), pero no se volvió a correr la auditoría completa.

| Categoría (peso) | Antes | Después (est.) | Qué cambió |
|---|---|---|---|
| Técnico (22 %) | 64 | ~88 | Redirect 308 del alias `vercel.app`, headers de seguridad, favicon.ico, manifest, sitemap con fechas reales, robots para bots de IA |
| Contenido (23 %) | 60 | ~70 | Firma del director en los 7 servicios, FAQs verificadas (IVA, E.A.S., persona física), afirmaciones absolutas suavizadas. Faltan testimonios y contenido más profundo |
| On-page (20 %) | 74 | ~86 | 11 títulos de 60 caracteres o menos y meta descriptions de 155 o menos, geo Lambaré / Gran Asunción, WhatsApp por servicio |
| Schema (10 %) | 64 | ~90 | Sin sameAs de terceros ni email falso; WebPage por página, @id de servicios, catálogo, contactPoint, hasMap, vínculo Organization ↔ Person |
| Performance (10 %) | ~80 en vivo | ~93 | Video 720p y 360p en celulares (antes 4K de 6,3 MB), poster precargado, foto de 1,1 MB → 117 KB |
| IA / GEO (10 %) | 58 | ~75 | robots explícito para GPTBot, ClaudeBot, PerplexityBot y otros; llms.txt reescrito con NAP, director y FAQs |
| Imágenes (5 %) | ~80 | ~90 | JPG optimizado, avatar recortado, alt descriptivos |

Puntajes complementarios (no entran en el Health Score): **SEO local 24/100** (casi todo fuera del sitio: ficha de Google, reseñas, citaciones), **SXO 51/100**, **visual/mobile 79 → ~88**, **backlinks: sin datos** (dominio nuevo, todavía no está en Common Crawl).

### Top 5 problemas críticos encontrados
1. **El sitio en vivo le decía a Google que el canónico era `mrb-business-consulting.vercel.app`**: canonical, OG, sitemap y robots apuntaban al alias, y el alias servía el mismo contenido (duplicado). → Resuelto en código; se hace efectivo con el deploy.
2. **Redes sociales de terceros**: `instagram/facebook/linkedin.com/mrbconsulting` eran de otras empresas (una ingeniería del Reino Unido, un perfil personal y una empresa de marketing), y estaban en los íconos y en `sameAs`. → Quitadas hasta tener las reales.
3. **Email sin servidor de correo**: `contacto@mrbconsulting.com.py` rebota (el dominio no tiene MX). → Quitado del sitio y del schema hasta crear la casilla.
4. **Dirección placeholder en vivo** ("Av. Ejemplo 1234"). → Reemplazada por la real con geo en la esquina Ángel Gabriel × Fortín Isla Poí.
5. **No se ve ficha de Google Business Profile** (no confirmado al 100 %: los buscadores bloquean bots). → Pendiente de alta; checklist en ACTION-PLAN.md.

### Top 5 quick wins aplicados
1. Redirect 308 `vercel.app` → `www.mrbconsulting.com.py` + canonical propio.
2. Títulos y descripciones cortos, orientados a "estudio contable Lambaré / Gran Asunción".
3. Firma "Servicio a cargo de Manuel Rolón · Actualizado en septiembre de 2026" en cada servicio (E-E-A-T).
4. WhatsApp con mensaje por servicio: el lead llega diciendo qué servicio quiere.
5. robots.txt y llms.txt listos para buscadores con IA.

## Técnico
- **Arreglado:** host duplicado (redirect en `next.config.ts`), headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; HSTS ya lo pone Vercel), `/favicon.ico` que daba 404, íconos del manifest (192 y 512 con purpose `any`), directiva `Host:` obsoleta en robots, canonical del home con barra final igual que el sitemap.
- **OK sin cambios:** 404 real (no soft-404), H1 en el HTML sin JS, `lang="es-PY"`, fuentes self-hosted, sitio 100 % estático.
- **Pendiente (panel de Vercel):** cadena de 2 redirects `http://mrbconsulting.com.py` → `https://mrbconsulting.com.py` → `https://www…`. Se resuelve en Vercel → Domains.
- **Decisión:** no se agregó CSP estricta. El JSON-LD inline y la hidratación de Next requerirían nonces por request.

## Contenido y E-E-A-T
- **Arreglado:** firma del director y fecha de actualización en los 7 servicios; FAQs nuevas y verificadas en fuentes oficiales (DNIT y SUACE/MIC): vencimiento del IVA (calendario perpetuo: día 7 a 25 según el último dígito del RUC), cómo se constituye una E.A.S. (uno o más accionistas, sin capital mínimo, 100 % en línea por SUACE en hasta 72 h hábiles), profesional independiente y RUC de persona física; "Cumplimiento garantizado" pasa a "Libros en regla" y "Sin multas ni recargos" a "Vencimientos bajo control".
- **Pendiente:** testimonios o reseñas reales (0 hoy), honorarios orientativos, contenido más profundo por servicio (las 7 páginas tienen entre 480 y 580 palabras y la misma estructura), guías tipo "Cómo constituir una E.A.S. paso a paso", página de privacidad.
- **Nota:** 24 de los 31 clientes son personas físicas y el sitio hablaba casi solo de "empresas". Se sumaron FAQs y textos para ellas; conviene una sección propia.

## On-page
Todas las páginas tienen título de 60 caracteres o menos, descripción de 155 o menos, un solo H1 y canonical absoluto al dominio propio (verificado por script en las 11 URLs).

| Página | Título nuevo |
|---|---|
| Home | Estudio Contable en Lambaré y Gran Asunción \| MRB |
| /servicios | Servicios Contables y Tributarios en Paraguay \| MRB |
| /nosotros | Manuel Rolón y el Equipo de MRB Business Consulting |
| /contacto | Contacto: WhatsApp, Teléfono y Dirección en Lambaré \| MRB |
| /servicios/contabilidad | Estudio Contable en Lambaré y Gran Asunción \| MRB |
| /servicios/impuestos | Asesoría Tributaria en Paraguay: IVA, IRE e IRP \| MRB |

## Schema / datos estructurados
Grafo con @id estables: `Organization` (+ ProfessionalService y AccountingService) con `hasOfferCatalog` de los 7 servicios, `contactPoint` (WhatsApp y teléfono), `hasMap`, `areaServed` (Lambaré, Asunción, Paraguay), `logo` como ImageObject y `employee` → Person. Además `WebSite`, un `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage` por página, `Service` con @id y `mainEntityOfPage`, `BreadcrumbList` con @id, `Person` con `alumniOf` y `knowsAbout`, y `FAQPage` (se mantiene por su valor para IA; Google ya no muestra resultados enriquecidos de FAQ para sitios comerciales). El JSON-LD escapa `<`.
- **Pendiente:** confirmar si Manuel es el fundador (pasar `employee` a `founder`), su LinkedIn (sameAs del Person) y el código postal real.

## Performance
Laboratorio (Playwright, CPU 4x en mobile): LCP de 176 a 544 ms, CLS 0, peso total 6,65 MB → 2,5 MB. Con el poster y el video 360p en celulares baja aún más. INP no se midió con interacción real; hay una tarea larga de ~180 ms al hidratar (GSAP + ScrollSmoother + SplitText) y dos librerías de animación (GSAP y motion). Unificarlas es una mejora a futuro.

## Imágenes
Foto del director: PNG de 1,1 MB → JPG de 117 KB (nombre nuevo para evitar el caché de imágenes), avatar de 6 KB, poster de 38 KB. Todos los `<img>` y `next/image` tienen alt o `alt=""` si son decorativos.

## IA / GEO
robots.txt con grupo explícito para GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended y CCBot. `llms.txt` reescrito: quiénes somos, NAP, 7 servicios, 6 FAQs con datos verificables. Pendiente: perfiles reales (sameAs) y menciones de marca en sitios paraguayos.

## Limitaciones
- Sin Google Search Console, CrUX ni GA4 (sin credenciales) y sin Moz o Bing (backlinks).
- La existencia de una ficha de Google Business no se pudo confirmar al 100 %.
- El sitio en vivo tenía la versión anterior durante la auditoría; los problemas "en vivo" se resuelven con este deploy.
