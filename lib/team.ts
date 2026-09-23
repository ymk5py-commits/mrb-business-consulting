/* ============================================================
 * MRB Business Consulting — Equipo
 * ============================================================
 * La sección de /nosotros se construye a partir de este archivo.
 * La foto actual proviene del CV proporcionado y se puede sustituir
 * por un retrato de mayor resolución cuando esté disponible.
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
    name: "Manuel Rolón",
    role: "Director · Licenciado en Ciencias Contables y Administrativas",
    bio: "Más de 15 años de experiencia en gestión administrativa y financiera, contabilidad y outsourcing, liderando equipos en empresas de diversos sectores en Paraguay.",
    director: true,
    photo: "/team/manuel-rolon.jpg",
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
