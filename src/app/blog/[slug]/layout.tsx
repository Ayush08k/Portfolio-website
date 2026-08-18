import { BLOG_POSTS } from "@/data/blog";

/**
 * Pre-render all blog post pages at build time.
 * generateMetadata lives in page.tsx to avoid duplicate metadata resolution.
 * generateStaticParams is kept here as a belt-and-suspenders measure.
 */
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
