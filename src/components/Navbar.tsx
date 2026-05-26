"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(10, 25, 47, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 10px 30px -10px rgba(2, 12, 27, 0.7)" : "none",
        transition: "var(--transition)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <img src="/logofinal.png" alt="Ayush" style={{ height: "45px", width: "auto" }} />
      </Link>

      <ul style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {navLinks.map((link, i) => (
          <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <Link 
              href={link.href} 
              style={{ 
                color: "var(--text-primary)", 
                fontSize: "14px", 
                fontWeight: "500",
                display: "flex",
                gap: "5px"
              }}
            >
              {link.name}
            </Link>
          </li>
        ))}

      </ul>
    </nav>
  );
}
