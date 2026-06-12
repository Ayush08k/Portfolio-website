import { MetadataRoute } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

  // ── Static Core Routes ─────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      // Homepage — highest priority, updated frequently
      url: baseUrl,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      // Services — high-converting hire page, near-homepage priority
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      // Projects archive — showcase page, updated when new projects added
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // Blog index — updated frequently with new posts
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      // About — personal branding page, updates rarely
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-06-12"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ── Individual Project Case Study Pages ────────────────────────────────────
  const projectRoutes: MetadataRoute.Sitemap = PORTFOLIO_DATA.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date("2026-06-12"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── Individual Blog Post Pages ─────────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
