import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PROGRAMS } from "@/lib/programs-data";
import { SITE_URL } from "@/lib/site-config";

// Bump this when page content changes, so search engines know to re-crawl.
const LAST_UPDATED = "2026-11-09";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/programs", changefreq: "weekly", priority: "0.9" },
          ...PROGRAMS.map((p) => ({
            path: `/programs/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          { path: "/media", changefreq: "monthly", priority: "0.7" },
          { path: "/team", changefreq: "monthly", priority: "0.6" },
          { path: "/gallery", changefreq: "weekly", priority: "0.7" },
          { path: "/newsletter", changefreq: "monthly", priority: "0.5" },
          { path: "/join", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/privacy", changefreq: "monthly", priority: "0.3" },
          { path: "/terms", changefreq: "monthly", priority: "0.3" },
          { path: "/child-safeguarding", changefreq: "monthly", priority: "0.3" },
        ];

        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${SITE_URL}${e.path === "/" ? "/" : e.path}</loc>\n    <lastmod>${LAST_UPDATED}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
