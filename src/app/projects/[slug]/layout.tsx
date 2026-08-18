import { PORTFOLIO_DATA } from "@/data/portfolio";

/**
 * Pre-render all project case study pages at build time.
 * generateMetadata lives in page.tsx to avoid duplicate metadata resolution.
 * generateStaticParams is kept here as a belt-and-suspenders measure.
 */
export async function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
