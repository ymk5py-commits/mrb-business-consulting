import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

/** Crawlers de buscadores con IA: se permiten de forma explícita (visibilidad en
 *  ChatGPT, Claude, Perplexity, Gemini/AI Overviews, Apple). */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
