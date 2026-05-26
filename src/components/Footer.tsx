export default function Footer() {
  return (
    <footer style={{ padding: "40px 0", textAlign: "center", fontSize: "12px", fontFamily: "monospace" }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: "10px" }}>
        Designed & Built by Freelancer Ayush
      </p>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "20px" }}>
        {/* Social Icons Placeholder */}
        <span>GitHub</span>
        <span>Instagram</span>
        <span>Twitter</span>
        <span>LinkedIn</span>
      </div>
      <p>© {new Date().getFullYear()} Ayush. All Rights Reserved.</p>
    </footer>
  );
}
