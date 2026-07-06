import { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS } from "@/data/blog";

/**
 * Professional XML Sitemap for Google Search Console
 * ──────────────────────────────────────────────────────
 * Follows: https://www.sitemaps.org/protocol.html
 */

// ── Helpers ────────────────────────────────────────────────────────────────────

function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";
  return raw.replace(/\/+$/, "");
}

function toISODate(dateString: string): string {
  try {
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) {
      return "2026-06-01";
    }
    return parsed.toISOString().split("T")[0];
  } catch {
    return "2026-06-01";
  }
}

const STATIC_PAGE_DATES = {
  home: "2026-06-27",
  services: "2026-06-27",
  projects: "2026-06-27",
  blog: "2026-06-27",
  about: "2026-06-27",
  estimator: "2026-06-27",
  speed: "2026-07-06",
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
      url: `${baseUrl}/estimator`,
      lastModified: new Date(STATIC_PAGE_DATES.estimator),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(STATIC_PAGE_DATES.about),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/speed`,
      lastModified: new Date(STATIC_PAGE_DATES.speed),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // ── 2. Individual Project Case Study Pages ─────────────────────────────────
  const projectRoutes: MetadataRoute.Sitemap = PORTFOLIO_DATA.projects.map(
    (project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(STATIC_PAGE_DATES.projects),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  // ── 3. Individual Blog Post Pages ──────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(toISODate(post.date)),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
