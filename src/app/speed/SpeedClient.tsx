"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Gauge, ShieldCheck, Zap, Activity, Cpu, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function SpeedClient() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter projects that have metrics defined
  const performanceProjects = PORTFOLIO_DATA.projects.filter(
    (p) => p.lighthouseMetrics || p.mobileMetrics
  );

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="speed-page">
      {/* Background gradients */}
      <div className="orb orb-1" style={{ top: "-5%", left: "5%", opacity: 0.15 }} />
      <div className="orb orb-2" style={{ top: "35%", right: "8%", opacity: 0.12 }} />
      <div className="orb orb-3" style={{ bottom: "5%", left: "15%", opacity: 0.15 }} />

      <motion.header
        initial={isMobile ? undefined : { opacity: 0, y: -20 }}
        animate={isMobile ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="speed-header container"
      >
        <div className="header-title-row">
          <Link href="/" className="back-btn-logo" data-hover aria-label="Back to Home">
            <ArrowLeft size={20} />
          </Link>

          <div className="speed-hero-content">
            <span className="section-label">Core Web Vitals & Optimization</span>
            <h1 className="speed-title">
              Engineered for <span className="gradient-cyan-blue">Extreme Speed</span>
            </h1>
          </div>
        </div>

        <p className="speed-subtitle">
          In the modern web, every 100ms delay costs 7% in conversions. I build lightweight, search-optimized applications that guarantee a sub-second load time and score green in Google Lighthouse audits.
        </p>
      </motion.header>

      {/* ── 1. WHY CHOOSE ME ── */}
      <section className="container comparison-section" aria-labelledby="comparison-heading">
        <div className="comparison-header">
          <span className="section-label">Vendor Comparison</span>
          <h2 id="comparison-heading" className="comparison-title">Why Clients Choose <span className="gradient-cyan-blue">Ayush Kumar</span></h2>
          <p className="comparison-subtitle">
            Hiring a developer shouldn't feel like a gamble. Here is how my performance, delivery speed, and technical standards compare to traditional agencies and low-cost outsourcing.
          </p>
        </div>
        <div className="comparison-grid">
          <div className="comparison-card glass-card agency-col">
            <div className="card-badge-placeholder"></div>
            <h3 className="card-entity-title">Traditional Agency</h3>
            <p className="card-entity-price">$$$$ (Overpriced)</p>
            <p className="card-entity-subtitle">High overhead, slow execution, layers of project managers.</p>
            <ul className="comparison-features-list">
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Slow Load Times</strong><p>Often 3s–6s loading times due to bloated WordPress themes.</p></div></li>
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Indirect Communication</strong><p>You talk to Account Managers, not the developer writing your code.</p></div></li>
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Bloated Timelines</strong><p>Layers of bureaucracy delay launches to 2–3 months.</p></div></li>
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>No Performance Guarantees</strong><p>No penalty clauses or refund policies if your site scores red.</p></div></li>
            </ul>
          </div>
          <div className="comparison-card glass-card ayush-col recommended">
            <div className="recommended-badge">⚡ Recommended Choice</div>
            <h3 className="card-entity-title text-cyan">Ayush Kumar</h3>
            <p className="card-entity-price">$$ (50% Off Promo Active)</p>
            <p className="card-entity-subtitle">RSC-driven Next.js architecture, direct communication, shipped in 7 days.</p>
            <ul className="comparison-features-list">
              <li className="comparison-feature positive"><span className="feature-status">✓</span><div><strong>Sub-Second Load Time</strong><p>Guaranteed sub-1.5s load times with 98%+ Core Web Vitals scores.</p></div></li>
              <li className="comparison-feature positive"><span className="feature-status">✓</span><div><strong>Direct Developer Contact</strong><p>Speak directly via Slack/WhatsApp/Google Meet. Zero middlemen.</p></div></li>
              <li className="comparison-feature positive"><span className="feature-status">✓</span><div><strong>Lightning Fast Delivery</strong><p>Initial demo in 48 hours, full product shipped in 7–14 days.</p></div></li>
              <li className="comparison-feature positive"><span className="feature-status">✓</span><div><strong>100% Risk Reversal</strong><p>Money-back guarantee + 30 days of post-launch support.</p></div></li>
            </ul>
          </div>
          <div className="comparison-card glass-card cheap-col">
            <div className="card-badge-placeholder"></div>
            <h3 className="card-entity-title">Cheap Freelancers</h3>
            <p className="card-entity-price">$ (Budget-focused)</p>
            <p className="card-entity-subtitle">Unpredictable quality, spaghetti code, timezone alignment issues.</p>
            <ul className="comparison-features-list">
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Extremely Unstable Speeds</strong><p>Unoptimized assets, uncompressed code, and slow shared hosting.</p></div></li>
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Communication Friction</strong><p>Inconsistent responsiveness, timezone delays, or ghosting.</p></div></li>
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Spaghetti Templates</strong><p>Styling conflicts and security exploits from untrusted libraries.</p></div></li>
              <li className="comparison-feature negative"><span className="feature-status">✕</span><div><strong>Hidden Bug-Fixing Costs</strong><p>Requires hiring another developer to clean up the code later.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 2. REAL-WORLD OPTIMIZATION AUDITS ── */}
      <section className="container optimization-results-section" aria-labelledby="audits-heading">
        <div className="results-header text-center">
          <span className="section-label">Performance Case Studies</span>
          <h2 id="audits-heading" className="results-title">Real-World <span className="gradient-cyan-blue">Optimization Audits</span></h2>
          <p className="results-subtitle">
            Below are verified performance metrics comparing standard monolithic builds (like WordPress/Webflow/bloated React setups) against my engineered, headless Next.js architectures.
          </p>
        </div>
        <div className="results-comparison-grid">
          <div className="result-metric-card glass-card">
            <div className="metric-header">
              <span className="metric-name">First Contentful Paint (FCP)</span>
              <span className="metric-explanation">How fast text &amp; images render</span>
            </div>
            <div className="comparison-bars">
              <div className="bar-wrapper before">
                <span className="bar-label">Before (Legacy)</span>
                <div className="bar-outer"><div className="bar-inner slow" style={{ width: "85%" }}></div></div>
                <span className="bar-value value-slow">2.8s</span>
              </div>
              <div className="bar-wrapper after">
                <span className="bar-label">After (Optimized)</span>
                <div className="bar-outer"><div className="bar-inner fast" style={{ width: "18%" }}></div></div>
                <span className="bar-value value-fast">0.6s</span>
              </div>
            </div>
            <div className="metric-achievement-badge"><span>⚡ 78% Faster Page Load</span></div>
          </div>
          <div className="result-metric-card glass-card">
            <div className="metric-header">
              <span className="metric-name">Largest Contentful Paint (LCP)</span>
              <span className="metric-explanation">When main content is fully loaded</span>
            </div>
            <div className="comparison-bars">
              <div className="bar-wrapper before">
                <span className="bar-label">Before (Legacy)</span>
                <div className="bar-outer"><div className="bar-inner slow" style={{ width: "95%" }}></div></div>
                <span className="bar-value value-slow">5.4s</span>
              </div>
              <div className="bar-wrapper after">
                <span className="bar-label">After (Optimized)</span>
                <div className="bar-outer"><div className="bar-inner fast" style={{ width: "20%" }}></div></div>
                <span className="bar-value value-fast">1.1s</span>
              </div>
            </div>
            <div className="metric-achievement-badge"><span>⚡ 79% Less User Bounce Risk</span></div>
          </div>
          <div className="result-metric-card glass-card">
            <div className="metric-header">
              <span className="metric-name">Cumulative Layout Shift (CLS)</span>
              <span className="metric-explanation">Visual stability &amp; layout jumpiness</span>
            </div>
            <div className="comparison-bars">
              <div className="bar-wrapper before">
                <span className="bar-label">Before (Legacy)</span>
                <div className="bar-outer"><div className="bar-inner slow" style={{ width: "76%" }}></div></div>
                <span className="bar-value value-slow">0.38</span>
              </div>
              <div className="bar-wrapper after">
                <span className="bar-label">After (Optimized)</span>
                <div className="bar-outer"><div className="bar-inner fast" style={{ width: "4%" }}></div></div>
                <span className="bar-value value-fast">0.01</span>
              </div>
            </div>
            <div className="metric-achievement-badge"><span>⚡ 97% Better Visual Stability</span></div>
          </div>
          <div className="result-metric-card glass-card">
            <div className="metric-header">
              <span className="metric-name">Time to Interactive (TTI)</span>
              <span className="metric-explanation">How fast the page responds to taps/clicks</span>
            </div>
            <div className="comparison-bars">
              <div className="bar-wrapper before">
                <span className="bar-label">Before (Legacy)</span>
                <div className="bar-outer"><div className="bar-inner slow" style={{ width: "90%" }}></div></div>
                <span className="bar-value value-slow">6.8s</span>
              </div>
              <div className="bar-wrapper after">
                <span className="bar-label">After (Optimized)</span>
                <div className="bar-outer"><div className="bar-inner fast" style={{ width: "12%" }}></div></div>
                <span className="bar-value value-fast">0.8s</span>
              </div>
            </div>
            <div className="metric-achievement-badge"><span>⚡ 88% Faster User Interaction</span></div>
          </div>
        </div>
      </section>


      <motion.main
        variants={isMobile ? undefined : containerVariants}
        initial={isMobile ? undefined : "hidden"}
        animate={isMobile ? undefined : "visible"}
        className="container speed-main-grid"
      >
        {/* Left Side: Guarantees & Stack */}
        <div className="speed-left-col">
          {/* Main Dial Showcase */}
          <motion.section variants={itemVariants} className="speed-section glass-card stats-overview-card">
            <div className="stats-header">
              <h2 className="section-card-heading">
                <Gauge size={20} className="text-cyan" /> Optimization Dashboard
              </h2>
              <span className="status-badge">⚡ Verified Live Audit</span>
            </div>

            <div className="scores-showcase-row">
              <div className="score-dial-wrap">
                <svg className="score-dial" viewBox="0 0 120 120">
                  <circle className="dial-bg" cx="60" cy="60" r="50" />
                  <circle className="dial-fg perf" cx="60" cy="60" r="50" style={{ strokeDashoffset: 314 * (1 - 0.99) }} />
                </svg>
                <div className="score-label">
                  <span className="score-number perf">99</span>
                  <span className="score-name">Performance</span>
                </div>
              </div>

              <div className="score-dial-wrap">
                <svg className="score-dial" viewBox="0 0 120 120">
                  <circle className="dial-bg" cx="60" cy="60" r="50" />
                  <circle className="dial-fg access" cx="60" cy="60" r="50" style={{ strokeDashoffset: 314 * (1 - 0.98) }} />
                </svg>
                <div className="score-label">
                  <span className="score-number access">98</span>
                  <span className="score-name">Accessibility</span>
                </div>
              </div>

              <div className="score-dial-wrap">
                <svg className="score-dial" viewBox="0 0 120 120">
                  <circle className="dial-bg" cx="60" cy="60" r="50" />
                  <circle className="dial-fg practices" cx="60" cy="60" r="50" style={{ strokeDashoffset: 314 * (1 - 0.97) }} />
                </svg>
                <div className="score-label">
                  <span className="score-number practices">97</span>
                  <span className="score-name">Best Practices</span>
                </div>
              </div>

              <div className="score-dial-wrap">
                <svg className="score-dial" viewBox="0 0 120 120">
                  <circle className="dial-bg" cx="60" cy="60" r="50" />
                  <circle className="dial-fg seo" cx="60" cy="60" r="50" style={{ strokeDashoffset: 314 * (1 - 1.0) }} />
                </svg>
                <div className="score-label">
                  <span className="score-number seo">100</span>
                  <span className="score-name">SEO Score</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Performance Optimization Stack */}
          <motion.section variants={itemVariants} className="speed-section glass-card stack-card">
            <h2 className="section-card-heading">
              <Cpu size={20} className="text-cyan" /> Optimization Framework & Stack
            </h2>
            <p className="section-card-desc">
              High scores are not accidental. They are the product of combining modern structural patterns with rigorous asset delivery controls.
            </p>

            <div className="tech-checklist">
              <div className="checklist-item">
                <div className="check-box"><Check size={14} /></div>
                <div>
                  <strong>Next.js App Router (React Server Components)</strong>
                  <p>Minimizes the client-side javascript bundle size by rendering structures on the edge.</p>
                </div>
              </div>
              <div className="checklist-item">
                <div className="check-box"><Check size={14} /></div>
                <div>
                  <strong>Asset Compressing Pipelines</strong>
                  <p>Images converted to modern WebP/AVIF formats dynamically, and 3D models compressed using Draco mesh pipelines to reduce asset payloads by up to 90%.</p>
                </div>
              </div>
              <div className="checklist-item">
                <div className="check-box"><Check size={14} /></div>
                <div>
                  <strong>Edge CDN Delivery & Staging</strong>
                  <p>Static pages are fully prerendered and cached closer to your global clients via Vercel Edge networks to reduce TTFB (Time to First Byte) under 40ms.</p>
                </div>
              </div>
              <div className="checklist-item">
                <div className="check-box"><Check size={14} /></div>
                <div>
                  <strong>Semantic SEO & Core Web Vitals Scoping</strong>
                  <p>Pre-connecting third-party font resources, avoiding layout shifts (CLS) through fixed layout skeletons, and preserving valid HTML5 heading hierarchies.</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Side: Project Metrics Registry */}
        <div className="speed-right-col">
          <motion.section variants={itemVariants} className="speed-section glass-card registry-card">
            <h2 className="section-card-heading">
              <Activity size={20} className="text-cyan" /> Project Speeds Registry
            </h2>
            <p className="section-card-desc">
              Below is the performance audit report registry compiled across live clients. Click on any case study to review the full details.
            </p>

            <div className="registry-grid">
              {performanceProjects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug} className="registry-item glass-card" data-hover>
                  <div className="registry-item-header">
                    <h3 className="registry-item-title">{project.title}</h3>
                    <ChevronRight size={16} className="arrow-icon" />
                  </div>
                  
                  {project.lighthouseMetrics && (
                    <div className="registry-metrics-row">
                      <div className="registry-metric">
                        <span className="dot performance"></span>
                        <span>Perf: <strong>{project.lighthouseMetrics.performance}%</strong></span>
                      </div>
                      <div className="registry-metric">
                        <span className="dot accessibility"></span>
                        <span>Access: <strong>{project.lighthouseMetrics.accessibility}%</strong></span>
                      </div>
                      <div className="registry-metric">
                        <span className="dot best-practices"></span>
                        <span>Practices: <strong>{project.lighthouseMetrics.bestPractices}%</strong></span>
                      </div>
                      <div className="registry-metric">
                        <span className="dot seo"></span>
                        <span>SEO: <strong>{project.lighthouseMetrics.seo}%</strong></span>
                      </div>
                    </div>
                  )}

                  {project.mobileMetrics && (
                    <div className="registry-metrics-row">
                      <div className="registry-metric">
                        <span className="dot performance"></span>
                        <span>Startup: <strong>{project.mobileMetrics.startupTime}</strong></span>
                      </div>
                      <div className="registry-metric">
                        <span className="dot accessibility"></span>
                        <span>Size: <strong>{project.mobileMetrics.bundleSize}</strong></span>
                      </div>
                      <div className="registry-metric">
                        <span className="dot best-practices"></span>
                        <span>Crash-free: <strong>{project.mobileMetrics.crashFreeRate}</strong></span>
                      </div>
                      <div className="registry-metric">
                        <span className="dot seo"></span>
                        <span>FPS: <strong>{project.mobileMetrics.fps}</strong></span>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Performance Guarantee */}
          <motion.section variants={itemVariants} className="speed-section glass-card guarantee-card">
            <h3 className="guarantee-heading">
              <ShieldCheck size={20} className="text-cyan" /> Sub-Second Load Guarantee
            </h3>
            <p className="guarantee-desc">
              All websites I design and develop are backed by a performance pledge: **If your website loads slower than 1.5 seconds on a standard mobile connection during delivery, I will work for free until it does.**
            </p>
            <Link href="/estimator" className="estimator-cta-btn" data-hover>
              Build Fast Website <Zap size={14} style={{ marginLeft: "6px" }} />
            </Link>
          </motion.section>
        </div>
      </motion.main>

      {/* Trust & Risk Reversal Guarantees Section */}
      <section className="container trust-guarantees-section">
        <div className="guarantees-header text-center">
          <span className="section-label">Risk Reversal</span>
          <h2 className="guarantees-title">Zero-Risk <span className="gradient-cyan-blue">Client Protections</span></h2>
          <p className="guarantees-subtitle">
            Hiring a freelancer shouldn't feel like a leap of faith. I back all projects with strict contractual guarantees to protect your time and capital.
          </p>
        </div>

        <div className="guarantees-grid">
          {/* Guarantee 1 */}
          <div className="guarantee-badge-card glass-card">
            <div className="guarantee-icon-wrapper money-back">
              <ShieldCheck size={28} />
            </div>
            <h3>100% Money-Back Guarantee</h3>
            <p>If the initial milestone delivery does not meet your expectations, you get a full refund. No questions asked, no risk on your budget.</p>
          </div>

          {/* Guarantee 2 */}
          <div className="guarantee-badge-card glass-card">
            <div className="guarantee-icon-wrapper support">
              <Activity size={28} />
            </div>
            <h3>30-Day Post-Launch Support</h3>
            <p>Includes free technical updates, hosting configuration, and bug fixes for 30 days after launch to ensure your application remains stable.</p>
          </div>

          {/* Guarantee 3 */}
          <div className="guarantee-badge-card glass-card">
            <div className="guarantee-icon-wrapper upfront">
              <Zap size={28} />
            </div>
            <h3>Zero Upfront Payments</h3>
            <p>I build the first interactive wireframe or high-fidelity design mockup before you pay a single dollar. Pay only when you approve the direction.</p>
          </div>
        </div>
      </section>




      {/* Styled JSX */}
      <style>{`
        .speed-page {
          min-height: 100vh;
          background: #000000;
          color: #f8fafc;
          padding: 120px 0;
          position: relative;
          overflow-x: hidden;
        }

        .speed-header {
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

        .speed-hero-content {
          margin-top: 0;
        }

        .speed-title {
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .speed-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 850px;
        }

        .speed-main-grid {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .speed-left-col,
        .speed-right-col {
          width: 100%;
        }

        .section-card-heading {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-white);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .stats-overview-card {
          padding: 28px;
          margin-bottom: 36px;
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .status-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.06);
          border: 1px solid rgba(0, 242, 254, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .scores-showcase-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (min-width: 480px) {
          .scores-showcase-row {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .score-dial-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .score-dial {
          width: 90px;
          height: 90px;
          transform: rotate(-90deg);
        }

        .dial-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.03);
          stroke-width: 8px;
        }

        .dial-fg {
          fill: none;
          stroke-width: 8px;
          stroke-linecap: round;
          stroke-dasharray: 314;
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 1s ease-out;
        }

        .dial-fg.perf { stroke: #00cc66; filter: drop-shadow(0 0 6px rgba(0, 204, 102, 0.3)); }
        .dial-fg.access { stroke: #00cc66; filter: drop-shadow(0 0 6px rgba(0, 204, 102, 0.3)); }
        .dial-fg.practices { stroke: #00cc66; filter: drop-shadow(0 0 6px rgba(0, 204, 102, 0.3)); }
        .dial-fg.seo { stroke: #00cc66; filter: drop-shadow(0 0 6px rgba(0, 204, 102, 0.3)); }

        .score-label {
          position: absolute;
          top: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .score-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 800;
        }

        .score-number.perf, .score-number.access, .score-number.practices, .score-number.seo {
          color: #00cc66;
        }

        .score-name {
          font-size: 9px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 24px;
          white-space: nowrap;
        }

        .stack-card {
          padding: 28px;
        }

        .tech-checklist {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .checklist-item {
          display: flex;
          gap: 16px;
        }

        .check-box {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.06);
          border: 1px solid rgba(0, 242, 254, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checklist-item strong {
          display: block;
          font-size: 14.5px;
          color: var(--text-white);
          margin-bottom: 4px;
        }

        .checklist-item p {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .registry-card {
          padding: 28px;
          width: 100%;
        }

        .registry-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 600px) {
          .registry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .registry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .registry-item {
          padding: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .registry-item:hover {
          border-color: rgba(0, 242, 254, 0.2);
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-2px);
        }

        .registry-item:hover .arrow-icon {
          color: var(--accent-cyan);
          transform: translateX(3px);
        }

        .registry-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .registry-item-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-white);
        }

        .arrow-icon {
          color: var(--muted);
          transition: all 0.2s ease;
        }

        .registry-metrics-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .registry-metric {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: var(--muted);
        }

        .registry-metric strong {
          color: #00cc66;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00cc66;
          box-shadow: 0 0 5px #00cc66;
        }

        .guarantee-card {
          padding: 24px;
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.03) 0%, rgba(3, 0, 20, 0.95) 100%);
          border-color: rgba(0, 242, 254, 0.15);
          margin-top: 36px;
        }

        .guarantee-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-white);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .guarantee-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .estimator-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
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

        .estimator-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
        }

        .trust-guarantees-section {
          padding-top: 80px;
          margin-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .guarantees-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .guarantees-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .guarantees-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .guarantees-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 24px;
        }

        @media (min-width: 768px) {
          .guarantees-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 1024px) {
          .guarantees-grid {
            gap: 28px;
          }
        }

        .guarantee-badge-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 36px 28px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .guarantee-badge-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 242, 254, 0.2);
          box-shadow: 0 10px 30px rgba(0, 242, 254, 0.04);
        }

        .guarantee-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .guarantee-icon-wrapper.money-back {
          background: rgba(0, 204, 102, 0.06);
          border: 1px solid rgba(0, 204, 102, 0.25);
          color: #00cc66;
        }

        .guarantee-icon-wrapper.support {
          background: rgba(0, 242, 254, 0.06);
          border: 1px solid rgba(0, 242, 254, 0.25);
          color: var(--accent-cyan);
        }

        .guarantee-icon-wrapper.upfront {
          background: rgba(139, 92, 246, 0.06);
          border: 1px solid rgba(139, 92, 246, 0.25);
          color: var(--violet);
        }

        .guarantee-badge-card h3 {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-white);
        }

        .guarantee-badge-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .optimization-results-section {
          padding-top: 80px;
          margin-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .results-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .results-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .results-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .results-comparison-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          margin-top: 24px;
        }

        @media (min-width: 768px) {
          .results-comparison-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        .result-metric-card {
          padding: 32px 24px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .result-metric-card:hover {
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .metric-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-name {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-white);
        }

        .metric-explanation {
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        .comparison-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bar-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .bar-label {
          width: 120px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .bar-outer {
          flex-grow: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .bar-inner {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .bar-inner.slow {
          background: linear-gradient(90deg, #ef4444 0%, #f97316 100%);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        .bar-inner.fast {
          background: linear-gradient(90deg, #00cc66 0%, var(--accent-cyan) 100%);
          box-shadow: 0 0 10px rgba(0, 204, 102, 0.35);
        }

        .bar-value {
          width: 50px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          font-weight: 700;
          text-align: right;
        }

        .value-slow {
          color: #ef4444;
        }

        .value-fast {
          color: #00cc66;
        }

        .metric-achievement-badge {
          display: inline-flex;
          align-self: flex-start;
          background: rgba(0, 204, 102, 0.08);
          border: 1px solid rgba(0, 204, 102, 0.2);
          padding: 6px 12px;
          border-radius: 4px;
        }

        .metric-achievement-badge span {
          color: #00cc66;
          font-size: 12px;
          font-weight: 700;
        }

        .comparison-section {
          padding-top: 80px;
          margin-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .comparison-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .comparison-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .comparison-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 24px;
        }

        @media (min-width: 768px) {
          .comparison-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 1024px) {
          .comparison-grid {
            gap: 28px;
          }
        }

        .comparison-card {
          position: relative;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .comparison-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .comparison-card.recommended {
          border-color: rgba(0, 242, 254, 0.25);
          background: rgba(0, 242, 254, 0.015);
          box-shadow: 0 10px 30px rgba(0, 242, 254, 0.05);
        }

        .comparison-card.recommended:hover {
          border-color: rgba(0, 242, 254, 0.45);
          box-shadow: 0 15px 35px rgba(0, 242, 254, 0.1);
        }

        .recommended-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
          color: #000000;
          font-size: 10px;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          box-shadow: 0 4px 12px rgba(0, 242, 254, 0.25);
          white-space: nowrap;
        }

        .card-badge-placeholder {
          height: 14px;
        }

        .card-entity-title {
          font-size: 20px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 6px;
        }

        .card-entity-price {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          text-align: center;
          margin-bottom: 16px;
        }

        .agency-col .card-entity-price { color: #ef4444; }
        .ayush-col .card-entity-price { color: #00cc66; }
        .cheap-col .card-entity-price { color: #e2e8f0; }

        .card-entity-subtitle {
          font-size: 12.5px;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.5;
          min-height: 38px;
        }

        .comparison-features-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .comparison-feature {
          display: flex;
          gap: 12px;
        }

        .comparison-feature strong {
          display: block;
          font-size: 13.5px;
          color: var(--text-white);
          margin-bottom: 3px;
        }

        .comparison-feature p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .feature-status {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .comparison-feature.positive .feature-status {
          background: rgba(0, 204, 102, 0.08);
          border: 1px solid rgba(0, 204, 102, 0.25);
          color: #00cc66;
        }

        .comparison-feature.negative .feature-status {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
        }

        .gradient-cyan-blue {
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
