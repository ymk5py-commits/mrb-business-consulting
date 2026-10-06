import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site.config";
import { CookiePreferences } from "@/components/Analytics";
export const metadata = pageMetadata({ title: "Privacidad y cookies", path: "/privacidad", description: "Información sobre consultas, cookies y medición de visitas en el sitio de MRB Business Consulting." });
export default function PrivacyPage() {
  return <Section tone="light"><Container className="max-w-3xl pt-20">
    <h1 className="font-display text-4xl text-navy-900">Privacidad y cookies</h1>
    <p className="mt-4 text-sm text-slate-500">Actualizado: 6 de octubre de 2026.</p>
    <div className="mt-8 space-y-7 text-slate-600 leading-relaxed">
      <section><h2 className="text-xl font-semibold text-navy-900">Consultas por WhatsApp</h2><p className="mt-2">El formulario prepara un mensaje con los datos que ingresás y abre WhatsApp. La consulta se envía cuando confirmás el envío allí. Esos datos se utilizan para atender tu solicitud; evitá incluir documentos o información sensible en una primera consulta.</p></section>
      <section><h2 className="text-xl font-semibold text-navy-900">Medición de visitas</h2><p className="mt-2">Google Analytics se carga únicamente si aceptás la medición. Nos permite conocer páginas visitadas, origen general del tráfico e interacciones con los botones de contacto. Un clic de contacto no indica que hayas enviado un mensaje.</p><p className="mt-2">No enviamos a Analytics los nombres, correos ni mensajes del formulario. Los eventos propios utilizan la ruta de la página sin parámetros ni fragmentos. No activamos funciones publicitarias ni Google Signals.</p><p className="mt-2">Google puede procesar datos técnicos, identificadores y cookies conforme a su política. Consultá <a className="underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">cómo Google utiliza la información de sitios que usan sus servicios</a>.</p></section>
      <section><h2 className="text-xl font-semibold text-navy-900">Tus preferencias</h2><p className="mt-2">Guardamos tu elección en este navegador. Podés rechazar la medición y seguir usando el sitio, o cambiar tu decisión desde aquí o desde el pie de página.</p><div className="mt-3"><CookiePreferences /></div></section>
      <section><h2 className="text-xl font-semibold text-navy-900">Contacto</h2><p className="mt-2">Para consultar sobre el uso de tus datos, <a className="underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">contactá con MRB por WhatsApp</a>.</p></section>
    </div>
  </Container></Section>;
}
