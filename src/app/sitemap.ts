import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BLOG_POSTS } from "@/data/blog";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "freelance-ayush.vercel.app";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

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
  // Slugs: attendance-system, feedo, jlm-tournaments, music-player, ecommerce-platform
  const projectRoutes: MetadataRoute.Sitemap = PORTFOLIO_DATA.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date("2026-06-12"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── Individual Blog Post Pages ─────────────────────────────────────────────
  // Slugs: tuning-nextjs-server-components, optimize-nestjs-mongodb-queries,
  //         offline-syncing-react-native-expo
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
