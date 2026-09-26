import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { site } from "@/lib/site.config";
import { serviceSlugs } from "@/lib/services";

/** Fecha del último commit que tocó los archivos de una página. Si no hay historial
 *  git (p. ej. clon superficial) se omite: mejor sin lastmod que con uno falso. */
function lastCommitDate(...files: string[]): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], {
      encoding: "utf-8",
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const shared = ["lib/site.config.ts", "components"];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: lastCommitDate("app/page.tsx", "lib/team.ts", ...shared) },
    { url: `${base}/servicios`, lastModified: lastCommitDate("app/servicios/page.tsx", "lib/services.ts") },
    { url: `${base}/contacto`, lastModified: lastCommitDate("app/contacto/page.tsx", ...shared) },
    { url: `${base}/nosotros`, lastModified: lastCommitDate("app/nosotros/page.tsx", "lib/team.ts", ...shared) },
  ];

  const servicesUpdated = lastCommitDate("lib/services.ts", "app/servicios/[slug]/page.tsx");
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/servicios/${slug}`,
    lastModified: servicesUpdated,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
