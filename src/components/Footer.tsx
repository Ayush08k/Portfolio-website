import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        background: "radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.04) 0%, #000000 70%)",
        padding: "70px 20px 40px",
        color: "#94a3b8",
        fontSize: "13px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Main Grid: 4 Structured Columns for Deep Search Crawler Indexing */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px 24px",
            marginBottom: "50px",
            textAlign: "left",
          }}
        >
          {/* Column 1: Brand & Core Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <img
                src="/logofinal.png"
                alt="Ayush Kumar Logo"
                style={{ height: "36px", width: "auto" }}
              />
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em" }}>
                Ayush Kumar
              </span>
            </div>
            <p style={{ lineHeight: "1.7", color: "#64748b", fontSize: "12.5px", marginBottom: "18px" }}>
              India&apos;s leading freelance full stack &amp; mobile app developer. Building sub-second web applications, SaaS platforms, and production iOS/Android apps with 50% discount.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="https://github.com/Ayush08k"
                target="_blank"
                rel="noopener noreferrer me"
                style={{ color: "#94a3b8", transition: "color 0.2s" }}
                aria-label="GitHub"
              >
                GitHub
              </a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>&bull;</span>
              <a
                href="https://www.linkedin.com/in/ayush08k/"
                target="_blank"
                rel="noopener noreferrer me"
                style={{ color: "#94a3b8", transition: "color 0.2s" }}
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>&bull;</span>
              <a
                href="https://x.com/aayush08k"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#94a3b8", transition: "color 0.2s" }}
                aria-label="Twitter/X"
              >
                X (Twitter)
              </a>
            </div>
          </div>

          {/* Column 2: Core Hubs & Pages */}
          <div>
            <h3
              style={{
                color: "#f8fafc",
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Services &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/projects" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Project Archive (50+)
                </Link>
              </li>
              <li>
                <Link href="/estimator" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Instant Cost Estimator
                </Link>
              </li>
              <li>
                <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Developer Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/careers" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Careers (We&apos;re Hiring)
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  About Ayush
                </Link>
              </li>
              <li>
                <Link href="/speed" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Performance Benchmark
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Technical Guides (Direct Crawl Signals for GSC) */}
          <div>
            <h3
              style={{
                color: "#f8fafc",
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Featured Guides
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link
                  href="/blog/building-ai-chatbot-portfolio-nextjs-gemini"
                  style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                >
                  Building AI Chatbot with Next.js &amp; Gemini
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-chatbot-ecommerce-rag-gpt4"
                  style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                >
                  E-Commerce RAG Chatbot with GPT-4
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-build-sub-second-website-nextjs-performance-blueprint"
                  style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                >
                  Sub-Second Next.js Performance Blueprint
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/offline-syncing-react-native-expo"
                  style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                >
                  Offline Sync Mechanics in React Native
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/automated-invoicing-stripe-billing-nextjs"
                  style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                >
                  Automated Invoicing &amp; Stripe Billing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/cheapest-freelance-web-app-developer-india-ayush-kumar-50-percent-off"
                  style={{ color: "var(--accent-cyan, #06b6d4)", textDecoration: "none", transition: "color 0.2s" }}
                >
                  How to Hire Cheapest Web Developer (50% Off)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Featured Case Studies & Contact */}
          <div>
            <h3
              style={{
                color: "#f8fafc",
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Case Studies
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <li>
                <Link href="/projects/ai-ecommerce-chatbot" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  AI E-Commerce Assistant
                </Link>
              </li>
              <li>
                <Link href="/projects/invoiceflow-saas" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  InvoiceFlow Billing SaaS
                </Link>
              </li>
              <li>
                <Link href="/projects/feedo" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  Feedo Customer Feedback System
                </Link>
              </li>
              <li>
                <Link href="/projects/clothing-ecommerce" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  High-Speed Modern E-Commerce
                </Link>
              </li>
              <li>
                <Link href="/projects/docusigner-contract-saas" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>
                  DocuSigner Contract Platform
                </Link>
              </li>
            </ul>

            <Link
              href="/#contact"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(6, 182, 212, 0.12)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                color: "var(--accent-cyan, #06b6d4)",
                fontWeight: 500,
                fontSize: "12px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Start a Project &rarr;
            </Link>
          </div>
        </div>

        {/* SEO Summary Statement */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "24px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#475569",
              fontSize: "11px",
              lineHeight: "1.8",
              maxWidth: "850px",
              margin: "0 auto",
            }}
          >
            Ayush Kumar &mdash; India&apos;s <strong>cheapest freelance web developer</strong>, <strong>cheapest iOS app developer</strong>, <strong>cheapest Android app developer</strong> &amp; <strong>cheapest web application developer</strong>. Providing worldwide clients with 50% discount on custom Next.js development, React Native mobile apps, NestJS backends, and AI integrations. Websites from $75 &middot; Mobile Apps from $300.
          </p>
        </div>

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <div>
            &copy; {currentYear} Ayush Kumar (freelanceayush.com). All Rights Reserved.
          </div>
          <div>
            Built with Next.js 16, TypeScript &amp; Precision Performance.
          </div>
        </div>
      </div>
    </footer>
  );
}
