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
        // Default rule: allow all crawlers to access public pages
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        // Googlebot: explicitly prioritize all indexable sections
        userAgent: "Googlebot",
        allow: [
          "/",
          "/projects",
          "/projects/",
          "/blog",
          "/blog/",
          "/services",
          "/about",
          "/estimator",
          "/careers",
          "/speed",
        ],
        disallow: ["/api/"],
      },
      {
        // Googlebot-Image: allow crawling project screenshots and assets
        userAgent: "Googlebot-Image",
        allow: ["/project images/", "/public/", "/"],
        disallow: [],
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
