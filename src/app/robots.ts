import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Ensure no trailing slash to prevent double-slash in sitemap URL
  const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";
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
