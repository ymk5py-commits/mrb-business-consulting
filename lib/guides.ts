import type { ServiceFaq } from "@/lib/services";

/** Bloque de contenido de una guía. Cada sección usa uno o varios formatos. */
export type GuideSection = {
  /** Ancla para el índice (#id) */
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  steps?: { title: string; text: string }[];
  table?: { caption: string; columns: string[]; rows: string[][] };
};

export type Guide = {
  slug: string;
  /** Título corto para tarjetas y breadcrumbs */
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Resumen de una línea para el índice de guías y llms.txt */
  excerpt: string;
  /** Fecha ISO de la última revisión del contenido */
  updatedAt: string;
  sections: GuideSection[];
  faqs: ServiceFaq[];
  /** Slugs de servicios relacionados */
  relatedServices: string[];
};

export const guides: Guide[] = [
  {
    slug: "como-constituir-una-eas-en-paraguay",
    title: "Cómo constituir una E.A.S. en Paraguay",
    metaTitle: "Cómo Constituir una E.A.S. en Paraguay: Guía 2026 | MRB",
    metaDescription:
      "Guía paso a paso para abrir una E.A.S. en Paraguay: requisitos, firma electrónica, trámite en el SUACE, plazos y diferencias con la S.A. y la S.R.L.",
    h1: "Cómo constituir una E.A.S. en Paraguay",
    intro:
      "La Empresa por Acciones Simplificadas (E.A.S.) es hoy la forma más usada para abrir una empresa en Paraguay: se constituye en línea, puede tener un solo dueño y la ley no exige capital mínimo. Esta guía resume qué necesitás tener listo, los pasos del trámite y cuándo conviene otra figura.",
    excerpt:
      "Requisitos, pasos en el SUACE, firma electrónica, plazos y una comparación con la S.A. y la S.R.L.",
    updatedAt: "2026-11-17",
    sections: [
      {
        id: "que-es",
        title: "Qué es una E.A.S.",
        paragraphs: [
          "La E.A.S. fue creada por la Ley 6480/2020. Es una sociedad por acciones con reglas pensadas para abrir rápido y sin trámites presenciales.",
        ],
        list: [
          "Puede tener uno o más accionistas, personas físicas o jurídicas, nacionales o extranjeras.",
          "La responsabilidad de los accionistas se limita a lo que aportaron.",
          "La ley no fija un capital mínimo, pero el capital tiene que constar en el estatuto.",
          "Se constituye por medios digitales en el SUACE, el Sistema Unificado de Apertura y Cierre de Empresas del Ministerio de Industria y Comercio (MIC).",
        ],
      },
      {
        id: "requisitos",
        title: "Qué necesitás antes de empezar",
        list: [
          "El nombre de la empresa, con una o dos alternativas por si el primero no está disponible.",
          "El objeto: a qué se va a dedicar la empresa.",
          "Quiénes son los accionistas, cuánto capital aporta cada uno y cómo se reparten las acciones.",
          "Quién la administra y quién la representa legalmente.",
          "Un domicilio en Paraguay.",
          "La cédula paraguaya del representante legal (si es extranjero, la cédula de residente) y el documento de cada accionista.",
          "La firma electrónica cualificada (FEC) de quienes firman los documentos de constitución.",
        ],
      },
      {
        id: "paso-a-paso",
        title: "Paso a paso",
        steps: [
          {
            title: "Definí la estructura",
            text: "Accionistas, capital, administración y objeto. Es lo que más conviene pensar al principio: cambiarlo después exige reformar el estatuto.",
          },
          {
            title: "Prepará el estatuto",
            text: "El estatuto fija las reglas de la empresa. Se puede partir del modelo del sistema o redactar uno a medida, que es lo recomendable cuando hay más de un socio.",
          },
          {
            title: "Firmá con firma electrónica cualificada",
            text: "Los documentos de constitución se firman con FEC. Si alguno de los firmantes no la tiene, primero se tramita con un prestador habilitado.",
          },
          {
            title: "Presentá el trámite en el SUACE",
            text: "Se completa el formulario en línea, se adjuntan los documentos firmados y se envía. El plazo de constitución es de hasta 72 horas hábiles.",
          },
          {
            title: "Inscripción y RUC",
            text: "Con el trámite aprobado, la E.A.S. queda inscripta y obtiene su RUC ante la DNIT, con sus obligaciones tributarias asignadas.",
          },
          {
            title: "Lo que sigue al día siguiente",
            text: "Habilitá la facturación (timbrado o factura electrónica), rubricá los libros, sacá la patente municipal e inscribite en el IPS y el MTESS si vas a contratar personal.",
          },
        ],
      },
      {
        id: "comparacion",
        title: "E.A.S., S.A. o S.R.L.",
        paragraphs: [
          "Las tres limitan la responsabilidad de los socios a sus aportes y pagan los mismos impuestos. Cambian la cantidad de socios, cómo se constituyen y cuánto tardan.",
        ],
        table: {
          caption: "Comparación entre E.A.S., S.A. y S.R.L. en Paraguay",
          columns: ["", "E.A.S.", "S.A.", "S.R.L."],
          rows: [
            ["Socios", "Desde 1 accionista", "Al menos 2 accionistas", "De 2 a 25 socios"],
            ["Capital", "En acciones, sin mínimo legal", "En acciones", "En cuotas"],
            ["Cómo se constituye", "En línea, en el SUACE", "Por escritura pública", "Por escritura pública"],
            ["Plazo habitual", "Hasta 72 horas hábiles", "Algunas semanas", "Algunas semanas"],
            [
              "Conviene para",
              "Un solo dueño, emprendedores, inversores extranjeros",
              "Empresas grandes o con muchos accionistas",
              "Empresas familiares o de pocos socios",
            ],
          ],
        },
      },
      {
        id: "errores",
        title: "Errores que conviene evitar",
        list: [
          "Copiar un objeto genérico que después no cubre la actividad real y complica cuentas bancarias y habilitaciones.",
          "No prever qué pasa si un socio quiere salir: el estatuto lo puede resolver desde el inicio.",
          "Olvidar las obligaciones del día después: el IVA y el IRE se declaran aunque la empresa todavía no facture.",
          "Designar como representante a alguien sin cédula paraguaya vigente: la DNIT la exige para el RUC.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta abrir una E.A.S.?",
        a: "Depende del estatuto (modelo o a medida), de la firma electrónica de cada firmante y de los trámites posteriores. Después de una primera consulta te pasamos un presupuesto cerrado.",
      },
      {
        q: "¿Un extranjero puede abrir una E.A.S.?",
        a: "Sí: puede ser accionista, incluso el único. Para ser representante legal ante la DNIT necesita cédula paraguaya vigente; si todavía no la tiene, puede designar como representante a otra persona.",
      },
      {
        q: "¿Necesito escribano para constituir una E.A.S.?",
        a: "No para constituirla: la E.A.S. se constituye en línea, con documentos firmados electrónicamente. Para otros actos, como aportar un inmueble a la empresa, sí puede hacer falta una escritura pública.",
      },
      {
        q: "¿La E.A.S. paga los mismos impuestos que una S.A.?",
        a: "Sí. En lo tributario es una empresa más: liquida IRE e IVA y, cuando distribuye utilidades, IDU. La diferencia con la S.A. está en lo societario, no en los impuestos.",
      },
    ],
    relatedServices: ["constitucion-de-sociedades", "extranjeros", "tramites-inscripciones"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guideSlugs = guides.map((g) => g.slug);
