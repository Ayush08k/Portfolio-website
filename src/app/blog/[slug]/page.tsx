import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import BlogDetailClient from "./BlogDetailClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

// ── Static Path Generation ──────────────────────────────────────────────────
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

// ── Per-Post Dynamic Metadata ───────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Ayush Kumar Developer Blog",
      description: "The requested blog article could not be found.",
    };
  }

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.image?.startsWith("http")
    ? post.image
    : `${siteUrl}${post.image}`;

  return {
    title: `${post.title} | Ayush Kumar Developer Blog`,
    description: post.description,
    keywords: [
      ...post.tags,
      ...(post.seoTags ?? []),
      "ayush kumar",
      "developer blog",
      "full stack developer india",
    ],
    authors: [{ name: "Ayush Kumar", url: siteUrl }],
    creator: "Ayush Kumar",
    publisher: "Ayush Kumar",
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "Freelancer Ayush",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Ayush Kumar"],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
      creator: "@Ayush08k",
    },
  };
}

// ── Article JSON-LD Structured Data ────────────────────────────────────────
function ArticleSchema({ slug }: { slug: string }) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `${siteUrl}${post.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: imageUrl,
    url: canonicalUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
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
    publisher: {
      "@type": "Person",
      name: "Ayush Kumar",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: [...post.tags, ...(post.seoTags ?? [])].join(", "),
    articleSection: post.category,
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
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteUrl}/blog/${slug}`,
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
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Structured Data injected server-side — fully crawlable */}
      <ArticleSchema slug={slug} />
      <BreadcrumbSchema slug={slug} title={post.title} />

      {/* Client component handles all the interactive markdown rendering */}
      <BlogDetailClient post={post} />
    </>
  );
}
