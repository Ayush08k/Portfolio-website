import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render all blog post pages at build time.
 * This ensures Google receives fully rendered HTML for indexing.
 */
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Technical Article Not Found | Ayush Kumar Developer Blog",
      description: "The requested technical article could not be found.",
    };
  }

  // Combine base blog keywords with post-specific SEO tags
  const baseKeywords = [
    "web development tutorial",
    "developer guide",
  ];
  const keywords = [...baseKeywords, ...(post.seoTags || [])];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

  return {
    title: `${post.title} — ${post.readTime} Guide`,
    description: post.description,
    keywords,
    openGraph: {
      title: `${post.title} — ${post.readTime} Guide`,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Freelancer Ayush",
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: `${post.title} Article Preview`,
        },
      ],
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — ${post.readTime} Guide`,
      description: post.description,
      images: [post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`],
      creator: "@Ayush08k",
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
