import type { Metadata } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Case Study Not Found | Ayush Kumar Portfolio",
      description: "The requested project case study could not be found.",
    };
  }

  // Combine standard keywords with project-specific SEO tags
  const baseKeywords = [
    "ayush kumar portfolio",
    "full stack developer portfolio",
    "freelance web developer"
  ];
  const keywords = [...baseKeywords, ...(project.seoTags || [])];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freelance-ayush.vercel.app";

  return {
    title: `${project.title} | Ayush Kumar Case Study 2026`,
    description: project.longDescription ? project.longDescription.substring(0, 160) : project.description,
    keywords,
    openGraph: {
      title: `${project.title} | Ayush Kumar Case Study`,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      siteName: "Freelancer Ayush",
      images: [
        {
          url: project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Preview`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ayush Kumar Case Study`,
      description: project.description,
      images: [project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`],
      creator: "@Ayush08k",
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
