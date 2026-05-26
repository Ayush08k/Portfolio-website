"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Disable body scroll when mobile drawer is open
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
        <Link href="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center" }}>
          <img src="/logofinal.png" alt="Ayush" style={{ height: "45px", width: "auto" }} />
        </Link>

        {/* Dynamic Navigation Menu */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {navLinks.map((link, i) => (
            <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }} onClick={closeMenu}>
              <Link href={link.href} className="nav-link">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="nav-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Backdrop overlay for mobile drawer blur */}
      {isOpen && (
        <div 
          className="nav-overlay"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
