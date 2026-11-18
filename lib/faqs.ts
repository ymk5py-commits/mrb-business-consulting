import type { ServiceFaq } from "./services";

/* ============================================================
 * Preguntas frecuentes generales (home)
 * ============================================================
 * Se muestran en el inicio, alimentan su FAQPage schema y se publican en
 * /llms.txt. Las de cada servicio viven en lib/services.ts.
 * ============================================================ */

export const homeFaqs: ServiceFaq[] = [
  {
    q: "¿Qué servicios ofrece MRB Business Consulting?",
    a: "Brindamos contabilidad, asesoría tributaria, constitución de sociedades (S.A., S.R.L., E.A.S.), asesoría laboral e IPS, auditoría, trámites e inscripciones y asesoría legal societaria, todo bajo el marco legal paraguayo.",
  },
  {
    q: "¿Atienden a empresas y personas de todo Paraguay?",
    a: "Sí. Atendemos clientes de todo el país desde nuestra oficina en el centro de Asunción (Edificio Alfar 1, Cerro Corá 247). Gran parte de la gestión —Marangatú e IPS— se hace en forma digital, así que tu ubicación no es un impedimento.",
  },
  {
    q: "¿Puedo tercerizar toda la contabilidad e impuestos de mi empresa?",
    a: "Por supuesto. Podés delegar en MRB la contabilidad mensual, la liquidación de impuestos ante la DNIT y la gestión laboral, con un equipo profesional y un único punto de contacto.",
  },
  {
    q: "¿Ayudan a constituir una empresa desde cero?",
    a: "Sí. Te asesoramos para elegir el tipo societario adecuado y gestionamos todo el proceso: estatutos, escritura pública y obtención del RUC, para que arranques a operar cuanto antes.",
  },
  {
    q: "¿Cómo empiezo a trabajar con MRB?",
    a: "Escribinos por WhatsApp o completá el formulario de contacto. Coordinamos una primera consulta sin compromiso, entendemos tu caso y te enviamos una propuesta a medida.",
  },
];
