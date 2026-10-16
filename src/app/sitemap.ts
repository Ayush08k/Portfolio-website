import { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS } from "@/data/blog";
import { CANONICAL_DOMAIN, getCanonicalUrl, getCanonicalImageUrl } from "@/lib/siteConfig";

/**
 * Professional XML Sitemap for Google Search Console
 * ──────────────────────────────────────────────────────
 * Follows: https://www.sitemaps.org/protocol.html
 *
 * All URLs are strictly forced to the canonical production domain:
 * https://www.freelanceayush.com
 */

function toISODate(dateString: string): string {
  try {
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) {
      return "2026-10-16";
    }
    return parsed.toISOString().split("T")[0];
  } catch {
    return "2026-10-16";
  }
}

const STATIC_PAGE_DATES = {
  home: "2026-10-16",
  services: "2026-10-16",
  projects: "2026-10-16",
  blog: "2026-10-16",
  careers: "2026-10-16",
  about: "2026-10-16",
  estimator: "2026-10-16",
  speed: "2026-10-16",
  chatbot: "2026-10-16",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Static Core Routes ──────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: CANONICAL_DOMAIN,
      lastModified: new Date(STATIC_PAGE_DATES.home),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: getCanonicalUrl("/services"),
      lastModified: new Date(STATIC_PAGE_DATES.services),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: getCanonicalUrl("/projects"),
      lastModified: new Date(STATIC_PAGE_DATES.projects),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: getCanonicalUrl("/blog"),
      lastModified: new Date(STATIC_PAGE_DATES.blog),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getCanonicalUrl("/careers"),
      lastModified: new Date(STATIC_PAGE_DATES.careers),
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: getCanonicalUrl("/estimator"),
      lastModified: new Date(STATIC_PAGE_DATES.estimator),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: getCanonicalUrl("/about"),
      lastModified: new Date(STATIC_PAGE_DATES.about),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: getCanonicalUrl("/speed"),
      lastModified: new Date(STATIC_PAGE_DATES.speed),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      // Dedicated SEO landing for the "Ask Me" AI chatbot
      url: getCanonicalUrl("/blog/building-ai-chatbot-portfolio-nextjs-gemini"),
      lastModified: new Date(STATIC_PAGE_DATES.chatbot),
      changeFrequency: "monthly",
      priority: 0.88,
    },
  ];

  // ── 2. Individual Project Case Study Pages ─────────────────────────────────
  const projectRoutes: MetadataRoute.Sitemap = PORTFOLIO_DATA.projects.map(
    (project) => ({
      url: getCanonicalUrl(`/projects/${project.slug}`),
      lastModified: new Date(STATIC_PAGE_DATES.projects),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(project.image && {
        images: [getCanonicalImageUrl(project.image)],
      }),
    })
  );

  // ── 3. Individual Blog Post Pages ──────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(toISODate(post.date)),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    ...(post.image && {
      images: [getCanonicalImageUrl(post.image)],
    }),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
