import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del workspace a este proyecto (evita la inferencia por lockfiles vecinos).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
