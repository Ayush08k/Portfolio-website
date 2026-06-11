"use client";

import { use, useState, useEffect } from "react";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Sparkles, MessageSquare, Tag, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const resolvedParams = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="blog-error-page container">
        <AlertCircle size={48} className="text-red" />
        <h2>Article Not Found</h2>
        <p>The technical guide you are looking for does not exist or has been moved.</p>
        <Link href="/blog" className="error-back-btn">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <style>{`
          .blog-error-page {
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            color: #f8fafc;
            text-align: center;
          }
          .error-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            color: var(--accent-cyan);
            text-decoration: none;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  // Simple custom parser to render seed blog markdown content beautifully
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = "";

    return lines.map((line, idx) => {
      // Code blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const codeText = codeContent.join("\n");
          codeContent = [];
          return (
            <pre key={idx} className="blog-code-block">
              <div className="code-header">
                <span className="code-lang">{codeLanguage || "typescript"}</span>
              </div>
              <code>{codeText}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3);
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Headers
      if (line.startsWith("# ")) {
        return <h1 key={idx} className="blog-h1">{line.slice(2)}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="blog-h2">{line.slice(3)}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="blog-h3">{line.slice(4)}</h3>;
      }

      // Horizontal rules
      if (line.trim() === "---") {
        return <hr key={idx} className="blog-hr" />;
      }

      // Bullet items
      if (line.trim().startsWith("- ")) {
        // Parse bold inline in lists
        const text = line.trim().slice(2);
        return (
          <ul key={idx} className="blog-ul">
            <li>{parseInlineFormatting(text)}</li>
          </ul>
        );
      }

      // Empty lines
      if (line.trim() === "") {
        return <div key={idx} className="blog-spacing" />;
      }

      // Standard paragraphs
      return <p key={idx} className="blog-p">{parseInlineFormatting(line)}</p>;
    });
  };

  // Helper to parse simple bold markdown like **text**
  const parseInlineFormatting = (text: string) => {
    const parts = text.split("(\\*\\*|\\`)"); // splitting around bold and code signs
    // Standard quick regex replacement of bold and inline codes
    const matches = text.match(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    if (!matches) return text;

    let result: React.ReactNode[] = [];
    let currentIdx = 0;

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const matchStart = text.indexOf(match, currentIdx);
      
      // Add text before match
      if (matchStart > currentIdx) {
        result.push(text.slice(currentIdx, matchStart));
      }

      if (match.startsWith("**")) {
        result.push(<strong key={i}>{match.slice(2, -2)}</strong>);
      } else if (match.startsWith("`")) {
        result.push(<code key={i} className="blog-inline-code">{match.slice(1, -1)}</code>);
      }

      currentIdx = matchStart + match.length;
    }

    if (currentIdx < text.length) {
      result.push(text.slice(currentIdx));
    }

    return result;
  };

  return (
    <div className="blog-detail-page">
      <div className="orb orb-1" style={{ top: "-5%", left: "15%", opacity: 0.15 }} />
      <div className="orb orb-2" style={{ top: "40%", right: "10%", opacity: 0.12 }} />

      <main className="container blog-detail-layout">
        {/* Back Button */}
        <div className="back-btn-row">
          <Link href="/blog" className="back-btn-logo">
            <ArrowLeft size={18} />
          </Link>
          <span className="back-btn-label">Back to Articles</span>
        </div>

        <div className="blog-columns">
          {/* Article Contents */}
          <article className="blog-article-content glass-card">
            {/* Header info */}
            <div className="blog-post-meta">
              <span className="blog-detail-category">{post.category}</span>
              <div className="meta-items-row">
                <span className="meta-item"><Calendar size={13} /> {post.date}</span>
                <span className="meta-item"><Clock size={13} /> {post.readTime}</span>
              </div>
            </div>

            <h1 className="blog-detail-title">{post.title}</h1>
            <p className="blog-detail-lead">{post.description}</p>

            <div className="blog-article-body">
              {renderMarkdown(post.content)}
            </div>

            <div className="blog-article-footer">
              <div className="article-tags-title">Tagged under:</div>
              <div className="blog-article-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-detail-tag">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-detail-sidebar">
            <div className="sticky-sidebar">
              <div className="glass-card contact-sidebar-card">
                <div className="sidebar-decor-icon">
                  <Sparkles size={24} className="text-cyan" />
                </div>
                <h3>Want to implement this architecture?</h3>
                <p>
                  I help businesses build, scale, and launch top-tier apps. Let's discuss your next product.
                </p>
                <div className="availability-indicator-row">
                  <span className="pulse-green" />
                  <span className="availability-text">Available for custom contracts</span>
                </div>
                <Link href="/#contact" className="sidebar-cta-btn">
                  <MessageSquare size={16} /> Book Scope Consultation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        .blog-detail-page {
          min-height: 100vh;
          background: #030014;
          color: #f8fafc;
          padding: 120px 0 120px;
          position: relative;
          overflow: hidden;
        }

        .blog-detail-layout {
          max-width: 1200px;
        }

        .back-btn-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .back-btn-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .back-btn-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .back-btn-logo:hover {
          background: rgba(0, 242, 254, 0.08);
          border-color: rgba(0, 242, 254, 0.3);
          color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
          transform: translateX(-3px);
        }

        .blog-columns {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 1024px) {
          .blog-columns {
            grid-template-columns: 2.3fr 1fr;
          }
        }

        .blog-article-content {
          padding: 40px;
          border-radius: 24px;
        }

        .blog-post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .blog-detail-category {
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          border-radius: 30px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-cyan);
        }

        .meta-items-row {
          display: flex;
          gap: 20px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-detail-title {
          font-size: 36px;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .blog-detail-lead {
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 36px;
          padding-left: 16px;
          border-left: 3px solid var(--accent-cyan);
        }

        /* Markdown Rendering Styles */
        .blog-article-body {
          color: #e2e8f0;
          font-size: 16px;
          line-height: 1.8;
        }

        .blog-h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-white);
          margin-top: 36px;
          margin-bottom: 16px;
        }

        .blog-h2 {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-white);
          margin-top: 32px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .blog-h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-white);
          margin-top: 24px;
          margin-bottom: 12px;
        }

        .blog-p {
          margin-bottom: 20px;
        }

        .blog-ul {
          margin-bottom: 20px;
          padding-left: 20px;
        }

        .blog-ul li {
          margin-bottom: 8px;
        }

        .blog-hr {
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 32px 0;
        }

        .blog-spacing {
          height: 16px;
        }

        .blog-inline-code {
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 14px;
          color: var(--accent-cyan);
        }

        .blog-code-block {
          background: #090620;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0;
          margin: 28px 0;
          overflow: hidden;
          font-family: var(--font-mono);
        }

        .code-header {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 16px;
          display: flex;
          justify-content: flex-end;
        }

        .code-lang {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .blog-code-block code {
          display: block;
          padding: 20px;
          overflow-x: auto;
          font-size: 14px;
          line-height: 1.6;
          color: #cbd5e1;
        }

        /* Footer */
        .blog-article-footer {
          margin-top: 48px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .article-tags-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .blog-article-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .blog-detail-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Sidebar Column */
        .sticky-sidebar {
          position: sticky;
          top: 100px;
        }

        .contact-sidebar-card {
          padding: 32px;
          border-radius: 24px;
          border-color: rgba(6, 182, 212, 0.15);
        }

        .sidebar-decor-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .contact-sidebar-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .contact-sidebar-card p {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .availability-indicator-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .pulse-green {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulse 2s infinite;
        }

        .availability-text {
          font-size: 12px;
          font-weight: 600;
          color: #10B981;
        }

        .sidebar-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          border: none;
          color: var(--white);
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
          cursor: none;
        }

        .sidebar-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(124, 58, 237, 0.35);
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    </div>
  );
}
