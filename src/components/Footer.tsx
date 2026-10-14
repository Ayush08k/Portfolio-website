import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ padding: "60px 0 40px", textAlign: "center", fontSize: "12px", fontFamily: "monospace" }}>
      {/* Internal links section - critical for SEO crawl budget */}
      <nav aria-label="Footer Navigation" style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
          <Link href="/services" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Services</Link>
          <Link href="/projects" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Projects</Link>
          <Link href="/estimator" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Cost Estimator</Link>
          <Link href="/blog" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Blog</Link>
          <Link href="/careers" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Careers</Link>
          <Link href="/about" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>About</Link>
          <Link href="/#contact" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}>Contact</Link>
        </div>
      </nav>

      <p style={{ color: "var(--text-secondary)", marginBottom: "10px" }}>
        Designed & Built by Freelancer Ayush
      </p>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "20px" }}>
        <a href="https://github.com/Ayush08k" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>GitHub</a>
        <a href="https://www.linkedin.com/in/ayush08k/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>LinkedIn</a>
        <a href="https://www.instagram.com/ayush08.k/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Instagram</a>
        <a href="https://x.com/aayush08k" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>X</a>
      </div>
      <p style={{ color: "var(--muted)", fontSize: "10px", lineHeight: "1.7", maxWidth: "640px", margin: "0 auto 16px", padding: "0 16px" }}>
        Ayush Kumar — India&apos;s <strong>cheapest freelance web developer</strong>, <strong>cheapest iOS app developer</strong>, <strong>cheapest Android app developer</strong> &amp; <strong>cheapest web application developer</strong>. Serving clients worldwide with <strong>50% OFF all services</strong>. Websites from <strong>$75</strong> &middot; Apps from <strong>$300</strong>. Affordable freelance full stack developer &amp; mobile app developer India.
      </p>
      <p style={{ color: "var(--muted)", fontSize: "11px" }}>
        &copy; {new Date().getFullYear()} Ayush Kumar — Cheapest Freelance Full Stack &amp; Mobile App Developer India. All Rights Reserved.
      </p>
    </footer>
  );
}
