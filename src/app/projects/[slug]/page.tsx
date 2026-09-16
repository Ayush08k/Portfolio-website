// ── Force static pre-rendering at build time ──────────────────────────────────
// Without this, Vercel may serve this dynamic route via SSR, causing Googlebot
// to receive a blank shell. force-static guarantees a pre-rendered HTML file
// is generated for every slug returned by generateStaticParams().
export const dynamic = "force-static";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import ProjectCaseStudyClient from "./ProjectCaseStudyClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

// ── Static Path Generation ──────────────────────────────────────────────────
export async function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

// ── Per-Project Dynamic Metadata ────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Ayush Kumar Portfolio",
      description: "The requested project case study could not be found.",
    };
  }

  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
  const ogImage = project.image?.startsWith("http")
    ? project.image
    : `${siteUrl}${project.image}`;

  const baseKeywords = [
    "ayush kumar portfolio",
    "full stack developer portfolio",
    "freelance web developer case study",
    "next.js project",
    "react developer india",
  ];

  return {
    title: `${project.title} | Ayush Kumar Case Study 2026`,
    description: project.longDescription
      ? project.longDescription.substring(0, 160)
      : project.description,
    keywords: [...baseKeywords, ...(project.seoTags ?? [])],
    authors: [{ name: "Ayush Kumar", url: siteUrl }],
    creator: "Ayush Kumar",
    publisher: "Ayush Kumar",
    alternates: {
      canonical: canonicalUrl,
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
      title: `${project.title} | Ayush Kumar Case Study`,
      description: project.description,
      url: canonicalUrl,
      siteName: "Freelancer Ayush",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ayush Kumar Case Study`,
      description: project.description,
      images: [ogImage],
      creator: "@Ayush08k",
    },
  };
}

// ── Project JSON-LD Structured Data ────────────────────────────────────────
function ProjectSchema({ slug }: { slug: string }) {
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) return null;

  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;
  const imageUrl = project.image?.startsWith("http")
    ? project.image
    : `${siteUrl}${project.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    image: imageUrl,
    url: canonicalUrl,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Person",
      name: "Ayush Kumar",
      url: siteUrl,
      jobTitle: "Full Stack & Mobile App Developer",
      sameAs: [
        "https://github.com/ayush08k",
        "https://twitter.com/Ayush08k",
        "https://linkedin.com/in/ayush08k",
      ],
    },
    creator: {
      "@type": "Person",
      name: "Ayush Kumar",
      url: siteUrl,
    },
    keywords: (project.seoTags ?? []).join(", "),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Breadcrumb JSON-LD ──────────────────────────────────────────────────────
function BreadcrumbSchema({ slug, title }: { slug: string; title: string }) {
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
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteUrl}/projects/${slug}`,
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

// ── Server Component Page ───────────────────────────────────────────────────
// NOTE: This is intentionally a Server Component (no "use client" directive).
// The page receives params as props and renders structured data server-side,
// ensuring Googlebot receives fully rendered HTML with all metadata and content.
// Interactive animations are delegated to ProjectCaseStudyClient (Client Component).
export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Structured Data injected server-side — fully crawlable by Googlebot */}
      <ProjectSchema slug={slug} />
      <BreadcrumbSchema slug={slug} title={project.title} />

      {/* Client component handles all interactive animations */}
      <ProjectCaseStudyClient project={project} />
    </>
  );
}
