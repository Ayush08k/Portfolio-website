"use client";

import { useState, useMemo, useEffect } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { ArrowLeft, Search, ExternalLink, Code2, Cpu, Smartphone, Globe, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProjectsArchive() {
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

  const categories = ["All", "Web", "Mobile", "E-Commerce"];

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web":
        return <Globe size={16} className="text-cyan" />;
      case "Mobile":
        return <Smartphone size={16} className="text-purple" />;
      case "E-Commerce":
        return <ShoppingBag size={16} className="text-green" />;
      default:
        return <Cpu size={16} />;
    }
  };

  return (
    <div className="projects-archive-page">
      {/* Background gradients */}
      <div className="orb orb-1" style={{ top: "-10%", left: "10%", opacity: 0.15 }} />
      <div className="orb orb-2" style={{ top: "30%", right: "5%", opacity: 0.1 }} />
      <div className="orb orb-3" style={{ bottom: "10%", left: "20%", opacity: 0.12 }} />

      <header className="archive-header container">
        <div className="header-title-row">
          <Link href="/" className="back-btn-logo" data-hover aria-label="Back to Home">
            <ArrowLeft size={20} />
          </Link>
          
          <div className="archive-hero-text">
            <span className="section-label">Case Studies Archive</span>
            <h1 className="archive-title">
              Shipped <span className="gradient-text">Projects & Products</span>
            </h1>
          </div>
        </div>
        
        <p className="archive-subtitle" style={{ maxWidth: "900px" }}>
          An in-depth collection of custom web portals, cross-platform mobile apps, and e-commerce stores engineered for scale and speed. 
          <span style={{ display: "block", marginTop: "12px", fontSize: "14px", color: "var(--text-secondary)", opacity: 0.85, lineHeight: "1.6" }}>
            <strong>Privacy Note:</strong> These case studies are featured for showcase purposes. Due to client privacy concerns and non-disclosure agreements (NDAs), we cannot share the live demos or source code for all projects. The displaying projects are shown with prior permission. Additionally, for privacy reasons, we cannot display every project in our registry here. These studies serve as technical walk-throughs to showcase our architectural design and execution capabilities.
          </span>
        </p>

        {/* Filters and Search Bar Container */}
        <div className="archive-controls">
          <div className="search-bar-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by project title, description, or tech stack..."
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
                data-hover
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container archive-main">
        {filteredProjects.length === 0 ? (
          <div className="no-results">
            <Sparkles size={32} style={{ color: "var(--accent-cyan)", marginBottom: "16px" }} />
            <h3>No projects found matching your criteria.</h3>
            <p>Try refining your search terms or checking a different category.</p>
          </div>
        ) : (
          <motion.div className="archive-grid">
            <AnimatePresence mode="sync">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? { opacity: 0 } : { opacity: 0 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.35 }}
                  className="archive-card glass-card"
                  data-hover
                >
                  <div className="archive-card-image-wrap">
                    <img src={project.image} alt={`${project.title} — Ayush Kumar Developer Case Study Project Preview`} className="archive-card-img" />
                    <span className="archive-card-category">
                      {getCategoryIcon(project.category)} {project.category}
                    </span>
                  </div>

                  <div className="archive-card-content">
                    <h3 className="archive-card-title">{project.title}</h3>
                    <p className="archive-card-desc">{project.description}</p>
                    
                    <div className="archive-card-tech">
                      {project.tech.slice(0, 5).map((t) => (
                        <span key={t} className="archive-tech-tag">{t}</span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="archive-tech-tag-more">+{project.tech.length - 5} more</span>
                      )}
                    </div>

                    <div className="archive-card-footer">
                      <Link href={`/projects/${project.slug}`} className="view-case-study-btn" data-hover>
                        View Case Study
                      </Link>
                      
                      <div className="archive-card-links">
                        {project.github && project.github !== "#" && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="archive-icon-link" data-hover aria-label="GitHub Repo">
                            <Code2 size={16} />
                          </a>
                        )}
                        {project.link && project.link !== "#" && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="archive-icon-link" data-hover aria-label="Live Demo">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Styled JSX or dynamic styles specifically for the archive */}
      <style>{`
        .projects-archive-page {
          min-height: 100vh;
          background: #030014;
          color: #f8fafc;
          padding: 120px 0 120px;
          position: relative;
          overflow-x: hidden;
        }

        .archive-header {
          margin-bottom: 48px;
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
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 32px;
          text-decoration: none;
        }

        .back-btn-logo:hover {
          background: rgba(0, 242, 254, 0.08);
          border-color: rgba(0, 242, 254, 0.3);
          color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
          transform: translateX(-3px);
        }

        .header-title-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .header-title-row .back-btn-logo {
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .header-title-row .archive-hero-text {
          margin-bottom: 0;
        }

        .archive-hero-text {
          margin-bottom: 40px;
        }

        .archive-title {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .archive-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
        }

        .archive-controls {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(12px);
        }

        @media (min-width: 768px) {
          .archive-controls {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .search-bar-wrapper {
          position: relative;
          flex: 1;
          max-width: 500px;
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
          font-size: 15px;
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
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-white);
        }

        .filter-btn.active {
          background: rgba(124, 58, 237, 0.1) !important;
          border-color: rgba(124, 58, 237, 0.5) !important;
          color: var(--text-white) !important;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.15) !important;
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
          background: rgba(124, 58, 237, 0.1) !important;
          color: var(--text-white) !important;
          border-color: rgba(124, 58, 237, 0.5) !important;
        }

        .archive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .archive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .archive-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .archive-card:hover {
            transform: none !important;
            box-shadow: none !important;
          }
          .archive-card:hover .archive-card-img {
            transform: none !important;
          }
          .back-btn-logo:hover {
            transform: none !important;
            box-shadow: none !important;
            background: rgba(255, 255, 255, 0.03) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            color: var(--text-secondary) !important;
          }
        }

        .archive-card {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .archive-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 242, 254, 0.12);
        }

        .archive-card-image-wrap {
          position: relative;
          height: 200px;
          background: #090620;
          overflow: hidden;
        }

        .archive-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .archive-card:hover .archive-card-img {
          transform: scale(1.05);
        }

        .archive-card-category {
          position: absolute;
          top: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(3, 0, 20, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(8px);
        }

        .archive-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .archive-card-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-white);
          line-height: 1.4;
        }

        .archive-card-desc {
          font-size: 14.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        .archive-card-tech {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .archive-tech-tag {
          font-size: 11px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--accent-cyan);
          border-radius: 6px;
          padding: 4px 10px;
        }

        .archive-tech-tag-more {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 4px 6px;
        }

        .archive-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
        }

        .view-case-study-btn {
          font-size: 14px;
          font-weight: 600;
          color: var(--accent-cyan);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .view-case-study-btn:hover {
          text-decoration: underline;
        }

        .archive-card-links {
          display: flex;
          gap: 12px;
        }

        .archive-icon-link {
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .archive-icon-link:hover {
          color: var(--text-white);
        }

        .no-results {
          text-align: center;
          padding: 80px 0;
          color: var(--text-secondary);
        }

        .no-results h3 {
          color: var(--text-white);
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
