import {
  Calculator,
  ReceiptText,
  Building2,
  Users,
  ClipboardCheck,
  Stamp,
  Scale,
  UserRound,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  icon: LucideIcon;
  /** Título corto para tarjetas y navegación */
  title: string;
  /**
   * El servicio dicho dentro de una frase («te asesoramos sobre …»), con sus mayúsculas.
   * No derivarlo de `title` en minúscula: rompe siglas como IPS y deja frases sin sentido.
   */
  topic: string;
  /** Pregunta de la banda final de la página del servicio, escrita para quien la necesita */
  ctaTitle: string;
  /** Para quién es, en dos o tres palabras: la columna derecha del índice de servicios */
  audience: string;
  /**
   * Qué cifra de la cartera mostrar en el recuadro del servicio. Por defecto, el total
   * de clientes; en personas físicas, cuántas personas físicas atiende el estudio.
   */
  clientStat?: "individuals";
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
  /** Guía relacionada (slug de lib/guides.ts), si la hay */
  guide?: string;
};

export const services: Service[] = [
  {
    slug: "contabilidad",
    icon: Calculator,
    title: "Contabilidad",
    audience: "Empresas",
    topic: "la contabilidad de tu empresa",
    ctaTitle: "¿Querés tus números al día todos los meses?",
    excerpt:
      "Llevamos tu contabilidad mensual al día: registros, libros, estados financieros y conciliaciones, bajo las normas vigentes en Paraguay.",
    metaTitle: "Contador para Empresas en Asunción: Outsourcing | MRB",
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
        title: "Libros en regla",
        text: "Llevamos tus libros y registros según lo que exigen la DNIT y la normativa comercial.",
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
    audience: "Empresas y profesionales",
    topic: "tus impuestos y vencimientos",
    ctaTitle: "¿Querés declarar a tiempo y sin multas?",
    excerpt:
      "Liquidamos y presentamos tus impuestos (IVA, IRE, IRP, IDU) en Marangatú, con planificación tributaria y facturación electrónica.",
    metaTitle: "Asesoría Tributaria en Paraguay: IVA, IRE e IRP | MRB",
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
        title: "Vencimientos bajo control",
        text: "Seguimos cada vencimiento del calendario tributario para que no presentes fuera de plazo.",
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
        q: "¿Qué impuestos paga una empresa (S.A., S.R.L. o E.A.S.) en Paraguay?",
        a: "Principalmente el IVA (10% o 5%), el IRE (Impuesto a la Renta Empresarial, 10%) y el IDU sobre la distribución de dividendos y utilidades. Según la actividad pueden aplicar retenciones y otros tributos. En MRB armamos tu mapa tributario completo.",
      },
      {
        q: "¿Qué es Marangatú?",
        a: "Marangatú es el sistema en línea de la DNIT (ex SET) para presentar declaraciones juradas, administrar el RUC y pagar impuestos en Paraguay. En MRB operamos por vos: liquidamos, declaramos y conservamos los comprobantes de presentación.",
      },
      {
        q: "¿Qué es el IRE?",
        a: "El IRE es el Impuesto a la Renta Empresarial, con una tasa general del 10% sobre la utilidad neta, vigente desde la reforma tributaria (Ley 6380/2019). Determinamos el régimen que más te conviene (general, SIMPLE o RESIMPLE).",
      },
      {
        q: "¿Cuándo vence el IVA en Paraguay?",
        a: "El IVA se declara todos los meses con el Formulario 120. El vencimiento lo fija el calendario perpetuo de la DNIT según el último dígito del RUC (sin el dígito verificador): va del día 7 al 25 del mes siguiente y, si cae en un día inhábil, pasa al siguiente día hábil. En MRB controlamos ese calendario por vos.",
      },
      {
        q: "¿Necesito un contador si trabajo como profesional independiente?",
        a: "Si facturás por tus servicios, tenés que estar inscripto en el RUC, emitir comprobantes válidos y presentar tus declaraciones de IVA y, si tus ingresos superan el mínimo que fija la ley, del IRP. En MRB tramitamos tu RUC y llevamos tus liquidaciones aunque no tengas una empresa constituida.",
      },
    ],
    related: ["contabilidad", "personas-fisicas", "constitucion-de-sociedades"],
  },
  {
    slug: "personas-fisicas",
    icon: UserRound,
    title: "Personas físicas y profesionales",
    audience: "Profesionales y unipersonales",
    clientStat: "individuals",
    topic: "tus impuestos como persona física",
    ctaTitle: "¿Trabajás por tu cuenta?",
    excerpt:
      "RUC, IVA, IRP y factura electrónica para profesionales independientes, comercios unipersonales y quienes cobran alquileres.",
    metaTitle: "Contador para Personas Físicas en Paraguay: IVA e IRP | MRB",
    metaDescription:
      "Contador para profesionales independientes y personas físicas en Paraguay: RUC, IVA mensual, IRP, RESIMPLE y factura electrónica, al día ante la DNIT.",
    kicker: "Servicio para personas",
    h1: "Contador para personas físicas y profesionales en Paraguay",
    intro:
      "Si trabajás por tu cuenta, cobrás alquileres o tenés un comercio unipersonal, la DNIT te pide lo mismo que a una empresa: RUC, comprobantes, declaraciones y plazos. En MRB nos ocupamos de todo eso para que vos te dediques a tu trabajo, y te avisamos antes de cada vencimiento.",
    includes: [
      "Inscripción o actualización del RUC y de tus obligaciones ante la DNIT",
      "Liquidación mensual del IVA y presentación en Marangatú",
      "Declaración anual del IRP por servicios personales o por rentas del capital",
      "Comercios unipersonales: IRE RESIMPLE, IRE SIMPLE o régimen general",
      "Alta y acompañamiento en la factura electrónica (e-Kuatia o e-Kuatia'i)",
      "Registro de compras y ventas, y control de tus comprobantes",
      "Certificado de cumplimiento tributario cuando te lo pidan",
      "Respuesta a notificaciones de la DNIT",
    ],
    forWho:
      "Profesionales independientes (médicos, abogados, arquitectos, consultores, programadores, docentes), comerciantes unipersonales, quienes cobran alquileres y asalariados que además facturan por su cuenta o superan el monto a partir del cual se paga IRP.",
    highlights: [
      {
        title: "Vencimientos a tiempo",
        text: "Tus fechas dependen del último dígito de tu RUC: te avisamos antes y presentamos por vos.",
      },
      {
        title: "El régimen que te conviene",
        text: "Revisamos tus ingresos para ver si te corresponde RESIMPLE, IRE SIMPLE, IVA o IRP, y en qué orden.",
      },
      {
        title: "Un IRP sin sorpresas",
        text: "Ordenamos tus comprobantes durante el año para que la declaración anual no te tome desprevenido.",
      },
    ],
    faqs: [
      {
        q: "¿Cuándo tengo que pagar IRP?",
        a: "Si sos persona física y tus ingresos brutos gravados por servicios personales superan Gs.\u00a080.000.000 en el año, estás alcanzado por el IRP. Se paga sobre la renta neta, con tasas progresivas del 8\u00a0%, 9\u00a0% y 10\u00a0%. Las rentas y ganancias del capital, como los alquileres, tributan al 8\u00a0%.",
      },
      {
        q: "¿Qué es el IRE RESIMPLE y quién puede usarlo?",
        a: "Es el régimen más simple para empresas unipersonales con ingresos de hasta Gs.\u00a080.000.000 al año: en lugar de liquidar el IRE común se paga una cuota fija y se presenta una declaración anual. Si tus ingresos superan ese monto, pasás al IRE SIMPLE (hasta Gs.\u00a02.000 millones al año) o al régimen general.",
      },
      {
        q: "¿Estoy obligado a emitir factura electrónica?",
        a: "La DNIT incorpora a los contribuyentes por grupos, con un cronograma que avanza hasta 2027, y cualquiera puede adherirse antes en forma voluntaria. Para los pequeños contribuyentes existe e-Kuatia'i, el facturador gratuito de la DNIT. Revisamos si ya fuiste designado y te dejamos facturando.",
      },
      {
        q: "¿Qué pasa si presento el IVA fuera de plazo?",
        a: "Corresponde una multa por presentación tardía y, si había impuesto a pagar, intereses y recargos por mora. Cuanto antes se regulariza, menor es el costo: te ayudamos a ponerte al día y a que no se repita.",
      },
      {
        q: "¿Puedo descontar gastos en el IRP?",
        a: "Sí. En el IRP por servicios personales se deducen los gastos relacionados con tu actividad y otros que la ley admite, siempre con comprobantes legales emitidos a tu nombre. Por eso conviene ordenar las facturas durante todo el año y no en el último mes.",
      },
    ],
    related: ["impuestos", "contabilidad", "tramites-inscripciones"],
  },
  {
    slug: "constitucion-de-sociedades",
    icon: Building2,
    title: "Constitución de sociedades",
    audience: "Emprendedores e inversores",
    topic: "la constitución de tu sociedad",
    ctaTitle: "¿Vas a abrir tu empresa?",
    excerpt:
      "Constituimos tu empresa de principio a fin: S.A., S.R.L., E.A.S. o unipersonal, con estatutos, inscripción y RUC.",
    metaTitle: "Constituir Empresa en Paraguay (S.A., S.R.L., E.A.S.) | MRB",
    metaDescription:
      "Constituí tu empresa en Paraguay llave en mano: E.A.S. (Ley 6480/2020), S.A., S.R.L. o unipersonal. Estatutos, escritura, RUC y libros, con plazos claros.",
    kicker: "Servicio societario",
    h1: "Constitución de sociedades en Paraguay",
    intro:
      "Abrí tu empresa bien desde el primer día. En MRB te asesoramos para elegir el tipo societario correcto y nos encargamos de todo el proceso de constitución: redacción de estatutos, escritura pública y obtención del RUC, para que arranques a operar sin demoras.",
    includes: [
      "Asesoría para elegir el tipo societario (S.A., S.R.L., E.A.S., E.I.R.L. o unipersonal)",
      "Redacción de estatutos y contrato social",
      "Escritura pública y trámites notariales",
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
        q: "¿Qué es una E.A.S. y cómo se constituye?",
        a: "La Empresa por Acciones Simplificadas (E.A.S.), creada por la Ley 6480/2020, puede tener uno o más accionistas —personas físicas o jurídicas— y la ley no exige capital mínimo. Se constituye 100\u00a0% en línea por el SUACE del Ministerio de Industria y Comercio, en hasta 72 horas hábiles. Es ideal para emprendedores y startups.",
      },
      {
        q: "¿Cuál es la diferencia entre S.A. y S.R.L.?",
        a: "La S.A. (Sociedad Anónima) divide su capital en acciones y es habitual para empresas más grandes o con inversores; la S.R.L. (Sociedad de Responsabilidad Limitada) divide el capital en cuotas y suele ser más simple para PYMEs. Te ayudamos a decidir según tu proyecto.",
      },
      {
        q: "¿Cuánto tarda constituir una empresa en Paraguay?",
        a: "Depende del tipo societario. Una E.A.S. se constituye en línea por el SUACE en hasta 72 horas hábiles; una S.A. o una S.R.L. requiere escritura pública y suele llevar algunas semanas. En MRB gestionamos todo el circuito para acortar los plazos.",
      },
    ],
    related: ["extranjeros", "asesoria-legal-societaria", "impuestos"],
    guide: "como-constituir-una-eas-en-paraguay",
  },
  {
    slug: "extranjeros",
    icon: Globe,
    title: "Extranjeros e inversión",
    audience: "Inversores de otros países",
    topic: "tu inversión y tus trámites en Paraguay",
    ctaTitle: "¿Venís a invertir en Paraguay?",
    excerpt:
      "Para quienes llegan a Paraguay a invertir: constancia de inversionista, empresa, RUC e impuestos desde el primer día.",
    metaTitle: "Abrir una Empresa en Paraguay Siendo Extranjero | MRB",
    metaDescription:
      "¿Sos extranjero y querés invertir en Paraguay? Te guiamos con la Constancia de Inversionista, tu E.A.S. o S.A., el RUC y los impuestos, de principio a fin.",
    kicker: "Servicio para extranjeros",
    h1: "Abrí tu empresa en Paraguay siendo extranjero",
    intro:
      "La Ley 117/91 le da al inversor extranjero los mismos derechos que al nacional, y una empresa puede tener capital 100\u00a0% extranjero. Lo que cambia es el orden de los trámites: primero tu situación migratoria y tus documentos, después la sociedad y el RUC. En MRB coordinamos cada paso y, una vez que operás, llevamos tu contabilidad e impuestos.",
    includes: [
      "Diagnóstico de tu caso: residencia, tipo de inversión y figura societaria",
      "Gestión de la Constancia de Inversionista Extranjero ante el SUACE del MIC",
      "Acompañamiento en la residencia y la cédula paraguaya",
      "Constitución de tu E.A.S., S.A. o S.R.L.",
      "RUC de la empresa y alta de sus obligaciones ante la DNIT",
      "Inscripción como empleador en el IPS y el MTESS si vas a contratar",
      "Contabilidad e impuestos mensuales desde que empezás a operar",
      "Cada documento explicado antes de firmar",
    ],
    forWho:
      "Inversores, emprendedores y profesionales de otros países que se instalan en Paraguay, o que quieren operar aquí con una empresa propia, solos o con socios locales.",
    highlights: [
      {
        title: "El orden correcto",
        text: "Empezamos por lo migratorio y lo documental, para que la sociedad y el RUC no se traben después.",
      },
      {
        title: "Un solo interlocutor",
        text: "Coordinamos MIC, escribanía, DNIT, IPS y MTESS; vos recibís un plan con fechas.",
      },
      {
        title: "Después de abrir, también",
        text: "Seguimos con la contabilidad y los impuestos mensuales, para que tu empresa nazca y siga en regla.",
      },
    ],
    faqs: [
      {
        q: "¿Un extranjero puede tener una empresa 100\u00a0% propia en Paraguay?",
        a: "Sí. La Ley 117/91 de Inversiones da al inversor extranjero las mismas garantías, derechos y obligaciones que al nacional, y una E.A.S. puede constituirse con un solo accionista, persona física o jurídica.",
      },
      {
        q: "¿Qué es la Constancia de Inversionista Extranjero?",
        a: "Es un documento que emite el Ministerio de Industria y Comercio a través del SUACE y que te permite tramitar la residencia permanente como inversionista. Se piden, entre otros, el formulario de solicitud, tu pasaporte o documento extranjero y los antecedentes penales del país de origen, legalizados o apostillados.",
      },
      {
        q: "¿Necesito cédula paraguaya para abrir la empresa?",
        a: "Para ser representante legal ante la DNIT, sí: si el representante es extranjero, tiene que presentar una cédula de identidad paraguaya vigente. Por eso conviene empezar la residencia antes o designar como representante a alguien que ya la tenga.",
      },
      {
        q: "¿Cuánto tarda todo el proceso?",
        a: "Depende de tu situación migratoria y del tipo de sociedad. Una E.A.S. se constituye en línea en hasta 72 horas hábiles cuando los documentos y las firmas están listos; lo que más tiempo lleva suele ser la residencia. En la primera reunión te damos un cronograma para tu caso.",
      },
      {
        q: "¿Qué impuestos paga una empresa en Paraguay?",
        a: "En general, el IRE (10\u00a0% sobre la renta neta), el IVA (10\u00a0% la tasa general) y el IDU cuando se distribuyen utilidades. Si contratás personal, también los aportes al IPS. Antes de empezar te explicamos cuáles aplican a tu actividad.",
      },
    ],
    related: ["constitucion-de-sociedades", "tramites-inscripciones", "impuestos"],
    guide: "como-constituir-una-eas-en-paraguay",
  },
  {
    slug: "asesoria-laboral-ips",
    icon: Users,
    title: "Asesoría laboral e IPS",
    audience: "Empresas con empleados",
    topic: "sueldos, contratos y aportes al IPS",
    ctaTitle: "¿Tenés o vas a contratar empleados?",
    excerpt:
      "Liquidación de salarios, aportes al IPS e inscripciones ante el MTESS, con tus planillas y contratos en regla.",
    metaTitle: "Payroll, Sueldos y Asesoría Laboral en Paraguay | MRB",
    metaDescription:
      "Liquidación de sueldos, aguinaldo y aportes al IPS en Paraguay. Contratos, planillas y trámites ante el MTESS para que tu empresa cumpla sin contingencias.",
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
        a: "El aporte obrero es del 9\u00a0% y el patronal del 16,5\u00a0% (total 25,5\u00a0%) sobre el salario. El empleador retiene la parte del trabajador y deposita ambos aportes en el IPS cada mes. En MRB los calculamos, retenemos y presentamos para mantener a tu empresa al día.",
      },
      {
        q: "¿Es obligatorio inscribir a los empleados en el IPS?",
        a: "Sí. Todo empleador debe inscribirse como patronal y dar de alta a sus trabajadores en el IPS desde el inicio de la relación laboral. Nos encargamos de la inscripción y de las novedades mensuales.",
      },
      {
        q: "¿Cuándo se paga el aguinaldo?",
        a: "Hasta el 31 de diciembre. Es la doceava parte (1/12) de todo lo que el trabajador cobró en el año.",
      },
    ],
    related: ["contabilidad", "tramites-inscripciones", "impuestos"],
  },
  {
    slug: "auditoria-consultoria",
    icon: ClipboardCheck,
    title: "Auditoría y consultoría",
    audience: "Empresas",
    topic: "auditorías y consultoría",
    ctaTitle: "¿Un banco o un inversor pide tus números?",
    excerpt:
      "Auditoría de estados financieros, revisión tributaria preventiva, due diligence y consultoría de gestión.",
    metaTitle: "Auditoría Financiera y Consultoría en Paraguay | MRB",
    metaDescription:
      "Auditoría de estados financieros, revisión tributaria preventiva, due diligence y consultoría para empresas en Paraguay. Informes para bancos y socios.",
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
    audience: "Negocios nuevos y en marcha",
    topic: "trámites e inscripciones",
    ctaTitle: "¿Tenés un trámite o una inscripción pendiente?",
    excerpt:
      "RUC, patente municipal, habilitaciones, inscripción patronal y registro de marca: gestionamos tus trámites de principio a fin.",
    metaTitle: "Inscripción de RUC y Trámites en Paraguay | MRB",
    metaDescription:
      "RUC, patente municipal, habilitaciones, inscripción IPS/MTESS y registro de marca (DINAPI) en Paraguay. Trámites llave en mano para empresas y personas.",
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
        q: "¿Puedo sacar el RUC como persona física?",
        a: "Sí. Los profesionales independientes y quienes venden o prestan servicios a título personal se inscriben en el RUC como persona física ante la DNIT. Te ayudamos con la inscripción, la clave de acceso a Marangatú y las obligaciones que te corresponden según tu actividad.",
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
    audience: "Sociedades",
    topic: "actas, estatutos y cambios societarios",
    ctaTitle: "¿Cambian los socios o el capital de tu empresa?",
    excerpt:
      "Reformas de estatutos, actas, aumentos de capital, transferencia de acciones y gobierno corporativo.",
    metaTitle: "Asesoría Societaria en Paraguay: Estatutos y Actas | MRB",
    metaDescription:
      "Reformas de estatutos, actas de asamblea y directorio, aumentos de capital, transferencia de acciones y gobierno corporativo para sociedades en Paraguay.",
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
        a: "Cuando cambian elementos esenciales de la sociedad: domicilio, objeto, capital, autoridades o tipo societario. La reforma debe aprobarse en asamblea y formalizarse ante escribano. Nosotros redactamos y gestionamos todo el proceso.",
      },
      {
        q: "¿Qué son las actas de asamblea?",
        a: "Son los documentos que registran las decisiones tomadas por los socios o accionistas. Llevar las actas en regla es obligatorio y protege a la sociedad. En MRB redactamos y resguardamos tus libros de actas.",
      },
    ],
    related: ["constitucion-de-sociedades", "auditoria-consultoria", "impuestos"],
  },
];

/** Última actualización del contenido de servicios (se muestra en cada página). */
export const SERVICES_UPDATED_AT = "2026-11-17";

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

/**
 * Los servicios en tres grupos de tres, con criterios que no se mezclan: lo que te pasa a vos
 * (abrir una empresa, trabajar por tu cuenta, venir de afuera), lo que una empresa necesita
 * todos los meses y lo que necesita cuando llega el momento. Así quien entra por primera vez
 * elige primero su situación y nunca enfrenta más de tres opciones juntas.
 */
export const serviceGroups: { title: string; services: Service[] }[] = [
  {
    title: "Según tu situación",
    slugs: ["constitucion-de-sociedades", "personas-fisicas", "extranjeros"],
  },
  {
    title: "Mes a mes",
    slugs: ["contabilidad", "impuestos", "asesoria-laboral-ips"],
  },
  {
    title: "Cuando lo necesitás",
    slugs: ["auditoria-consultoria", "tramites-inscripciones", "asesoria-legal-societaria"],
  },
].map(({ title, slugs }) => ({
  title,
  services: slugs.map((slug) => {
    const service = getService(slug);
    if (!service) throw new Error(`serviceGroups: no existe el servicio "${slug}"`);
    return service;
  }),
}));
