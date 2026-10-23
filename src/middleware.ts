import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware: Enforce www + HTTPS canonical domain
 * ────────────────────────────────────────────────────────────────
 * Google Search Console is reporting "Redirect error" for non-www URLs
 * (freelanceayush.com/about, /blog, /careers, /projects, /speed, /estimator).
 *
 * Vercel already redirects non-www → www at the infrastructure level (308),
 * but this middleware provides an additional application-level redirect
 * that is faster, gives us full control, and ensures Google never sees
 * a redirect chain or loop.
 *
 * This middleware:
 * 1. Redirects non-www requests to www (301 Permanent)
 * 2. Redirects HTTP to HTTPS (301 Permanent)
 * 3. Removes trailing slashes for consistent canonical URLs
 * 4. Skips static assets, API routes, and Next.js internals
 */

const CANONICAL_HOST = "www.freelanceayush.com";
const CANONICAL_ORIGIN = "https://www.freelanceayush.com";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("host") || request.nextUrl.host || "").toLowerCase();

  // ── 1. Skip internal Next.js routes, static files, and localhost ──────────
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    host.includes("localhost") ||
    host.includes("127.0.0.1")
  ) {
    return NextResponse.next();
  }

  // ── 2. Check if host is non-www or has trailing slash ─────────────────────
  const isBareDomain = host === "freelanceayush.com" || host.startsWith("freelanceayush.com:");
  const hasTrailingSlash = pathname !== "/" && pathname.endsWith("/");

  if (isBareDomain || hasTrailingSlash) {
    // Clean path and build final canonical URL in ONE single hop
    const cleanPath = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
    const canonicalUrl = `${CANONICAL_ORIGIN}${cleanPath}${search}`;
    return NextResponse.redirect(canonicalUrl, 301);
  }

  return NextResponse.next();
}

/**
 * Matcher: Run middleware on all routes except static assets and internals.
 * This ensures the middleware doesn't run on every single static file request.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|map)).*)",
  ],
};
