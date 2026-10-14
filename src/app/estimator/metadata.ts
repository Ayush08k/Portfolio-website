import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.freelanceayush.com";

export const metadata: Metadata = {
  title: "Cheapest Web & App Cost Calculator — Free Instant Quote | From $75",
  description:
    "💰 Find out how cheap your website or app can be! Cheapest web developer pricing — websites from $75, iOS/Android apps from $300. Get instant FREE quote now!",
  keywords: [
    // ── Cheapest Price Keywords ────────────────────────────────────────────
    "cheapest website price",
    "cheapest app development price",
    "cheapest web development cost india",
    "cheapest ios app cost",
    "cheapest android app cost",
    "cheapest web application cost",
    "cheapest saas development cost",
    "cheapest ecommerce website cost",
    "cheap website cost calculator",
    "cheap app cost estimator",
    "cheapest freelancer rates",
    "cheapest developer price india",
    // ── Calculator/Estimator Keywords ─────────────────────────────────────
    "web development cost calculator",
    "app development cost estimator",
    "website price calculator",
    "project cost estimator free",
    "software development budget tool",
    "freelance developer pricing",
    "mobile app development cost",
    "saas development cost",
    "web app quote calculator",
    "free project estimate",
    "instant website quote",
    "instant app development quote",
    // ── Affordable Price Keywords ──────────────────────────────────────────
    "affordable website price india",
    "affordable app development cost",
    "low cost website development india",
    "low cost mobile app india",
    "budget website development cost",
    "budget app development cost",
    "discount web development pricing",
    "50% off web development price",
    "how much does a website cost india",
    "how much does an app cost india",
    "website development price in india",
    "app development price in india",
    "freelance developer rates india",
    "freelance developer hourly rate india",
    "cheapest freelance rates india",
  ],
  openGraph: {
    title: "Cheapest Web & App Cost Calculator — Free Instant Quote | From $75",
    description:
      "💰 How cheap can your website or app be? Find out instantly! Websites from $75 · iOS apps $300 · Android $300. 50% OFF. Get FREE quote now →",
    url: `${siteUrl}/estimator`,
    siteName: "Freelancer Ayush",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Free Project Cost Calculator — Cheapest Web & App Development Quotes",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheapest Web & App Cost Calculator — Free Quote | From $75",
    description:
      "💰 How cheap can your website or app be? Websites from $75, iOS/Android apps from $300. 50% OFF. Get FREE instant quote →",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
  alternates: {
    canonical: "/estimator",
  },
};
