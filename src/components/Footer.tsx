export default function Footer() {
  return (
    <footer style={{ padding: "40px 0", textAlign: "center", fontSize: "12px", fontFamily: "monospace" }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: "10px" }}>
        Designed & Built by Freelancer Ayush
      </p>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "20px" }}>
        <a href="https://github.com/Ayush08k" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>GitHub</a>
        <a href="https://www.instagram.com/ayush08.k/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Instagram</a>
        <a href="https://x.com/aayush08k" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>X</a>
        <a href="https://www.linkedin.com/in/ayush08k/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>LinkedIn</a>
      </div>
      <p>© {new Date().getFullYear()} Ayush. All Rights Reserved.</p>
    </footer>
  );
}
