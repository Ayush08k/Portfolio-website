import { MetadataRoute } from "next";

/**
 * robots.txt Generator
 * ────────────────────────────────────────────────────────
 * Follows: https://developers.google.com/search/docs/crawling-indexing/robots/intro
 *
 * Key rules:
 *  1. Allow all crawlers to access all public content
 *  2. Block internal API routes and Next.js internals
 *  3. Reference both dynamic and static sitemaps
 *  4. Declare canonical host
 */
export default function robots(): MetadataRoute.Robots {
  const rawBase =
    process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";
  const baseUrl = rawBase.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
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
