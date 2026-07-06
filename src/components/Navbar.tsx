"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Estimator", href: "/estimator" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Speed Showcase", href: "/speed" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // If mobile nav is open, do not hide navbar
      if (isOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

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
      <nav className={`${scrolled ? "nav scrolled" : "nav"} ${isVisible ? "" : "hidden"}`}>
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
            alt="Ayush Kumar — Freelance Full Stack & Mobile App Developer Logo" 
            style={{ 
              height: "44px", 
              width: "auto",
              filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.35))"
            }} 
          />
        </Link>

        {/* Dynamic Menu items */}
        <ul className={isOpen ? "nav-links active" : "nav-links"}>
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
            <Link href="/#contact" className="nav-cta-btn">
              Consultation
              <ArrowUpRight size={14} />
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button 
          className="nav-mobile-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Drawer Menu"
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
