"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowLeft, Cpu, CheckCircle2, ShieldCheck, Zap, Database, Server, Smartphone, BarChart3, AlertTriangle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCaseStudy() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!project) {
    notFound();
  }

  // Draw concentric svg circle for Lighthouse metric with layout animations
  const renderLighthouseCircle = (score: number, label: string, color: string) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="metric-ring-wrapper">
        <div className="metric-ring-svg-container">
          <svg className="metric-ring-svg" width="100%" height="100%" viewBox="0 0 90 90">
            <circle
              className="metric-ring-bg"
              cx="45"
              cy="45"
              r={radius}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="6"
              fill="transparent"
            />
            <motion.circle
              cx="45"
              cy="45"
              r={radius}
              stroke={color}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={isMobile ? strokeDashoffset : undefined}
              initial={isMobile ? undefined : { strokeDashoffset: circumference }}
              animate={isMobile ? undefined : { strokeDashoffset: strokeDashoffset }}
              transition={isMobile ? undefined : { duration: 1.5, ease: "easeOut", delay: 0.3 }}
              strokeLinecap="round"
              transform="rotate(-90 45 45)"
            />
          </svg>
          <div className="metric-ring-value" style={{ color: color }}>
            {score}
          </div>
        </div>
        <span className="metric-ring-label">{label}</span>
      </div>
    );
  };

  // Stagger variants for sub-elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div className="case-study-page">
      {/* Background gradients - hidden on mobile via CSS for performance */}
      <div className="case-orb orb orb-1" style={{ top: "-10%", left: "10%", opacity: 0.15 }} />
      <div className="case-orb orb orb-2" style={{ top: "30%", right: "5%", opacity: 0.1 }} />
      <div className="case-orb orb orb-3" style={{ bottom: "10%", left: "20%", opacity: 0.12 }} />

      <motion.header
        initial={isMobile ? undefined : { opacity: 0, y: -20 }}
        animate={isMobile ? undefined : { opacity: 1, y: 0 }}
        transition={isMobile ? undefined : { duration: 0.6, ease: "easeOut" }}
        className="case-header container"
      >
        <div className="header-title-row">
          <Link href="/projects" className="back-btn-logo" data-hover aria-label="Back to Archive">
            <ArrowLeft size={20} />
          </Link>

          <div className="case-hero-content">
            <div className="case-category-badge">
              <Cpu size={14} /> Case Study — {project.category}
            </div>
            
            <h1 className="case-title">{project.title}</h1>
          </div>
        </div>

        <p className="case-summary">{project.description}</p>
      </motion.header>

      {/* Main Cover Image */}
      <motion.div
        initial={isMobile ? undefined : { opacity: 0, scale: 0.96 }}
        animate={isMobile ? undefined : { opacity: 1, scale: 1 }}
        transition={isMobile ? undefined : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="container case-hero-image-wrap"
      >
        <div 
          className="case-hero-image"
          style={{ backgroundImage: `url("${encodeURI(project.image)}")` }}
        />
        <div className="case-hero-image-glow" />
      </motion.div>

      <motion.main
        variants={isMobile ? undefined : containerVariants}
        initial={isMobile ? undefined : "hidden"}
        animate={isMobile ? undefined : "visible"}
        className="container case-main-grid"
      >
        {/* Left Side: Long Description, Features, and Architecture */}
        <div className="case-left-col">
          <motion.section variants={isMobile ? undefined : itemVariants} className="case-section">
            <h2 className="case-section-heading">Project Overview</h2>
            <p className="case-paragraph">{project.longDescription}</p>
          </motion.section>

          <motion.section variants={isMobile ? undefined : itemVariants} className="case-section">
            <h2 className="case-section-heading">Key Features & Scope</h2>
            <div className="features-grid">
              {project.features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <CheckCircle2 size={18} className="feature-icon" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={isMobile ? undefined : itemVariants} className="case-section">
            <h2 className="case-section-heading">System Architecture</h2>
            <p className="case-paragraph">{project.architecture.description}</p>
            
            {/* Visual HTML Architecture Diagram */}
            <div className="arch-diagram glass-card">
              <div className="arch-node">
                <Smartphone size={24} style={{ color: "var(--accent-cyan)" }} />
                <span>Client Interface</span>
                <small>{project.category === "Mobile" ? "React Native / Expo" : "Next.js / React"}</small>
              </div>
              <div className="arch-arrow">──────▶</div>
              <div className="arch-node">
                <Server size={24} style={{ color: "var(--accent-blue)" }} />
                <span>Backend Core</span>
                <small>{project.tech.includes("NestJS") ? "NestJS API" : "Node.js / Express"}</small>
              </div>
              <div className="arch-arrow">──────▶</div>
              <div className="arch-node">
                <Database size={24} style={{ color: "#10B981" }} />
                <span>Database Node</span>
                <small>{project.architecture.database}</small>
              </div>
            </div>

            <div className="arch-details-grid">
              <div className="arch-detail-item">
                <Database size={16} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <strong>Database:</strong> {project.architecture.database}
                </div>
              </div>
              <div className="arch-detail-item">
                <Server size={16} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <strong>Deployment:</strong> {project.architecture.hosting}
                </div>
              </div>
            </div>
          </motion.section>

          {project.challenge && (
            <motion.section variants={isMobile ? undefined : itemVariants} className="case-section">
              <h2 className="case-section-heading">Biggest Challenge & Resolution</h2>
              <div className="challenge-card glass-card" style={{ padding: "24px", borderRadius: "20px", background: "rgba(239, 68, 68, 0.02)", borderColor: "rgba(239, 68, 68, 0.15)" }}>
                <h4 style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: "700", marginBottom: "12px" }}>
                  <AlertTriangle size={18} /> The Challenge
                </h4>
                <p className="case-paragraph" style={{ marginBottom: "20px", fontSize: "14.5px" }}>{project.challenge.problem}</p>
                <h4 style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: "700", marginBottom: "12px" }}>
                  <CheckCircle2 size={18} /> The Resolution
                </h4>
                <p className="case-paragraph" style={{ marginBottom: 0, fontSize: "14.5px" }}>{project.challenge.solution}</p>
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Side: Performance Metrics & Tech Stack */}
        <div className="case-right-col">
          {/* Performance Section */}
          <motion.section variants={isMobile ? undefined : itemVariants} className="case-section glass-card metrics-card">
            <h3 className="sidebar-heading">
              <BarChart3 size={18} /> Performance & Vitals
            </h3>
            
            {project.lighthouseMetrics ? (
              <div className="metrics-rings-grid">
                {renderLighthouseCircle(project.lighthouseMetrics.performance, "Performance", "var(--accent-cyan)")}
                {renderLighthouseCircle(project.lighthouseMetrics.accessibility, "Accessibility", "#A855F7")}
                {renderLighthouseCircle(project.lighthouseMetrics.bestPractices, "Best Practices", "#3B82F6")}
                {renderLighthouseCircle(project.lighthouseMetrics.seo, "SEO", "#10B981")}
              </div>
            ) : project.mobileMetrics ? (
              <div className="mobile-metrics-list">
                <div className="m-metric-item">
                  <span>App Startup Time</span>
                  <strong>{project.mobileMetrics.startupTime}</strong>
                </div>
                <div className="m-metric-item">
                  <span>JS Bundle Size</span>
                  <strong>{project.mobileMetrics.bundleSize}</strong>
                </div>
                <div className="m-metric-item">
                  <span>Crash-Free Rate</span>
                  <strong className="text-green" style={{ color: "#10B981" }}>{project.mobileMetrics.crashFreeRate}</strong>
                </div>
                <div className="m-metric-item">
                  <span>Render Frame Rate</span>
                  <strong>{project.mobileMetrics.fps} FPS</strong>
                </div>
              </div>
            ) : (
              <p className="text-secondary">Metrics not compiled for this project tier.</p>
            )}

            <div className="metrics-badge">
              <ShieldCheck size={14} style={{ color: "#10B981" }} /> Verified Production Metrics
            </div>
          </motion.section>

          {/* Tech Stack List */}
          <motion.section variants={isMobile ? undefined : itemVariants} className="case-section glass-card tech-card">
            <h3 className="sidebar-heading">
              <Zap size={18} /> Technologies Used
            </h3>
            <div className="tech-pills-list">
              {project.tech.map((t) => (
                <span key={t} className="tech-pill-tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.section>

          {/* SEO Search Tags */}
          {project.seoTags && project.seoTags.length > 0 && (
            <motion.section variants={isMobile ? undefined : itemVariants} className="case-section glass-card seo-tags-card">
              <h3 className="sidebar-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} style={{ color: 'var(--accent-cyan)' }} /> SEO Search Tags
              </h3>
              <p className="cta-sidebar-desc" style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Keywords and concepts covered in this project case study:
              </p>
              <div className="tech-pills-list" style={{ gap: '6px' }}>
                {project.seoTags.map((tag) => (
                  <span key={tag} className="tech-pill-tag" style={{ fontSize: '11px', padding: '4px 8px', borderColor: 'rgba(0, 242, 254, 0.15)', color: 'var(--text-secondary)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* Hire Me CTA sidebar */}
          <motion.section variants={isMobile ? undefined : itemVariants} className="case-section glass-card cta-sidebar-card">
            <h3 className="sidebar-heading">Need a similar product?</h3>
            <p className="cta-sidebar-desc">
              Get an instant cost estimate and development timeline breakdown using the interactive estimator.
            </p>
            <Link href="/#estimator" className="sidebar-cta-btn" data-hover>
              Estimate Project Cost
            </Link>
          </motion.section>
        </div>
      </motion.main>

      {/* Styled JSX */}
      <style>{`
        .case-study-page {
          min-height: 100vh;
          background: #030014;
          color: #f8fafc;
          padding: 120px 0 120px;
          position: relative;
          overflow-x: hidden;
        }

        @media (max-width: 768px) {
          .case-study-page {
            padding: 80px 0 80px;
          }
          /* Prevent hover transitions/sticky styles on touch devices */
          .back-btn-logo:hover,
          .arch-node:hover,
          .feature-item:hover,
          .tech-pill-tag:hover,
          .sidebar-cta-btn:hover {
            transform: none !important;
            box-shadow: none !important;
            background: rgba(255, 255, 255, 0.03) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            color: var(--text-secondary) !important;
          }
        }

        .case-header {
          margin-bottom: 40px;
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
          margin-bottom: 24px;
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

        .header-title-row .case-hero-content {
          margin-top: 0;
        }

        .case-hero-content {
          margin-top: 24px;
        }

        .case-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          color: var(--accent-cyan);
          border-radius: 30px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .case-title {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .case-title {
            font-size: 28px;
          }
        }

        .case-summary {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 800px;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .case-summary {
            font-size: 15px;
          }
        }

        .case-hero-image-wrap {
          position: relative;
          height: 300px;
          margin-bottom: 64px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 768px) {
          .case-hero-image-wrap {
            height: 480px;
          }
        }

        .case-hero-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .case-hero-image-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: linear-gradient(to top, #030014 0%, rgba(3, 0, 20, 0) 100%);
          pointer-events: none;
        }

        .case-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 1024px) {
          .case-main-grid {
            grid-template-columns: 7fr 4fr;
          }
        }

        .case-left-col {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .case-section-heading {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          position: relative;
          padding-left: 14px;
          color: var(--text-white);
        }

        .case-section-heading::before {
          content: "";
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 4px;
          background: var(--accent-cyan);
          border-radius: 4px;
        }

        .case-paragraph {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 600px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .feature-item {
          display: flex;
          gap: 12px;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(0, 242, 254, 0.15);
          transform: translateY(-2px);
        }

        .feature-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-item p {
          font-size: 14.5px;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .arch-diagram {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 28px;
          margin: 24px 0;
          flex-direction: column;
          gap: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .arch-diagram:hover {
          border-color: rgba(0, 242, 254, 0.2);
          box-shadow: 0 0 30px rgba(0, 242, 254, 0.08);
        }

        @media (min-width: 600px) {
          .arch-diagram {
            flex-direction: row;
            gap: 8px;
          }
        }

        .arch-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 140px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .arch-node:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--accent-cyan);
        }

        .arch-node span {
          font-size: 13.5px;
          font-weight: 600;
          margin-top: 8px;
          color: var(--text-white);
        }

        .arch-node small {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .arch-arrow {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
        }

        @media (max-width: 599px) {
          .arch-arrow {
            transform: rotate(90deg);
          }
        }

        .arch-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 600px) {
          .arch-details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .arch-detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .arch-detail-item:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .arch-detail-item strong {
          color: var(--text-white);
        }

        .case-right-col {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .metrics-card {
          padding: 24px;
        }

        .sidebar-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-white);
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 12px;
        }

        .metrics-rings-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          justify-items: center;
          margin-bottom: 20px;
        }

        @media (max-width: 480px) {
          .metrics-rings-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        .metric-ring-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .metric-ring-svg-container {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .metric-ring-svg {
          width: 100%;
          height: 100%;
        }

        .metric-ring-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          font-weight: 800;
        }

        .metric-ring-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
          white-space: nowrap;
        }

        .mobile-metrics-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .m-metric-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 13.5px;
          transition: all 0.3s ease;
        }

        .m-metric-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 242, 254, 0.15);
        }

        .m-metric-item span {
          color: var(--text-secondary);
        }

        .m-metric-item strong {
          color: var(--text-white);
          font-weight: 600;
        }

        .metrics-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 10px;
        }

        .tech-card {
          padding: 24px;
        }

        .tech-pills-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tech-pill-tag {
          font-size: 12px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--accent-cyan);
          border-radius: 8px;
          padding: 6px 12px;
          transition: all 0.3s ease;
        }

        .tech-pill-tag:hover {
          background: rgba(0, 242, 254, 0.08);
          border-color: rgba(0, 242, 254, 0.3);
          transform: translateY(-2px);
        }

        .cta-sidebar-card {
          padding: 24px;
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.03) 0%, rgba(3, 0, 20, 0.95) 100%);
          border-color: rgba(0, 242, 254, 0.15);
        }

        .cta-sidebar-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .sidebar-cta-btn {
          display: block;
          width: 100%;
          text-align: center;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          color: var(--white);
          font-size: 14.5px;
          font-weight: 700;
          text-decoration: none;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
          transition: all 0.2s ease;
        }

        .sidebar-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
        }

        .sidebar-cta-btn:focus,
        .sidebar-cta-btn:active {
          outline: none !important;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%) !important;
          color: var(--white) !important;
        }
      `}</style>
    </div>
  );
}
