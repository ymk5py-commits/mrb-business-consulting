/* ============================================================
 * MRB Business Consulting — Equipo
 * ============================================================
 *  👉 EDITÁ AQUÍ los miembros del equipo. La sección "Nuestro equipo"
 *  de /nosotros se construye automáticamente a partir de este archivo.
 *
 *  FOTOS: dejá `photo` sin definir y se renderiza un avatar de marca
 *  con las iniciales. Cuando tengas la foto real:
 *    1. Copiala a /public/team/  (ej. /public/team/director.jpg)
 *    2. Recortala en relación 4:5 (retrato), idealmente ≥ 800×1000 px.
 *    3. Seteá `photo: "/team/director.jpg"`.
 *
 *  El primer miembro con `director: true` se destaca con un badge.
 *  Los nombres son PLACEHOLDER — reemplazalos por los reales.
 * ============================================================ */

export type TeamMember = {
  /** Nombre y apellido completo. */
  name: string;
  /** Cargo/rol dentro del estudio. */
  role: string;
  /** Bio de UNA frase (≈ 90-140 caracteres). */
  bio: string;
  /** Ruta a la foto en /public (relación 4:5). Si falta → avatar de iniciales. */
  photo?: string;
  /** URL de perfil de LinkedIn. */
  linkedin?: string;
  /** Email de contacto directo. */
  email?: string;
  /** Marca al director/a (se destaca con badge y aparece primero). */
  director?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Marcos R. Benítez",
    role: "Director · Contador Público",
    bio: "Lidera el estudio con más de una década asesorando empresas en materia contable, tributaria y societaria en Paraguay.",
    director: true,
    linkedin: "https://www.linkedin.com/company/mrbconsulting",
    email: "director@mrbconsulting.com.py",
    // photo: "/team/director.jpg",
  },
  {
    name: "Lucía Fernández",
    role: "Socia · Gerente",
    bio: "Coordina los equipos de trabajo y la relación con los clientes para que cada gestión llegue en tiempo y forma.",
    linkedin: "https://www.linkedin.com/company/mrbconsulting",
    email: "gerencia@mrbconsulting.com.py",
    // photo: "/team/socia.jpg",
  },
  {
    name: "Andrea Giménez",
    role: "Contadora Senior",
    bio: "Responsable de la liquidación de impuestos y los estados financieros, con foco en el cumplimiento ante la DNIT.",
    email: "contabilidad@mrbconsulting.com.py",
    // photo: "/team/contador.jpg",
  },
  {
    name: "Diego Martínez",
    role: "Asesor Tributario",
    bio: "Acompaña la planificación fiscal y las consultas técnicas para optimizar la carga impositiva dentro de la norma.",
    email: "tributario@mrbconsulting.com.py",
    // photo: "/team/tributario.jpg",
  },
  {
    name: "Carolina Rojas",
    role: "Asesora Laboral & Societaria",
    bio: "Gestiona altas de personal, IPS y trámites societarios ante los Registros Públicos de principio a fin.",
    email: "laboral@mrbconsulting.com.py",
    // photo: "/team/laboral.jpg",
  },
];

/* ---- Helpers para el avatar de marca (cuando no hay foto) ---- */

/** Iniciales a partir del nombre (1ª y última palabra). Fallback "MRB". */
export function getInitials(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length === 0) return "MRB";
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase();
}

const TEAM_GRADIENTS = [
  "from-navy-900 to-accent",
  "from-navy-950 to-accent-600",
  "from-navy-800 to-accent-bright",
  "from-accent-600 to-navy-900",
] as const;

/** Degradé determinista por nombre (mismo nombre → mismo degradé). */
export function gradientFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return TEAM_GRADIENTS[h % TEAM_GRADIENTS.length]!;
}
