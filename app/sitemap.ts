import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { serviceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/servicios`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contacto`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/nosotros`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/servicios/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
