import { MetadataRoute } from "next";

/**
 * robots.txt Generator
 * ────────────────────────────────────────────────────────
 * Follows: https://developers.google.com/search/docs/crawling-indexing/robots/intro
 *
 * Key rules:
 *  1. Allow all crawlers to access all public content
 *  2. Block internal API routes and Next.js internals
 *  3. Explicitly allow Googlebot-Image to crawl project/blog images
 *  4. Reference the XML sitemap for discovery
 *  5. Declare canonical host
 */
export default function robots(): MetadataRoute.Robots {
  const rawBase =
    process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";
  const baseUrl = rawBase.replace(/\/+$/, "");

  return {
    rules: [
      {
        // Default rule: allow all bots to crawl all public content
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        // Googlebot: explicitly allow blog and project pages for indexing
        userAgent: "Googlebot",
        allow: ["/", "/projects/", "/blog/", "/services", "/about"],
        disallow: ["/api/"],
      },
      {
        // Googlebot-Image: allow crawling project screenshots and blog images
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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
