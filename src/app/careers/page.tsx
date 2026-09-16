export const dynamic = "force-static";

import type { Metadata } from "next";
import CareersClient from "./CareersClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

export const metadata: Metadata = {
  title: "Careers & Open Roles — Join Our AI & Web Engineering Team",
  description:
    "Explore career openings at Freelancer Ayush Studio. We are hiring AI / ML Developers, Full Stack Next.js Engineers, and React Native Mobile Developers. Apply now!",
  keywords: [
    "ai ml developer jobs",
    "hire ai engineer remote",
    "react native developer jobs india",
    "next.js developer jobs remote",
    "full stack engineer career",
    "freelance developer team hiring",
    "ai developer openings 2026",
    "python ml engineer hiring",
    "ayush kumar careers"
  ],
  authors: [{ name: "Ayush Kumar", url: siteUrl }],
  creator: "Ayush Kumar",
  publisher: "Ayush Kumar",
  alternates: {
    canonical: `${siteUrl}/careers`,
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
    title: "Careers & Open Roles — Join Our AI & Web Engineering Team",
    description: "Hiring AI / ML Developers, Full Stack Next.js Engineers & Mobile Developers. Remote-friendly, competitive CTC. Apply today!",
    url: `${siteUrl}/careers`,
    siteName: "Freelancer Ayush",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/myprofile.png`,
        width: 1200,
        height: 630,
        alt: "Careers at Freelancer Ayush — Hiring AI/ML Developers & Full Stack Engineers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Open Roles — Join Our AI & Web Engineering Team",
    description: "Hiring AI / ML Developers, Full Stack Engineers & Mobile Developers. Apply now with your resume!",
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
