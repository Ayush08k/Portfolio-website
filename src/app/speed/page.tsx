import { Metadata } from "next";
import SpeedClient from "./SpeedClient";
import Script from "next/script";

const BASE_URL = "https://ayushkumar.dev";

export const metadata: Metadata = {
  title: "Core Web Vitals & Speed Optimization Expert | 50% Off | Ayush Kumar",
  description:
    "Hire a verified Next.js performance specialist. Guaranteed sub-1.5s load times, 99+ Lighthouse scores, and 100% money-back policy. 50% off for new clients. Zero upfront payment.",
  keywords: [
    "Core Web Vitals specialist",
    "Next.js speed optimization",
    "Google Lighthouse 100 score",
    "hire performance web developer",
    "fast website developer India",
    "freelance Next.js developer",
    "sub second load time website",
    "React performance optimization",
    "high performance web developer",
    "website speed audit freelancer",
    "50% off web development",
    "money back guarantee web developer",
    "Ayush Kumar speed optimization",
  ],
  alternates: {
    canonical: `${BASE_URL}/speed`,
  },
  openGraph: {
    title: "Core Web Vitals & Speed Expert | 50% Off | Ayush Kumar",
    description:
      "Verified 99+ Lighthouse scores. Sub-1.5s load times guaranteed. 50% off new projects. Zero upfront. 100% money-back.",
    url: `${BASE_URL}/speed`,
    siteName: "Ayush Kumar — Freelance Developer",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-speed.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Kumar — Core Web Vitals & Speed Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Web Vitals Expert | 50% Off Next.js Development",
    description:
      "Verified 99+ Lighthouse scores, sub-1.5s load times, 100% money-back guarantee. 50% off for new clients.",
    images: [`${BASE_URL}/og-speed.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Performance Optimization & Core Web Vitals Auditing",
  provider: {
    "@type": "Person",
    name: "Ayush Kumar",
    url: BASE_URL,
    jobTitle: "Freelance Full-Stack Developer & Performance Engineer",
  },
  description:
    "Professional Next.js web performance optimization service delivering sub-1.5 second load times, 99+ Google Lighthouse scores, and verified Core Web Vitals improvements.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "50% discount for new clients. Zero upfront payment required.",
    availability: "https://schema.org/InStock",
  },
  areaServed: "Worldwide",
  serviceType: "Web Performance Optimization",
};

export default function SpeedPage() {
  return (
    <>
      <Script
        id="speed-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpeedClient />
    </>
  );
}
