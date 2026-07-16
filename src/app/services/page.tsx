"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Cpu, Sparkles, ShoppingBag, HelpCircle, Layers, Settings, ShieldCheck, Zap, FileText } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const servicesData = [
    {
      icon: <Globe size={28} className="text-cyan" />,
      name: "Web Development",
      tagline: "High-performance, search-optimized websites",
      price: "Starts at $75 (Reg. $150 - 50% Off)",
      timeline: "2 - 4 Weeks",
      desc: "Bespoke marketing websites, modern landing pages, and content systems built to load in milliseconds. Standardized on clean Next.js architectures to maximize SEO rankings and user conversions.",
      features: ["Next.js Server Side Rendering (SSR)", "Fully responsive & custom CSS layouts", "Deep Search Engine Optimization (SEO)", "Headless CMS & Markdown integrations"],
      color: "var(--accent-cyan)",
    },
    {
      icon: <Smartphone size={28} className="text-purple" />,
      name: "Mobile App Development",
      tagline: "Cross-platform iOS & Android engineering",
      price: "Starts at $375 (Reg. $750 - 50% Off)",
      timeline: "4 - 8 Weeks",
      desc: "Native-quality mobile applications developed using React Native and Expo. Tailored for smooth offline operations, secure storage, dynamic updates, and high-performance cross-device rendering.",
      features: ["React Native & Expo Ecosystem", "Offline database caching (SQLite/AsyncStorage)", "Push Notifications & Location Services", "App Store & Play Store publishing support"],
      color: "#A855F7",
    },
    {
      icon: <Cpu size={28} className="text-blue" />,
      name: "Full Stack Development",
      tagline: "Scalable backend databases and dynamic portals",
      price: "Starts at $300 (Reg. $600 - 50% Off)",
      timeline: "6 - 12 Weeks",
      desc: "Robust, custom-engineered SaaS systems, internal enterprise portals, and secure API networks. Using secure databases and caching layers to guarantee lightning-fast data processing.",
      features: ["Node.js / NestJS API frameworks", "PostgreSQL / MongoDB integrations", "Real-time updates via WebSockets", "Secure JWT & Role-Based Access Control (RBAC)"],
      color: "#3B82F6",
    },
    {
      icon: <Settings size={28} style={{ color: "#E44D26" }} />,
      name: "WordPress Customization",
      tagline: "Custom corporate and commercial themes",
      price: "Starts at $150 (Reg. $300 - 50% Off)",
      timeline: "2 - 3 Weeks",
      desc: "Optimized corporate and portfolio sites. Complete custom theme construction and plugin development that avoids heavy builders, assuring rapid loading times and clean codebases.",
      features: ["Custom WP Theme development", "Advanced Custom Fields (ACF) templates", "Core Web Vitals & speed optimizations", "Complete responsiveness & SEO styling"],
      color: "#E44D26",
    },
    {
      icon: <Sparkles size={28} style={{ color: "#F59E0B" }} />,
      name: "AI Integrations (Meta AI)",
      tagline: "Automated business logic and intelligence tools",
      price: "Starts at $200 (Reg. $400 - 50% Off)",
      timeline: "3 - 6 Weeks",
      desc: "Integration of modern language models, automated agent flows, and smart recommendation features into your business interfaces. Boost user engagement with interactive smart assistants.",
      features: ["LLM API integrations (OpenAI/Gemini)", "Custom Retrieval-Augmented Generation (RAG)", "Automated email/chat response systems", "Data scraping & analytics extraction"],
      color: "#F59E0B",
    },
    {
      icon: <ShoppingBag size={28} className="text-green" />,
      name: "E-Commerce (Shopify)",
      tagline: "High-converting storefronts built for scale",
      price: "Starts at $200 (Reg. $400 - 50% Off)",
      timeline: "3 - 5 Weeks",
      desc: "Custom Shopify storefront engineering leveraging custom Liquid templates, third-party logistics integrations, dynamic product configurators, and conversion rate optimizations.",
      features: ["Bespoke Shopify Liquid development", "Dynamic payment gateway setup", "Inventory sync & fulfillment automations", "Optimized mobile checkout pathways"],
      color: "#10B981",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Discovery & Blueprint",
      desc: "We discuss your product requirements. Using our custom pricing estimator, we establish the scope, define deliverables, and formulate a clear cost model.",
    },
    {
      step: "02",
      title: "Architecture & UI UX",
      desc: "We plan the layout, map application states, and design high-fidelity components in Figma. We focus heavily on speed and responsive usability.",
    },
    {
      step: "03",
      title: "Clean Implementation",
      desc: "The app is engineered using high-performance code, utilizing semantic layout, vanilla CSS tokens, and optimal state management structures.",
    },
    {
      step: "04",
      title: "QA, Polish & Launch",
      desc: "We perform extreme speed checks (Lighthouse, Core Web Vitals) and secure integration tests. The product is launched on production (Vercel, AWS, or app stores).",
    },
  ];

  const faqs = [
    {
      q: "Who owns the source code once the project is finished?",
      a: "You do. You retain 100% intellectual property ownership of the codebase, assets, and databases. The code is delivered via a private GitHub repository once final payment is cleared.",
    },
    {
      q: "Do you provide post-launch maintenance and technical support?",
      a: "Yes. Every contract includes a standard 30-day post-launch warranty cover during which all bug fixes and performance corrections are resolved for free. I also offer monthly technical maintenance retainers.",
    },
    {
      q: "Can I upgrade or scale my website features later?",
      a: "Absolutely. I write clean, documented, component-driven TypeScript. Any other developers you hire in the future will be able to easily read, maintain, and scale the codebase without issue.",
    },
    {
      q: "What is your payment structure for new projects?",
      a: "Typically, I structure milestones based on project scope: 40% upfront deposit to initiate planning, 30% upon approval of the architecture/midway review, and 30% upon final launch approval.",
    },
  ];

  return (
    <div className="services-page">
      {/* Background gradients */}
      <div className="orb orb-1" style={{ top: "-10%", left: "10%", opacity: 0.15 }} />
      <div className="orb orb-2" style={{ top: "30%", right: "5%", opacity: 0.1 }} />
      <div className="orb orb-3" style={{ bottom: "10%", left: "20%", opacity: 0.12 }} />

      <header className="services-header container">
        <div className="services-hero-text">
          <span className="section-label">Expertise & Capabilities</span>
          <h1 className="services-title">
            Bespoke <span className="gradient-text">Development Services</span>
          </h1>
          <p className="services-subtitle">
            Premium frontend interfaces, robust cross-platform mobile apps, and custom web portals engineered for speed, SEO, and absolute user engagement.
          </p>
        </div>
      </header>

      {/* Client Prerequisites & Guarantees Section */}
      <section className="collaboration-section container">
        <div className="sec-header-center">
          <span className="section-label">Collaboration Blueprint</span>
          <h2 className="sec-title-center">Project Alignment & Commitments</h2>
          <p className="sec-subtitle-center">
            A transparent framework designed to align expectations, streamline development, and guarantee exceptional results.
          </p>
        </div>

        <div className="blueprint-grid">
          {/* Card 1: What We Require */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="blueprint-card require-card glass-card"
          >
            <div className="blueprint-card-header">
              <div className="blueprint-icon-box req-icon">
                <FileText size={26} className="text-cyan" />
              </div>
              <div className="blueprint-header-meta">
                <h3 className="blueprint-card-title">What We Require From You</h3>
                <span className="blueprint-card-subtitle">Essential inputs to initiate engineering</span>
              </div>
            </div>

            <div className="blueprint-list">
              <div className="blueprint-item">
                <span className="bullet-num">01</span>
                <div className="blueprint-content">
                  <h4>SRS / Scope Document</h4>
                  <p>A Software Requirements Specification or detailed outline defining target features, core user stories, and ultimate project goals.</p>
                </div>
              </div>

              <div className="blueprint-item">
                <span className="bullet-num">02</span>
                <div className="blueprint-content">
                  <h4>Brand Assets & Figma Designs</h4>
                  <p>High-fidelity Figma mockups, wireframes, logos, custom typography preferences, and branding guidelines.</p>
                </div>
              </div>

              <div className="blueprint-item">
                <span className="bullet-num">03</span>
                <div className="blueprint-content">
                  <h4>API & Database Specifications</h4>
                  <p>Existing backend API documentation, data schemas, or credentials for any third-party integrations needed.</p>
                </div>
              </div>

              <div className="blueprint-item">
                <span className="bullet-num">04</span>
                <div className="blueprint-content">
                  <h4>Active Feedback Loops</h4>
                  <p>Prompt communication and availability for brief check-ins during milestone reviews to ensure timely launch.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: What We Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="blueprint-card deliver-card glass-card"
          >
            <div className="blueprint-card-header">
              <div className="blueprint-icon-box del-icon">
                <ShieldCheck size={26} className="text-purple" />
              </div>
              <div className="blueprint-header-meta">
                <h3 className="blueprint-card-title">What We Guarantee In Return</h3>
                <span className="blueprint-card-subtitle">Our core commitments to your project</span>
              </div>
            </div>

            <div className="blueprint-list">
              <div className="blueprint-item">
                <span className="bullet-num">01</span>
                <div className="blueprint-content">
                  <h4>Timely & Transparent Updates</h4>
                  <p>Routine progress reports, structured demo sessions, and interactive staging links so you can track progress live.</p>
                </div>
              </div>

              <div className="blueprint-item">
                <span className="bullet-num">02</span>
                <div className="blueprint-content">
                  <h4>Rigorous Testing & QA</h4>
                  <p>Comprehensive end-to-end testing, full mobile/tablet responsive testing, and speed optimization for perfect Core Web Vitals.</p>
                </div>
              </div>

              <div className="blueprint-item">
                <span className="bullet-num">03</span>
                <div className="blueprint-content">
                  <h4>Premium & Clean Codebase</h4>
                  <p>100% intellectual property ownership of a modular, fully documented, component-driven React / Next.js / TypeScript codebase.</p>
                </div>
              </div>

              <div className="blueprint-item">
                <span className="bullet-num">04</span>
                <div className="blueprint-content">
                  <h4>Post-Launch Technical Support</h4>
                  <p>30 days of complimentary technical warranty cover to address any post-launch bugs, performance checks, or hosting adjustments.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <main className="container services-main">
        <div className="services-grid">
          {servicesData.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="svc-card glass-card"
              style={{ borderColor: `rgba(255, 255, 255, 0.05)` }}
            >
              <div className="svc-card-header">
                <div className="svc-icon-box" style={{ background: `rgba(${svc.color === "var(--accent-cyan)" ? "6, 182, 212" : "124, 58, 237"}, 0.08)` }}>
                  {svc.icon}
                </div>
                <div className="svc-card-meta">
                  <h3 className="svc-card-name">{svc.name}</h3>
                  <span className="svc-card-tagline">{svc.tagline}</span>
                </div>
              </div>

              <div className="svc-card-pricing-row">
                <div className="svc-price-metric">
                  <span className="metric-label">INVESTMENT</span>
                  <span className="metric-val">{svc.price}</span>
                </div>
                <div className="svc-price-metric">
                  <span className="metric-label">TIMELINE</span>
                  <span className="metric-val">{svc.timeline}</span>
                </div>
              </div>

              <p className="svc-card-desc">{svc.desc}</p>

              <div className="svc-card-features">
                <span className="features-label">Core Deliverables:</span>
                <ul>
                  {svc.features.map((feat) => (
                    <li key={feat}>
                      <Zap size={12} className="feat-bullet-icon" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="svc-card-footer">
                <Link href="/#contact" className="svc-estimate-btn">
                  Book Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Project Roadmap section */}
      <section className="services-workflow-sec container">
        <div className="sec-header-center">
          <span className="section-label">Our Process</span>
          <h2 className="sec-title-center">Project Development Roadmap</h2>
          <p className="sec-subtitle-center">
            How we translate your product concept into a high-performance production system.
          </p>
        </div>

        <div className="workflow-timeline-grid">
          {workflow.map((wf, idx) => (
            <div key={wf.step} className="wf-node glass-card">
              <span className="wf-step-num">{wf.step}</span>
              <h3 className="wf-step-title">{wf.title}</h3>
              <p className="wf-step-desc">{wf.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="services-faq-sec container">
        <div className="sec-header-center">
          <span className="section-label">Questions & Answers</span>
          <h2 className="sec-title-center">Frequently Asked Questions</h2>
          <p className="sec-subtitle-center">
            Honest answers about the development process, ownership, and client collaborations.
          </p>
        </div>

        <div className="faq-accordion-wrap">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-node glass-card ${activeFaq === idx ? "active" : ""}`}
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            >
              <div className="faq-question-row">
                <span className="faq-question-text">{faq.q}</span>
                <HelpCircle size={18} className="faq-icon" />
              </div>
              {activeFaq === idx && (
                <div className="faq-answer-row">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="services-footer-cta">
          <div className="glass-card cta-inner-card">
            <h3>Ready to Scope Your Project?</h3>
            <p>Use our interactive estimator to estimate features and request an instant cost framing.</p>
            <div className="cta-buttons-row">
              <Link href="/#estimator" className="cta-primary-btn">
                Launch Pricing Estimator
              </Link>
              <Link href="/#contact" className="cta-secondary-btn">
                Contact Directly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .services-page {
          min-height: 100vh;
          background: #000000;
          color: #f8fafc;
          padding: 120px 0 120px;
          position: relative;
          overflow-x: hidden;
        }

        .services-header {
          margin-bottom: 64px;
        }

        /* Blueprint / Collaboration Section Styles */
        .collaboration-section {
          margin-top: 0px;
          margin-bottom: 96px;
        }

        .blueprint-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 992px) {
          .blueprint-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .blueprint-card {
          border-radius: 24px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .require-card:hover {
          transform: translateY(-4px);
          border-color: rgba(6, 182, 212, 0.25) !important;
          box-shadow: 0 12px 40px rgba(6, 182, 212, 0.08);
        }

        .deliver-card:hover {
          transform: translateY(-4px);
          border-color: rgba(168, 85, 247, 0.25) !important;
          box-shadow: 0 12px 40px rgba(168, 85, 247, 0.08);
        }

        .blueprint-card-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 24px;
        }

        .blueprint-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .req-icon {
          background: rgba(6, 182, 212, 0.06);
        }

        .del-icon {
          background: rgba(168, 85, 247, 0.06);
        }

        .blueprint-card-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-white);
          letter-spacing: -0.01em;
        }

        .blueprint-card-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .blueprint-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .blueprint-item {
          display: flex;
          gap: 20px;
        }

        .bullet-num {
          font-size: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          color: var(--text-secondary);
          opacity: 0.5;
          margin-top: 3px;
        }

        .blueprint-content h4 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 6px;
        }

        .blueprint-content p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .services-hero-text {
          max-width: 800px;
        }

        .services-title {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 12px;
          margin-bottom: 20px;
        }

        .services-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .svc-card {
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(124, 58, 237, 0.12);
        }

        .svc-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .svc-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .svc-card-meta {
          flex: 1;
        }

        .svc-card-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 4px;
        }

        .svc-card-tagline {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .svc-card-pricing-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .svc-price-metric {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 4px;
          font-weight: 600;
        }

        .metric-val {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .svc-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .svc-card-features {
          margin-bottom: 28px;
        }

        .features-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-white);
          display: block;
          margin-bottom: 12px;
        }

        .svc-card-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .svc-card-features li {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feat-bullet-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
        }

        .svc-card-footer {
          margin-top: auto;
        }

        .svc-estimate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: var(--text-white);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          
        }

        .svc-estimate-btn:hover,
        .svc-estimate-btn:focus,
        .svc-estimate-btn:active,
        .svc-estimate-btn:focus-visible {
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.25);
          outline: none !important;
        }

        /* Workflow timelines */
        .services-workflow-sec {
          margin-top: 120px;
        }

        .sec-header-center {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 64px;
        }

        .sec-title-center {
          font-size: 36px;
          font-weight: 800;
          margin-top: 12px;
          margin-bottom: 16px;
        }

        .sec-subtitle-center {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .workflow-timeline-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .workflow-timeline-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .workflow-timeline-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .wf-node {
          padding: 32px;
          border-radius: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .wf-step-num {
          font-size: 32px;
          font-weight: 900;
          color: rgba(6, 182, 212, 0.15);
          font-family: var(--font-mono);
          line-height: 1;
          margin-bottom: 16px;
        }

        .wf-step-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 12px;
        }

        .wf-step-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* FAQ */
        .services-faq-sec {
          margin-top: 120px;
          padding-bottom: 60px;
        }

        .faq-accordion-wrap {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-node {
          padding: 20px 24px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-node:hover {
          border-color: rgba(6, 182, 212, 0.25);
        }

        .faq-question-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-question-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-white);
        }

        .faq-icon {
          color: var(--text-secondary);
          transition: transform 0.3s ease;
        }

        .faq-node.active .faq-icon {
          transform: rotate(180deg);
          color: var(--accent-cyan);
        }

        .faq-answer-row {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Footer CTA */
        .services-footer-cta {
          margin-top: 96px;
          text-align: center;
        }

        .cta-inner-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px;
          border-radius: 28px;
        }

        .cta-inner-card h3 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 12px;
          color: var(--text-white);
        }

        .cta-inner-card p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .cta-buttons-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-primary-btn {
          padding: 14px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%);
          border: none;
          color: var(--white);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          
        }

         .cta-primary-btn:hover,
         .cta-primary-btn:focus,
         .cta-primary-btn:active,
         .cta-primary-btn:focus-visible {
           transform: translateY(-2px);
           box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
           outline: none !important;
         }
 
         .cta-secondary-btn {
           padding: 14px 28px;
           border-radius: 12px;
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid rgba(255, 255, 255, 0.08);
           color: var(--white);
           font-weight: 600;
           text-decoration: none;
           transition: all 0.3s ease;
           
         }
 
         .cta-secondary-btn:hover,
         .cta-secondary-btn:focus,
         .cta-secondary-btn:active,
         .cta-secondary-btn:focus-visible {
           background: rgba(255, 255, 255, 0.08);
           border-color: rgba(255, 255, 255, 0.15);
           outline: none !important;
         }
        }
      `}</style>
    </div>
  );
}
