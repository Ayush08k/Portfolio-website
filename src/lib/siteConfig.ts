/**
 * Centralized Canonical Site Configuration
 * ─────────────────────────────────────────────────────────────────
 * Canonical Production Domain: https://www.freelanceayush.com
 *
 * CRITICAL FOR GOOGLE SEARCH CONSOLE & SEO:
 * Never allow *.vercel.app preview/staging URLs to leak into
 * canonical tags, sitemaps, robots.txt, or Schema.org structured data.
 * Even if Vercel has NEXT_PUBLIC_SITE_URL set to a vercel.app domain,
 * this configuration strictly enforces https://www.freelanceayush.com.
 */

export const CANONICAL_DOMAIN = "https://www.freelanceayush.com";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // If envUrl is missing, or contains vercel.app, or localhost, enforce CANONICAL_DOMAIN
  if (!envUrl || envUrl.includes("vercel.app") || envUrl.includes("localhost")) {
    return CANONICAL_DOMAIN;
  }

  // Ensure protocol is https and no trailing slash
  const sanitized = envUrl.replace(/\/+$/, "");
  return sanitized.startsWith("http") ? sanitized : `https://${sanitized}`;
}

export const SITE_URL = getSiteUrl();

/**
 * Returns a fully-qualified canonical URL for any internal route.
 * Handles trailing slashes, clean prefixes, and duplicate slashes.
 *
 * Examples:
 *   getCanonicalUrl("")          => "https://www.freelanceayush.com"
 *   getCanonicalUrl("/")         => "https://www.freelanceayush.com"
 *   getCanonicalUrl("/projects") => "https://www.freelanceayush.com/projects"
 *   getCanonicalUrl("services")  => "https://www.freelanceayush.com/services"
 */
export function getCanonicalUrl(path = ""): string {
  if (!path || path === "/" || path.trim() === "") {
    return CANONICAL_DOMAIN;
  }

  const trimmed = path.trim();
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  // Normalize duplicate slashes but preserve https://
  return `${CANONICAL_DOMAIN}${cleanPath.replace(/\/+/g, "/")}`;
}

/**
 * Resolves an asset image to a fully-qualified canonical URL.
 */
export function getCanonicalImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return `${CANONICAL_DOMAIN}/myprofile.png`;
  }
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    // If it's a vercel.app link, replace with canonical domain
    if (imagePath.includes("vercel.app")) {
      const pathname = new URL(imagePath).pathname;
      return `${CANONICAL_DOMAIN}${pathname}`;
    }
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${CANONICAL_DOMAIN}${cleanPath.replace(/\/+/g, "/")}`;
}
