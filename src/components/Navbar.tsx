"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Lock document body scrolling when mobile navigation drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav 
        className={scrolled ? "nav scrolled" : "nav"}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 100,
          transition: "var(--transition)",
        }}
      >
        {/* Dynamic Logo Block */}
        <Link 
          href="/" 
          onClick={closeMenu} 
          style={{ 
            display: "flex", 
            alignItems: "center",
            transition: "var(--transition)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
        >
          <img 
            src="/logofinal.png" 
            alt="Ayush Kumar Logo" 
            style={{ 
              height: "44px", 
              width: "auto",
              filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.35))"
            }} 
          />
        </Link>

        {/* Dynamic Menu items */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {navLinks.map((link, i) => (
            <li 
              key={link.name} 
              style={{ 
                animation: "fadeInUp 0.5s ease forwards",
                animationDelay: `${i * 80}ms` 
              }} 
              onClick={closeMenu}
            >
              <Link href={link.href} className="nav-link">
                {link.name}
              </Link>
            </li>
          ))}
          {/* CTA Link to Contact */}
          <li onClick={closeMenu}>
            <a 
              href="#contact" 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "rgba(6, 182, 212, 0.08)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                borderRadius: "8px",
                color: "var(--accent-cyan)",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Fira Code', monospace",
                transition: "var(--transition)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-cyan)";
                e.currentTarget.style.color = "var(--bg-primary)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(6, 182, 212, 0.08)";
                e.currentTarget.style.color = "var(--accent-cyan)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Consultation
              <ArrowUpRight size={14} />
            </a>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button 
          className="nav-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Drawer Menu"
          style={{
            display: "none",
            color: "var(--text-white)",
            cursor: "pointer",
            transition: "var(--transition)"
          }}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Screen Backdrop for Mobile drawer blur */}
      {isOpen && (
        <div 
          className="nav-overlay"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
