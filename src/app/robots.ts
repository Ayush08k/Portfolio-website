import { MetadataRoute } from "next";
import { CANONICAL_DOMAIN } from "@/lib/siteConfig";

/**
 * robots.txt Generator
 * ────────────────────────────────────────────────────────
 * Follows: https://developers.google.com/search/docs/crawling-indexing/robots/intro
 *
 * Ensures all crawlers access public content on https://www.freelanceayush.com
 * and references the canonical XML sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default rule: allow all crawlers to access public pages and static rendering assets
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Googlebot: fully allowed across all pages and rendering assets
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Googlebot-Image: allow crawling project screenshots and public assets
        userAgent: "Googlebot-Image",
        allow: ["/", "/project images/", "/public/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${CANONICAL_DOMAIN}/sitemap.xml`,
    host: CANONICAL_DOMAIN,
  };
}
