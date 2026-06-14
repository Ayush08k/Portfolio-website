import { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS } from "@/data/blog";

/**
 * Professional XML Sitemap for Google Search Console
 * ──────────────────────────────────────────────────────
 * Follows: https://www.sitemaps.org/protocol.html
 *
 * Key rules applied:
 *  1. lastModified uses REAL content dates, NOT new Date() (avoids Google penalty)
 *  2. Priority uses decimal format consistently (0.0 – 1.0)
 *  3. All URLs are absolute with no trailing slashes
 *  4. Blog dates are properly parsed to ISO 8601 date-only format (YYYY-MM-DD)
 *  5. changeFrequency matches actual update cadence
 */

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Normalize the base URL — strip any trailing slashes */
function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";
  return raw.replace(/\/+$/, "");
}

/**
 * Parse a human-readable date string into a stable ISO date (YYYY-MM-DD).
 * Falls back to a safe static date if parsing fails.
 */
function toISODate(dateString: string): string {
  try {
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) {
      return "2026-06-01"; // safe fallback
    }
    return parsed.toISOString().split("T")[0]; // e.g. "2026-06-08"
  } catch {
    return "2026-06-01";
  }
}

// ── Real last-modification dates for static pages ──────────────────────────────
// These should be updated whenever meaningful content changes on each page.
const STATIC_PAGE_DATES = {
  home: "2026-06-13",
  services: "2026-06-10",
  projects: "2026-06-12",
  blog: "2026-06-12",
  about: "2026-06-11",
} as const;

// ── Sitemap Generator ──────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  // ── 1. Static Core Routes ──────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(STATIC_PAGE_DATES.home),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(STATIC_PAGE_DATES.services),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(STATIC_PAGE_DATES.projects),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(STATIC_PAGE_DATES.blog),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(STATIC_PAGE_DATES.about),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ── 2. Individual Project Case Study Pages ─────────────────────────────────
  const projectRoutes: MetadataRoute.Sitemap = PORTFOLIO_DATA.projects.map(
    (project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(STATIC_PAGE_DATES.projects), // use the projects page date
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  // ── 3. Individual Blog Post Pages ──────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(toISODate(post.date)),
    changeFrequency: "yearly" as const, // blog posts rarely change after publication
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
