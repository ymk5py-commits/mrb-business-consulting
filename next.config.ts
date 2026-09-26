import type { NextConfig } from "next";

/** Dominio canónico (sin protocolo) al que se redirige el alias de Vercel. */
const CANONICAL_HOST = "www.mrbconsulting.com.py";

const nextConfig: NextConfig = {
  // Fija la raíz del workspace a este proyecto (evita la inferencia por lockfiles vecinos).
  turbopack: {
    root: import.meta.dirname,
  },

  // El alias *.vercel.app de producción servía el mismo contenido que el dominio
  // propio (contenido duplicado): se redirige de forma permanente.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mrb-business-consulting.vercel.app" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  // Headers de seguridad básicos. Sin CSP estricta a propósito: el JSON-LD inline y
  // la hidratación de Next necesitarían nonces por request. HSTS ya lo pone Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
