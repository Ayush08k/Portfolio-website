"use client";

import { useState, useMemo, useEffect } from "react";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { Search, BookOpen, Clock, Calendar, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = ["All", "Frontend", "Backend", "Mobile", "DevOps"];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="blog-index-page">
      {/* Background radial effects */}
      <div className="orb orb-1" style={{ top: "-5%", left: "15%", opacity: 0.15 }} />
      <div className="orb orb-2" style={{ top: "40%", right: "10%", opacity: 0.12 }} />

      <header className="blog-header container">
        <div className="blog-hero-text">
          <span className="section-label">Technical Thought Leadership</span>
          <h1 className="blog-title">
            Engineering <span className="gradient-text">Insights & Guides</span>
          </h1>
          <p className="blog-subtitle">
            Deep dives into scalable architecture, frontend optimizations, offline sync mechanics, and backend database strategies.
          </p>
        </div>
      </header>

      {/* Main layout */}
      <main className="container blog-main-layout">
        <div className="blog-content-row">
          {/* Main blog index */}
          <div className="blog-list-column">
            {/* Search and Filters */}
            <div className="blog-controls glass-card">
              <div className="search-bar-wrapper">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search articles or technologies..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            <div className="blog-posts-grid">
              <AnimatePresence mode="popLayout">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="blog-card glass-card"
                    >
                      <div className="blog-card-image-wrap">
                        {/* We render a beautiful tech card representation if no actual local image */}
                        <div className="blog-card-image-overlay">
                          <BookOpen size={40} className="blog-banner-icon" />
                          <span className="blog-banner-tag">{post.category}</span>
                        </div>
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-card-meta">
                          <span className="meta-item">
                            <Calendar size={12} /> {post.date}
                          </span>
                          <span className="meta-item">
                            <Clock size={12} /> {post.readTime}
                          </span>
                        </div>

                        <h3 className="blog-card-title">
                          <Link href={`/blog/${post.slug}`} className="blog-title-link">
                            {post.title}
                          </Link>
                        </h3>

                        <p className="blog-card-desc">{post.description}</p>

                        <div className="blog-card-tags">
                          {post.tags.map((tag) => (
                            <span key={tag} className="blog-tag">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="blog-card-footer">
                          <Link href={`/blog/${post.slug}`} className="read-more-link">
                            Read Full Article <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="no-results glass-card"
                  >
                    <h3>No articles found</h3>
                    <p>Try refining your search terms or selecting another category filter.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar widget */}
          <aside className="blog-sidebar-column">
            <div className="sticky-sidebar">
              <div className="glass-card contact-sidebar-card">
                <div className="sidebar-decor-icon">
                  <Sparkles size={24} className="text-cyan" />
                </div>
                <h3>Need help implementing these patterns?</h3>
                <p>
                  I construct premium, lightning-fast digital systems for high-growth businesses. Let's discuss your project requirements.
                </p>
                <div className="availability-indicator-row">
                  <span className="pulse-green" />
                  <span className="availability-text">Available for select projects</span>
                </div>
                <Link href="/#contact" className="sidebar-cta-btn">
                  <MessageSquare size={16} /> Get Free Consultation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        .blog-index-page {
          min-height: 100vh;
          background: #000000;
          color: #f8fafc;
          padding: 80px 0 80px;
          position: relative;
          overflow-x: hidden;
        }

        @media (min-width: 768px) {
          .blog-index-page {
            padding: 120px 0 120px;
          }
        }

        .blog-header {
          margin-bottom: 32px;
        }

        @media (min-width: 768px) {
          .blog-header {
            margin-bottom: 56px;
          }
        }

        .blog-hero-text {
          max-width: 800px;
        }

        .blog-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 12px;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .blog-title {
            font-size: 48px;
            margin-bottom: 20px;
          }
        }

        .blog-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (min-width: 768px) {
          .blog-subtitle {
            font-size: 18px;
          }
        }

        .blog-main-layout {
          position: relative;
        }

        .blog-content-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 1024px) {
          .blog-content-row {
            grid-template-columns: 2.3fr 1fr;
            gap: 40px;
          }
        }

        .blog-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        @media (min-width: 640px) {
          .blog-controls {
            padding: 24px;
            margin-bottom: 32px;
          }
        }

        @media (min-width: 768px) {
          .blog-controls {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
          }
        }

        .search-bar-wrapper {
          position: relative;
          width: 100%;
        }

        @media (min-width: 768px) {
          .search-bar-wrapper {
            flex: 1;
            max-width: 400px;
          }
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 16px 12px 48px;
          color: var(--text-white);
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          width: 100%;
        }

        @media (min-width: 768px) {
          .filter-buttons {
            width: auto;
            justify-content: flex-end;
          }
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        @media (min-width: 640px) {
          .filter-btn {
            padding: 8px 14px;
            font-size: 13.5px;
          }
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-white);
        }

        .filter-btn.active {
          background: rgba(6, 182, 212, 0.1) !important;
          border-color: rgba(6, 182, 212, 0.4) !important;
          color: var(--accent-cyan) !important;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.1) !important;
        }

        .filter-btn:focus,
        .filter-btn:active,
        .filter-btn:focus-visible {
          outline: none !important;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
        }

        .filter-btn.active:focus,
        .filter-btn.active:active,
        .filter-btn.active:focus-visible {
          background: rgba(6, 182, 212, 0.1) !important;
          color: var(--accent-cyan) !important;
          border-color: rgba(6, 182, 212, 0.4) !important;
        }

        .blog-posts-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .blog-posts-grid {
            gap: 32px;
          }
        }

        .blog-card {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        @media (min-width: 640px) {
          .blog-card {
            flex-direction: row;
          }
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(6, 182, 212, 0.08);
        }

        .blog-card-image-wrap {
          width: 100%;
          height: 140px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .blog-card-image-wrap {
            width: 200px;
            height: auto;
          }
        }

        @media (min-width: 768px) {
          .blog-card-image-wrap {
            width: 220px;
          }
        }

        .blog-card-image-overlay {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .blog-banner-icon {
          color: rgba(255, 255, 255, 0.3);
        }

        .blog-banner-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(3, 0, 20, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 600;
          color: var(--accent-cyan);
        }

        @media (min-width: 640px) {
          .blog-banner-tag {
            top: 16px;
            left: 16px;
            font-size: 11px;
          }
        }

        .blog-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (min-width: 640px) {
          .blog-card-body {
            padding: 24px;
          }
        }

        @media (min-width: 768px) {
          .blog-card-body {
            padding: 28px;
          }
        }

        .blog-card-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 10px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-card-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        @media (min-width: 640px) {
          .blog-card-title {
            font-size: 20px;
            margin-bottom: 12px;
          }
        }

        @media (min-width: 768px) {
          .blog-card-title {
            font-size: 22px;
          }
        }

        .blog-title-link {
          color: var(--text-white);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .blog-title-link:hover {
          color: var(--accent-cyan);
        }

        .blog-card-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        @media (min-width: 640px) {
          .blog-card-desc {
            font-size: 14.5px;
            margin-bottom: 20px;
          }
        }

        .blog-card-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .blog-tag {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .blog-card-footer {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .read-more-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-cyan);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s ease;
        }

        @media (min-width: 640px) {
          .read-more-link {
            font-size: 14px;
          }
        }

        .read-more-link:hover {
          text-decoration: underline;
        }

        .no-results {
          padding: 60px 16px;
          text-align: center;
        }

        @media (min-width: 640px) {
          .no-results {
            padding: 80px 24px;
          }
        }

        .no-results h3 {
          font-size: 18px;
          margin-bottom: 8px;
          color: var(--text-white);
        }

        .no-results p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        /* Sidebar Column */
        .sticky-sidebar {
          position: relative;
        }

        @media (min-width: 1024px) {
          .sticky-sidebar {
            position: sticky;
            top: 100px;
          }
        }

        .contact-sidebar-card {
          padding: 20px;
          border-radius: 20px;
          border-color: rgba(6, 182, 212, 0.15);
        }

        @media (min-width: 640px) {
          .contact-sidebar-card {
            padding: 32px;
            border-radius: 24px;
          }
        }

        .sidebar-decor-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        @media (min-width: 640px) {
          .sidebar-decor-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            margin-bottom: 20px;
          }
        }

        .contact-sidebar-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 10px;
          line-height: 1.4;
        }

        @media (min-width: 640px) {
          .contact-sidebar-card h3 {
            font-size: 18px;
            margin-bottom: 12px;
          }
        }

        .contact-sidebar-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        @media (min-width: 640px) {
          .contact-sidebar-card p {
            font-size: 13.5px;
            margin-bottom: 24px;
          }
        }

        .availability-indicator-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        @media (min-width: 640px) {
          .availability-indicator-row {
            margin-bottom: 24px;
          }
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
          padding: 12px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          border: none;
          color: var(--white);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
        }

        @media (min-width: 640px) {
          .sidebar-cta-btn {
            padding: 14px;
            border-radius: 12px;
            font-size: 13.5px;
          }
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
