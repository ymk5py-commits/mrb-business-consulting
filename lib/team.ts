import { GraduationCap, BookOpenCheck, Scale, type LucideIcon } from "lucide-react";

/* ============================================================
 * MRB Business Consulting — Equipo
 * ============================================================
 * La sección de /nosotros (y el retrato del home) se construyen a partir
 * de este archivo. Los datos de Manuel salen de su CV (sept. 2026).
 * ============================================================ */

export type Credential = {
  /** Define el ícono: título de grado, diplomado o especialidad. */
  kind: "degree" | "diploma" | "specialty";
  /** Título, diplomado o especialidad. */
  title: string;
  /** Institución o aclaración breve. */
  detail?: string;
};

export type TeamMember = {
  /** Dirección pública estable del perfil profesional. */
  slug?: string;
  /** Nombre y apellido completo. */
  name: string;
  /** Cargo/rol dentro del estudio. */
  role: string;
  /** Título profesional que acompaña al nombre. */
  headline?: string;
  /** Bio de UNA frase (≈ 90-140 caracteres). */
  bio: string;
  /** Cita corta en primera persona (ficha destacada del director). */
  quote?: string;
  /** Formación y especialidades destacadas. */
  credentials?: Credential[];
  /** Rubros en los que tiene experiencia. */
  sectors?: string[];
  /** Años de experiencia (dato destacado). */
  years?: number;
  /** Badges flotantes del retrato del home (máx. 2, cortos). */
  highlights?: { kind: Credential["kind"]; title: string; detail: string }[];
  /** Universidades (schema.org alumniOf). */
  alumniOf?: string[];
  /** Ruta a la foto en /public (vertical 3:4 o 4:5). Si falta → avatar de iniciales. */
  photo?: string;
  /** object-position de la foto, para que el recorte no corte la cara. */
  photoPosition?: string;
  /** Recorte cuadrado de la cara (avatares chicos, p. ej. firma en servicios). */
  avatar?: string;
  /** URL de perfil de LinkedIn. */
  linkedin?: string;
  /** Email de contacto directo. */
  email?: string;
  /** Marca al director/a (se destaca con badge y aparece primero). */
  director?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Manuel Rolón",
    slug: "manuel-rolon",
    role: "Director",
    headline: "Licenciado en Ciencias Contables y Administrativas",
    bio: "Más de 15 años en gestión contable y financiera, outsourcing y liderazgo de equipos en sectores como importación, construcción y automotor.",
    quote:
      "Firme, directo, dinámico y optimista: así es mi enfoque como profesional. Mi pensamiento es 100\u00a0% numérico y siempre orientado al logro de objetivos.",
    credentials: [
      {
        kind: "degree",
        title: "Licenciatura en Ciencias Contables y Administrativas",
        detail: "Universidad Columbia del Paraguay · Summa Cum Laude",
      },
      {
        kind: "diploma",
        title: "Diplomado en Finanzas y Proyectos de Inversión",
        detail: "Universidad San Ignacio de Loyola",
      },
      {
        kind: "specialty",
        title: "Experto en la Ley 6380/19",
        detail: "Modernización y simplificación del sistema tributario",
      },
    ],
    sectors: ["Outsourcing contable", "Importación", "Textil", "Construcción", "Automotor"],
    years: 15,
    highlights: [
      { kind: "specialty", title: "Experto en la Ley 6380/19", detail: "Sistema tributario" },
      { kind: "degree", title: "Summa Cum Laude", detail: "Ciencias Contables" },
    ],
    alumniOf: ["Universidad Columbia del Paraguay", "Universidad San Ignacio de Loyola"],
    director: true,
    photo: "/team/manuel-rolon-retrato.jpg",
    photoPosition: "62% 30%",
    avatar: "/team/manuel-rolon-avatar.jpg",
    linkedin: "https://www.linkedin.com/in/manuel-rol%C3%B3n-b%C3%A1ez-1a140367/",
  },
];

/** Ícono de cada tipo de credencial. */
export const CREDENTIAL_ICONS: Record<Credential["kind"], LucideIcon> = {
  degree: GraduationCap,
  diploma: BookOpenCheck,
  specialty: Scale,
};

/** Director/a del estudio (o el primer miembro si no hay ninguno marcado). */
export const director = team.find((m) => m.director) ?? team[0]!;

/** Perfil facilitado por MRB para el servicio de auditoría y consultoría. */
export const gabriela: TeamMember = {
  name: "Gabriela Duarte Toñanez",
  slug: "gabriela-duarte-tonanez",
  role: "Auditoría y consultoría",
  headline: "Contadora Pública",
  bio: "Contadora pública con más de 15 años de experiencia en auditoría financiera e impositiva y contabilidad integral.",
  photo: "/team/gabriela-duarte-tonanez.png",
  photoPosition: "50% 30%",
  years: 15,
  credentials: [
    { kind: "degree", title: "Contador Público", detail: "Universidad de Integración de las Américas (UNIDA)" },
    { kind: "diploma", title: "Diplomado en Tributación y Asesoría Impositiva", detail: "Universidad del Pacífico" },
    { kind: "specialty", title: "Formación en Auditoría", detail: "Escuela de Administración de Negocios (EDAN)" },
  ],
  sectors: ["Servicios", "Industria", "Automotor", "Importación"],
};

/** Perfil facilitado por MRB para Payroll y asesoría laboral. */
export const payrollProfessional: TeamMember = {
  name: "María Ernestina Argüello Aguilera",
  slug: "maria-ernestina-arguello",
  role: "Payroll y gestión de talento humano",
  headline: "Economista · MBA · Especialista en Derecho y Práctica Laboral",
  bio: "Economista y MBA con más de 17 años de experiencia liderando Recursos Humanos en empresas de salud, alimentos e industria de hasta 450 colaboradores. Especialista en la estructuración de áreas de RR.HH., la transformación organizacional y la implementación de sistemas ISO.",
  photo: "/team/maria-ernestina-arguello.png",
  photoPosition: "52% 40%",
  years: 17,
  credentials: [
    { kind: "degree", title: "Economista", detail: "Universidad Nacional de Asunción · 2009" },
    { kind: "degree", title: "Magíster en Administración de Empresas (MBA)", detail: "Universidad Americana · 2017" },
    { kind: "specialty", title: "Especialización en Derecho y Práctica Laboral", detail: "FOTRIEM · 2020–2021" },
  ],
  sectors: ["Salud y laboratorios", "Alimentos y consumo masivo", "Forestal e industrial", "Automotriz", "Comercial"],
};

/* ---- Helpers para el avatar de marca (cuando no hay foto) ---- */

export const professionals = [director, gabriela, payrollProfessional];

export function professionalPath(member: TeamMember) {
  return `/equipo/${member.slug}`;
}

/** Iniciales a partir del nombre (1ª y última palabra). Fallback "MRB". */
export function getInitials(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length === 0) return "MRB";
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase();
}
