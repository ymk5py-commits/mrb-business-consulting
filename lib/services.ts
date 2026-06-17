import {
  Calculator,
  ReceiptText,
  Building2,
  Users,
  ClipboardCheck,
  Stamp,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  icon: LucideIcon;
  /** Título corto para tarjetas y navegación */
  title: string;
  /** Descripción breve para la tarjeta del índice */
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  /** Etiqueta pequeña sobre el H1 */
  kicker: string;
  h1: string;
  /** Párrafo(s) introductorios de la landing */
  intro: string;
  /** Qué incluye el servicio */
  includes: string[];
  /** Para quién es */
  forWho: string;
  /** Puntos de valor / cómo trabajamos */
  highlights: { title: string; text: string }[];
  /** Preguntas frecuentes (también alimentan el FAQPage schema) */
  faqs: ServiceFaq[];
  /** Slugs de servicios relacionados */
  related: string[];
};

export const services: Service[] = [
  {
    slug: "contabilidad",
    icon: Calculator,
    title: "Contabilidad",
    excerpt:
      "Llevamos tu contabilidad mensual al día: registros, libros, estados financieros y conciliaciones, bajo las normas vigentes en Paraguay.",
    metaTitle: "Estudio Contable en Asunción | Servicios Contables — MRB",
    metaDescription:
      "Tercerizá la contabilidad de tu empresa con MRB. Registros contables, libros legales, estados financieros y conciliaciones bajo NIIF para PYMEs en Paraguay.",
    kicker: "Servicio contable",
    h1: "Contabilidad para empresas en Paraguay",
    intro:
      "Mantené la contabilidad de tu empresa ordenada y al día sin contratar un departamento interno. En MRB llevamos tus registros contables mes a mes, preparamos tus estados financieros y nos aseguramos de que cumplas con las obligaciones que exigen la DNIT y la legislación comercial paraguaya.",
    includes: [
      "Registración contable mensual de todas las operaciones",
      "Libros legales: Diario, Mayor e Inventario",
      "Estados financieros (Balance General y Estado de Resultados)",
      "Conciliaciones bancarias y de cuentas",
      "Aplicación de NIIF para PYMEs",
      "Asesoría contable permanente y cierre de ejercicio",
    ],
    forWho:
      "Empresas unipersonales, S.R.L., S.A. y E.A.S. que necesitan tercerizar su contabilidad con un equipo profesional y respuestas rápidas.",
    highlights: [
      {
        title: "Información al día",
        text: "Cerramos cada mes a tiempo para que tomes decisiones con números reales y actualizados.",
      },
      {
        title: "Cumplimiento garantizado",
        text: "Tus libros y registros quedan en regla frente a la DNIT y la normativa comercial.",
      },
      {
        title: "Un solo interlocutor",
        text: "Coordinamos contabilidad, impuestos y laboral desde un mismo estudio.",
      },
    ],
    faqs: [
      {
        q: "¿Quién está obligado a llevar contabilidad en Paraguay?",
        a: "Las personas jurídicas (S.A., S.R.L., E.A.S.) y los comerciantes alcanzados por el régimen general del IRE deben llevar contabilidad de acuerdo con la Ley del Comerciante y las normas de la DNIT. En MRB evaluamos tu caso y definimos el régimen contable que corresponde.",
      },
      {
        q: "¿Qué normas contables se aplican?",
        a: "En Paraguay se utilizan las NIIF para PYMEs como marco contable de referencia. Adaptamos el plan de cuentas y los reportes a tu actividad y a las exigencias de bancos, socios y entidades de control.",
      },
    ],
    related: ["impuestos", "auditoria-consultoria", "asesoria-laboral-ips"],
  },
  {
    slug: "impuestos",
    icon: ReceiptText,
    title: "Impuestos y fiscal",
    excerpt:
      "Liquidamos y presentamos tus impuestos (IVA, IRE, IRP, IDU) en Marangatú, con planificación tributaria y facturación electrónica.",
    metaTitle: "Asesoría Tributaria en Paraguay | Liquidación de Impuestos — MRB",
    metaDescription:
      "Liquidación y presentación de IVA, IRE, IRP e IDU ante la DNIT (Marangatú). Planificación fiscal, retenciones y facturación electrónica (SIFEN) en Paraguay.",
    kicker: "Servicio fiscal",
    h1: "Asesoría tributaria e impuestos en Paraguay",
    intro:
      "Pagá lo justo y en término. En MRB liquidamos, presentamos y planificamos los impuestos de tu empresa ante la DNIT a través del sistema Marangatú, evitando multas, recargos y pagos de más. Te acompañamos durante todo el calendario tributario.",
    includes: [
      "Liquidación mensual de IVA (10% y 5%)",
      "Declaración del IRE (Impuesto a la Renta Empresarial)",
      "Impuesto a la Renta Personal (IRP) e IDU sobre dividendos",
      "Cálculo y presentación de retenciones",
      "Presentación de declaraciones juradas en Marangatú",
      "Timbrado y facturación electrónica (SIFEN / Ekuatia’i)",
      "Planificación tributaria y representación ante la DNIT",
    ],
    forWho:
      "Empresas y profesionales que quieren cumplir con la DNIT sin sobresaltos y optimizar su carga impositiva dentro del marco legal.",
    highlights: [
      {
        title: "Sin multas ni recargos",
        text: "Controlamos cada vencimiento del calendario tributario para que nunca presentes fuera de plazo.",
      },
      {
        title: "Planificación fiscal",
        text: "Estructuramos tus operaciones para que pagues lo que corresponde, ni un guaraní de más.",
      },
      {
        title: "Listos para SIFEN",
        text: "Te acompañamos en la transición a la facturación electrónica obligatoria.",
      },
    ],
    faqs: [
      {
        q: "¿Qué impuestos paga una empresa en Paraguay?",
        a: "Principalmente el IVA (10% o 5%), el IRE (Impuesto a la Renta Empresarial, 10%) y el IDU sobre la distribución de dividendos y utilidades. Según la actividad pueden aplicar retenciones y otros tributos. En MRB armamos tu mapa tributario completo.",
      },
      {
        q: "¿Qué es Marangatú?",
        a: "Marangatú es el sistema de gestión tributaria de la DNIT (ex SET) donde se presentan las declaraciones juradas y se administra el RUC. Nosotros operamos por vos: liquidamos, declaramos y conservamos los comprobantes de presentación.",
      },
      {
        q: "¿Qué es el IRE?",
        a: "El IRE es el Impuesto a la Renta Empresarial, con una tasa general del 10% sobre la utilidad neta, vigente desde la reforma tributaria (Ley 6380/2019). Determinamos el régimen que más te conviene (general, SIMPLE o RESIMPLE).",
      },
    ],
    related: ["contabilidad", "constitucion-de-sociedades", "auditoria-consultoria"],
  },
  {
    slug: "constitucion-de-sociedades",
    icon: Building2,
    title: "Constitución de sociedades",
    excerpt:
      "Constituimos tu empresa de principio a fin: S.A., S.R.L., E.A.S. o unipersonal, con estatutos, inscripción y RUC.",
    metaTitle: "Constituir una Empresa en Paraguay | S.A., S.R.L., E.A.S. — MRB",
    metaDescription:
      "Constitución de empresas en Paraguay llave en mano: S.A., S.R.L., E.A.S. (Ley 6480/2020) y unipersonal. Estatutos, inscripción en Registros Públicos y RUC.",
    kicker: "Servicio societario",
    h1: "Constitución de sociedades en Paraguay",
    intro:
      "Abrí tu empresa bien desde el primer día. En MRB te asesoramos para elegir el tipo societario correcto y nos encargamos de todo el proceso de constitución: redacción de estatutos, inscripción ante los Registros Públicos y obtención del RUC, para que arranques a operar sin demoras.",
    includes: [
      "Asesoría para elegir el tipo societario (S.A., S.R.L., E.A.S., E.I.R.L. o unipersonal)",
      "Redacción de estatutos y contrato social",
      "Escritura pública y trámites notariales",
      "Inscripción en la Dirección General de los Registros Públicos",
      "Gestión ante la Abogacía del Tesoro",
      "Obtención del RUC y alta ante la DNIT",
      "Rubricación de libros sociales y contables",
    ],
    forWho:
      "Emprendedores, inversores locales y extranjeros que quieren formalizar su negocio en Paraguay de forma rápida y segura.",
    highlights: [
      {
        title: "Elegís bien desde el inicio",
        text: "Te explicamos las ventajas de cada figura (responsabilidad, impuestos, socios) antes de constituir.",
      },
      {
        title: "Proceso llave en mano",
        text: "Coordinamos escribanía, registros y DNIT; vos solo firmás lo necesario.",
      },
      {
        title: "Lista para facturar",
        text: "Salís con RUC, timbrado y libros para empezar a operar y facturar legalmente.",
      },
    ],
    faqs: [
      {
        q: "¿Qué es una E.A.S. y por qué conviene?",
        a: "La Empresa por Acciones Simplificadas (E.A.S.), creada por la Ley 6480/2020, es la figura más ágil y moderna: se puede constituir de forma simplificada, con uno o más accionistas y sin capital mínimo elevado. Es ideal para emprendedores y startups.",
      },
      {
        q: "¿Cuál es la diferencia entre S.A. y S.R.L.?",
        a: "La S.A. (Sociedad Anónima) divide su capital en acciones y es habitual para empresas más grandes o con inversores; la S.R.L. (Sociedad de Responsabilidad Limitada) divide el capital en cuotas y suele ser más simple para PYMEs. Te ayudamos a decidir según tu proyecto.",
      },
      {
        q: "¿Cuánto tarda constituir una empresa en Paraguay?",
        a: "Depende del tipo societario y de los registros. Una E.A.S. puede constituirse en pocos días, mientras que una S.A. tradicional lleva algunas semanas. En MRB gestionamos todo el circuito para acortar los plazos al máximo.",
      },
    ],
    related: ["impuestos", "asesoria-legal-societaria", "tramites-inscripciones"],
  },
  {
    slug: "asesoria-laboral-ips",
    icon: Users,
    title: "Asesoría laboral e IPS",
    excerpt:
      "Liquidación de salarios, aportes al IPS e inscripciones ante el MTESS, con tus planillas y contratos en regla.",
    metaTitle: "Asesoría Laboral e IPS en Paraguay | Liquidación de Salarios — MRB",
    metaDescription:
      "Liquidación de nómina, aportes al IPS, inscripción patronal y trámites ante el MTESS en Paraguay. Contratos, aguinaldo y liquidaciones laborales en regla.",
    kicker: "Servicio laboral",
    h1: "Asesoría laboral e IPS en Paraguay",
    intro:
      "Gestioná tu personal sin riesgos. En MRB nos ocupamos de la liquidación de salarios, los aportes al IPS y los trámites ante el Ministerio de Trabajo (MTESS), para que cumplas con la legislación laboral y previsional paraguaya y evites contingencias.",
    includes: [
      "Liquidación de salarios, horas extras y aguinaldo",
      "Cálculo y pago de aportes al IPS (obrero y patronal)",
      "Inscripción patronal y alta de trabajadores",
      "Contratos de trabajo y registro en el MTESS",
      "Planillas laborales y comunicaciones obligatorias",
      "Liquidaciones finales y cálculo de beneficios",
    ],
    forWho:
      "Empresas con empleados que necesitan ordenar su nómina y cumplir con IPS y el MTESS sin destinar un área interna a ello.",
    highlights: [
      {
        title: "Cumplimiento previsional",
        text: "Tus aportes al IPS se calculan y presentan correctamente, sin deudas ni sanciones.",
      },
      {
        title: "Relaciones laborales sólidas",
        text: "Contratos y planillas bien armados que te protegen ante cualquier reclamo.",
      },
      {
        title: "Nómina puntual",
        text: "Tu personal cobra en fecha y con recibos claros, todos los meses.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto se aporta al IPS en Paraguay?",
        a: "El aporte al IPS se compone de una parte a cargo del trabajador y otra a cargo del empleador sobre el salario. En MRB calculamos los porcentajes vigentes, retenemos y presentamos los aportes para mantener a tu empresa al día.",
      },
      {
        q: "¿Es obligatorio inscribir a los empleados en el IPS?",
        a: "Sí. Todo empleador debe inscribirse como patronal y dar de alta a sus trabajadores en el IPS desde el inicio de la relación laboral. Nos encargamos de la inscripción y de las novedades mensuales.",
      },
    ],
    related: ["contabilidad", "tramites-inscripciones", "impuestos"],
  },
  {
    slug: "auditoria-consultoria",
    icon: ClipboardCheck,
    title: "Auditoría y consultoría",
    excerpt:
      "Auditoría de estados financieros, revisión tributaria preventiva, due diligence y consultoría de gestión.",
    metaTitle: "Auditoría Financiera y Consultoría en Paraguay — MRB",
    metaDescription:
      "Auditoría de estados financieros, auditoría tributaria preventiva, due diligence y consultoría de gestión para empresas en Paraguay. Informes confiables para bancos y socios.",
    kicker: "Servicio de auditoría",
    h1: "Auditoría y consultoría en Paraguay",
    intro:
      "Tomá decisiones sobre información confiable. En MRB auditamos tus estados financieros, revisamos tu situación tributaria de forma preventiva y te brindamos consultoría de gestión para que tu empresa crezca sobre bases sólidas y transparentes.",
    includes: [
      "Auditoría de estados financieros",
      "Auditoría tributaria preventiva (revisión ante la DNIT)",
      "Due diligence para compras, fusiones e inversiones",
      "Informes para bancos, directorios y socios",
      "Revisión de control interno y procesos",
      "Consultoría financiera y de gestión",
    ],
    forWho:
      "Empresas que necesitan validar sus números ante terceros, prepararse para una inversión o detectar riesgos antes de que se conviertan en problemas.",
    highlights: [
      {
        title: "Mirada independiente",
        text: "Un análisis objetivo que da confianza a bancos, inversores y socios.",
      },
      {
        title: "Riesgos bajo control",
        text: "Detectamos contingencias contables y tributarias antes de que generen costos.",
      },
      {
        title: "Decisiones informadas",
        text: "Traducimos los números en recomendaciones concretas de gestión.",
      },
    ],
    faqs: [
      {
        q: "¿Qué empresas necesitan auditoría en Paraguay?",
        a: "Algunas empresas requieren auditoría externa por su tamaño, por exigencias de bancos o entidades reguladoras, o por decisión de sus socios. Incluso cuando no es obligatoria, una auditoría aporta confianza y orden. Evaluamos tu caso sin compromiso.",
      },
      {
        q: "¿Qué es un due diligence?",
        a: "Es una revisión integral (contable, tributaria y financiera) que se realiza antes de comprar, vender o invertir en una empresa, para conocer su situación real y los riesgos involucrados. En MRB elaboramos el informe que respalda tu decisión.",
      },
    ],
    related: ["contabilidad", "impuestos", "asesoria-legal-societaria"],
  },
  {
    slug: "tramites-inscripciones",
    icon: Stamp,
    title: "Trámites e inscripciones",
    excerpt:
      "RUC, patente municipal, habilitaciones, inscripción patronal y registro de marca: gestionamos tus trámites de principio a fin.",
    metaTitle: "Inscripción de RUC y Trámites Empresariales en Paraguay — MRB",
    metaDescription:
      "Gestión de RUC ante la DNIT, patente municipal de Asunción, habilitaciones, inscripción IPS/MTESS y registro de marca (DINAPI) en Paraguay. Trámites llave en mano.",
    kicker: "Servicio de gestoría",
    h1: "Trámites e inscripciones empresariales en Paraguay",
    intro:
      "Olvidate de las filas y los trámites. En MRB gestionamos las inscripciones y habilitaciones que tu empresa necesita para operar formalmente: desde el RUC ante la DNIT hasta la patente municipal y el registro de tu marca.",
    includes: [
      "Inscripción y actualización del RUC ante la DNIT",
      "Patente comercial municipal (Municipalidad de Asunción y otras)",
      "Habilitación de locales comerciales",
      "Inscripción patronal en IPS y MTESS",
      "Registro de marca ante la DINAPI",
      "Gestiones y representación ante entidades públicas",
    ],
    forWho:
      "Negocios nuevos y en marcha que necesitan completar inscripciones, habilitaciones o registros sin perder tiempo en oficinas públicas.",
    highlights: [
      {
        title: "Trámites sin vueltas",
        text: "Conocemos los circuitos y los requisitos; evitamos rechazos y demoras.",
      },
      {
        title: "Operás en regla",
        text: "Tu empresa queda habilitada y registrada para facturar y trabajar legalmente.",
      },
      {
        title: "Tu marca protegida",
        text: "Registramos tu nombre comercial y logo ante la DINAPI.",
      },
    ],
    faqs: [
      {
        q: "¿Cómo se saca el RUC en Paraguay?",
        a: "El RUC (Registro Único del Contribuyente) se tramita ante la DNIT y es el primer paso para facturar legalmente. Reunimos la documentación, realizamos la inscripción y te entregamos el RUC activo con su clave de acceso a Marangatú.",
      },
      {
        q: "¿Qué es la patente municipal?",
        a: "Es la habilitación que otorga la municipalidad para ejercer una actividad comercial en su jurisdicción. Gestionamos la patente y la habilitación del local para que tu negocio opere sin inconvenientes.",
      },
    ],
    related: ["constitucion-de-sociedades", "asesoria-laboral-ips", "impuestos"],
  },
  {
    slug: "asesoria-legal-societaria",
    icon: Scale,
    title: "Asesoría legal societaria",
    excerpt:
      "Reformas de estatutos, actas, aumentos de capital, transferencia de acciones y gobierno corporativo.",
    metaTitle: "Asesoría Legal Societaria en Paraguay — MRB Business Consulting",
    metaDescription:
      "Asesoría legal societaria en Paraguay: reformas de estatutos, actas de asamblea y directorio, aumentos de capital, transferencia de acciones y gobierno corporativo.",
    kicker: "Servicio legal",
    h1: "Asesoría legal societaria en Paraguay",
    intro:
      "Acompañamos la vida jurídica de tu empresa. En MRB asesoramos en todas las decisiones societarias —desde reformas de estatutos y actas hasta aumentos de capital y transferencias— para que cada cambio quede correctamente documentado e inscripto.",
    includes: [
      "Reforma y modificación de estatutos",
      "Actas de asamblea y de directorio",
      "Aumentos y reducciones de capital",
      "Transferencia de acciones y cesión de cuotas",
      "Contratos societarios y comerciales",
      "Gobierno corporativo y cumplimiento",
      "Disolución y liquidación de sociedades",
    ],
    forWho:
      "Sociedades que necesitan formalizar decisiones, incorporar o retirar socios, o mantener su documentación legal al día.",
    highlights: [
      {
        title: "Decisiones bien documentadas",
        text: "Cada asamblea, acta y reforma queda redactada e inscripta como corresponde.",
      },
      {
        title: "Cambios societarios seguros",
        text: "Incorporás socios, aumentás capital o transferís acciones con respaldo legal.",
      },
      {
        title: "Visión integral",
        text: "Coordinamos lo legal con lo contable e impositivo para que todo cierre.",
      },
    ],
    faqs: [
      {
        q: "¿Cuándo se debe reformar el estatuto de una empresa?",
        a: "Cuando cambian elementos esenciales de la sociedad: domicilio, objeto, capital, autoridades o tipo societario. La reforma debe aprobarse en asamblea e inscribirse en los Registros Públicos. Nosotros redactamos y gestionamos todo el proceso.",
      },
      {
        q: "¿Qué son las actas de asamblea?",
        a: "Son los documentos que registran las decisiones tomadas por los socios o accionistas. Llevar las actas en regla es obligatorio y protege a la sociedad. En MRB redactamos y resguardamos tus libros de actas.",
      },
    ],
    related: ["constitucion-de-sociedades", "auditoria-consultoria", "impuestos"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
