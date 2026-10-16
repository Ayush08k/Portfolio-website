export const dynamic = "force-static";

import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { CANONICAL_DOMAIN, getCanonicalUrl } from "@/lib/siteConfig";

const siteUrl = CANONICAL_DOMAIN;

export const metadata: Metadata = {
  title: "Careers — Work With India's Cheapest & Best Dev Studio | Remote Jobs 2026",
  description:
    "🚀 Join India's most affordable dev studio. Remote AI/ML, Full Stack & Mobile dev roles. Build premium quality products at the cheapest rates. Apply now — competitive pay!",
  keywords: [
    // ── Cheapest/Affordable Studio Keywords ────────────────────────────────
    "affordable dev studio india",
    "cheapest web development studio india",
    "low cost development team india",
    "budget development studio india",
    "indie dev studio india careers",
    "cheap developer team india",
    // ── Job/Career Keywords ──────────────────────────────────────────────
    "ai ml developer jobs india",
    "hire ai engineer remote india",
    "react native developer jobs india",
    "next.js developer jobs remote",
    "full stack engineer career india",
    "freelance developer team hiring",
    "ai developer openings 2026",
    "python ml engineer hiring india",
    "remote web developer jobs india",
    "remote app developer jobs india",
    "freelance developer jobs india",
    "full stack jobs work from home india",
    "react developer jobs india 2025",
    "mobile developer jobs india 2025",
    "software engineer jobs india affordable",
    // ── Work Culture Keywords ─────────────────────────────────────────────
    "remote dev team india",
    "startup developer jobs india",
    "indie studio developer jobs",
    "small dev team india openings",
    "freelance studio careers india",
    "flexible developer jobs india",
    "work from home developer india",
    "best dev team to join india",
    "collaborative dev studio india",
    "ayush kumar careers",
    "ayush kumar studio jobs",
    "freelanceayush careers",
    "ayush kumar hiring",
    "join freelance dev studio india",
    "apply developer job india affordable studio",
  ],
  authors: [{ name: "Ayush Kumar", url: siteUrl }],
  creator: "Ayush Kumar",
  publisher: "Ayush Kumar",
  alternates: {
    canonical: getCanonicalUrl("/careers"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Careers — Work With India's Cheapest & Best Dev Studio | Remote Jobs 2026",
    description: "Hiring AI/ML Developers, Full Stack Next.js Engineers & Mobile Developers. India's most affordable dev studio — remote-friendly, competitive pay. Apply today!",
    url: getCanonicalUrl("/careers"),
    siteName: "Best Freelancer",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Careers at Freelancer Ayush Studio — India's Cheapest Dev Studio | Hiring Now",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — India's Cheapest Dev Studio | Hiring AI/ML, Full Stack & Mobile Devs",
    description: "Hiring AI/ML Engineers, Full Stack Devs & Mobile Developers at India's most affordable studio. Remote, flexible, competitive. Apply now!",
    images: [`${siteUrl}/myprofile.png`],
    creator: "@Ayush08k",
  },
};

// ── JobPosting JSON-LD Structured Data for Google Job Search ────────────────
function JobPostingSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "AI / ML Engineer",
    description:
      "Architect, fine-tune, and deploy cutting-edge Large Language Models (LLMs), RAG pipelines, and autonomous agent workflows.",
    identifier: {
      "@type": "PropertyValue",
      name: "Freelancer Ayush Studio",
      value: "ai-ml-developer-2026",
    },
    datePosted: "2026-09-16",
    validThrough: "2026-12-31",
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Freelancer Ayush Studio",
      sameAs: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "Remote",
      },
    },
    jobLocationType: "TELECOMMUTE",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: 1800000,
        maxValue: 3000000,
        unitText: "YEAR",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Breadcrumb JSON-LD ──────────────────────────────────────────────────────
function BreadcrumbSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: `${siteUrl}/careers`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function CareersPage() {
  return (
    <>
      <JobPostingSchema />
      <BreadcrumbSchema />
      <CareersClient />
    </>
  );
}
