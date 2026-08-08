import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://scrapbuddy.org";
const LAST_MOD = "2026-08-08";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          // Core Pages
          { path: "/", changefreq: "daily", priority: "1.0", lastmod: LAST_MOD },
          { path: "/pricing", changefreq: "daily", priority: "0.9", lastmod: LAST_MOD },
          { path: "/request-pickup", changefreq: "weekly", priority: "0.9", lastmod: LAST_MOD },
          { path: "/about", changefreq: "monthly", priority: "0.7", lastmod: LAST_MOD },
          { path: "/contact", changefreq: "monthly", priority: "0.8", lastmod: LAST_MOD },

          // Service Pages
          { path: "/scrap-pickup", changefreq: "weekly", priority: "0.9", lastmod: LAST_MOD },
          { path: "/e-waste-recycling", changefreq: "weekly", priority: "0.9", lastmod: LAST_MOD },
          { path: "/paper-scrap", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/plastic-scrap", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/metal-scrap", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/old-appliance-scrap", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/old-furniture-scrap", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/scrap-collection", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },

          // Mumbai Location Pages
          { path: "/locations/mumbai", changefreq: "weekly", priority: "0.9", lastmod: LAST_MOD },
          { path: "/locations/andheri", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/locations/bandra", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/locations/borivali", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/locations/powai", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/locations/malad", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },

          // Blog Hub & Informational Guides
          { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: LAST_MOD },
          { path: "/blog/how-to-sell-scrap-online-in-mumbai", changefreq: "monthly", priority: "0.7", lastmod: LAST_MOD },
          { path: "/blog/doorstep-scrap-pickup-how-it-works", changefreq: "monthly", priority: "0.7", lastmod: LAST_MOD },
          { path: "/blog/how-to-recycle-e-waste-responsibly-mumbai", changefreq: "monthly", priority: "0.7", lastmod: LAST_MOD },
          { path: "/blog/scrap-pickup-vs-traditional-kabadiwala", changefreq: "monthly", priority: "0.7", lastmod: LAST_MOD },
          { path: "/blog/how-scrap-prices-are-determined", changefreq: "monthly", priority: "0.7", lastmod: LAST_MOD },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
