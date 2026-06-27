"use client";
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowRight, Code2, ExternalLink, Send, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";
import PricingEstimator, { EstimatorData } from "@/components/PricingEstimator";
import Link from "next/link";

/* ─── Typewriter hook ───────────────────────────────────── */
function useTypewriter(words: string[], speed = 70, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx(i => i + 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words, speed, pause]);

  return text;
}

/* ─── Scroll reveal hook ────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Skill bar animation hook ─────────────────────────── */
function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll(".skill-bar-fill");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("animated"); }),
      { threshold: 0.3 }
    );
    bars.forEach(b => obs.observe(b));
    return () => obs.disconnect();
  }, []);
}

/* ─── 3D card tilt hook ─────────────────────────────────── */
function useTilt(selector: string) {
  useEffect(() => {
    // Disable 3D tilt effect on touch/mobile devices to prevent visual jitter/glitching
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;
    if (isTouchDevice || isMobile) return;

    const handleMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest<HTMLElement>(selector);
      if (!card) return;

      const r = card.getBoundingClientRect();
      const x = ((e.clientY - r.top) / r.height - 0.5) * 14;
      const y = ((e.clientX - r.left) / r.width - 0.5) * -14;
      card.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) translateZ(6px)`;
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest<HTMLElement>(selector);
      if (!card) return;

      const related = e.relatedTarget as HTMLElement;
      if (!related || !card.contains(related)) {
        card.style.transform = "";
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [selector]);
}

/* ─── HERO ──────────────────────────────────────────────── */
function Hero() {
  const typed = useTypewriter(["Full Stack Developer", "Mobile App Developer", "UI/UX Enthusiast", "Open to Full-Time Roles"]);

  return (
    <section className="hero" id="home">
      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="container">
        <div className="hero-grid">
          <div className="hero-visual reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="split-glow-container">
              {/* Pulsing Backglow */}
              <div className="split-glow-backlight" />

              {/* Image Frame with gradient blending masks */}
              <div className="split-glow-frame">
                <img src="/myprofile.png" alt="Ayush Kumar — Expert Freelance Full Stack, Mobile App & AI Developer from India" className="split-glow-img" width="400" height="480" />
                <div className="split-glow-overlay" />
              </div>
            </div>
          </div>

          <div className="hero-content reveal">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for new projects
            </div>

            <h1 className="hero-name">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Ayush Kumar</span>
            </h1>

            <div className="hero-role">
              <span>{typed}</span>
              <span className="typed-cursor">|</span>
            </div>

            <p className="hero-desc">
              I build high-performance, visually stunning digital products — from responsive web apps to cross-platform mobile experiences. {PORTFOLIO_DATA.personal.experienceYears}+ years freelancing, {PORTFOLIO_DATA.personal.deployedCount}+ products shipped.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary" data-hover>
                <span>View My Work</span>
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline" data-hover>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ─── ABOUT ─────────────────────────────────────────────── */
const skillBars = [
  { label: "React / Next.js", pct: 95 },
  { label: "React Native / Expo", pct: 88 },
  { label: "Node.js / APIs", pct: 85 },
  { label: "TypeScript", pct: 82 },
  { label: "UI / Motion Design", pct: 78 },
];

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left: stats + image */}
          <div className="reveal">
            <div className="about-stat-grid">
              {[
                { n: `${PORTFOLIO_DATA.personal.experienceYears}+`, l: "Years Experience" },
                { n: `${PORTFOLIO_DATA.personal.deployedCount}+`, l: "Products Shipped" },
                { n: "6", l: "Core Services" },
                { n: "100%", l: "Client Satisfaction" },
              ].map(s => (
                <div className="stat-card glass" key={s.l}>
                  <div className="stat-number gradient-text">{s.n}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="glass" style={{ padding: "24px", borderRadius: "20px" }}>
              <p style={{ fontSize: "13px", fontFamily: "'JetBrains Mono',monospace", color: "var(--violet)", marginBottom: "6px" }}>
                $ whoami
              </p>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.7" }}>
                {PORTFOLIO_DATA.personal.bioIntro}
              </p>
              <p style={{ fontSize: "13px", marginTop: "14px", color: "var(--emerald)", fontFamily: "'JetBrains Mono',monospace" }}>
                ● {PORTFOLIO_DATA.personal.jobSearchStatus}
              </p>
            </div>
          </div>

          {/* Right: bio + skill bars */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <p className="section-label">About Me</p>
            <h2 className="section-title" style={{ marginBottom: "20px" }}>
              Crafting Digital{" "}
              <span className="gradient-text">Experiences</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.75", marginBottom: "36px" }}>
              {PORTFOLIO_DATA.personal.bioDetail} I thrive at the intersection of clean architecture and beautiful design — writing code that&apos;s as elegant as the interfaces it powers.
            </p>

            <div>
              {skillBars.map(s => (
                <div className="skill-bar-item" key={s.label}>
                  <div className="skill-bar-header">
                    <span>{s.label}</span>
                    <span style={{ color: "var(--muted)" }}>{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ "--target": `${s.pct}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────── */
const iconColors = ["#7c3aed", "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#06b6d4"];
const serviceEmojis = ["🌐", "📱", "⚡", "🎨", "🤖", "🛒"];

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }} className="reveal">
          <p className="section-label">What I Do</p>
          <h2 className="section-title">Expertise & <span className="gradient-text">Services</span></h2>
          <p className="section-sub" style={{ margin: "16px auto 0" }}>
            End-to-end capabilities — from architecture to pixel-perfect interfaces.
          </p>
        </div>

        <div className="bento-grid">
          {PORTFOLIO_DATA.services.map((s, i) => (
            <div className="bento-card reveal" key={s.name} style={{ transitionDelay: `${i * 0.07}s` }} data-hover>
              <div className="bento-icon" style={{ background: `${iconColors[i % iconColors.length]}18` }}>
                <span style={{ fontSize: "26px" }}>{serviceEmojis[i]}</span>
              </div>
              <div className="bento-title">{s.name}</div>
              <div className="bento-desc">{s.description}</div>
            </div>
          ))}
        </div>

        {/* Tech marquee */}
        <div style={{ marginTop: "64px" }} className="reveal">
          <p style={{ textAlign: "center", fontSize: "12px", color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em", marginBottom: "24px" }}>
            // FULL TECH STACK
          </p>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...PORTFOLIO_DATA.skills.marquee, ...PORTFOLIO_DATA.skills.marquee].map((t, i) => (
                <div className="marquee-tag" key={i}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────── */
function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }} className="reveal">
          <p className="section-label">My Work</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-sub" style={{ margin: "16px auto 0" }}>
            Real-world products built with precision, performance, and craft.
          </p>
        </div>

        <div className="projects-grid">
          {PORTFOLIO_DATA.projects.slice(0, 6).map((p, i) => (
            <div
              className={`project-card reveal${i % 2 !== 0 ? " reversed" : ""}`}
              key={p.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-hover
            >
              {/* Image */}
              <div className="project-img-wrap">
                <img src={p.image} alt={`${p.title} — Ayush Kumar Full Stack Developer Project Case Study`} />
                <div className="project-overlay" />
              </div>

              {/* Content */}
              <div>
                <p className="project-overline">Case Study {String(i + 1).padStart(2, "0")}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span className="project-tech-tag" key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  <Link href={`/projects/${p.slug}`} className="project-link-btn" style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }} data-hover>
                    Case Study
                  </Link>
                  {p.github && p.github !== "#" && p.slug !== "jlm-tournaments" && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" data-hover>
                      <Code2 size={14} /> Source
                    </a>
                  )}
                  {p.link && p.link !== "#" && p.slug !== "jlm-tournaments" && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link-btn" data-hover>
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "56px" }} className="reveal">
          <Link href="/projects" className="btn-primary" data-hover>
            <span>More Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
const PROJECT_TYPES_MAP = {
  "Landing Page": { basePrice: 150, baseScreens: 1, baseWeeks: 1, id: "landing" },
  "SaaS / Full Stack App": { basePrice: 600, baseScreens: 6, baseWeeks: 4, id: "webapp" },
  "Mobile App (iOS/Android)": { basePrice: 750, baseScreens: 8, baseWeeks: 7, id: "mobile" },
  "E-Commerce Store": { basePrice: 400, baseScreens: 5, baseWeeks: 5, id: "ecommerce" },
  "AI Integration & Agents": { basePrice: 400, baseScreens: 4, baseWeeks: 5, id: "ai" },
  "3D Site": { basePrice: 250, baseScreens: 3, baseWeeks: 3, id: "threed" },
};

const ADD_ONS_LIST = [
  { name: "AI Personalization Engine", price: 150, id: "ai" },
  { name: "Payment Integration", price: 100, id: "payments" },
  { name: "CMS Content Manager", price: 150, id: "cms" },
  { name: "Priority Rush Delivery", price: 100, id: "rush" },
];

const recalculateEstimate = (projectTypeName: string, newScreens: number, addOnsString: string) => {
  const project = PROJECT_TYPES_MAP[projectTypeName as keyof typeof PROJECT_TYPES_MAP] || PROJECT_TYPES_MAP["SaaS / Full Stack App"];
  
  const basePrice = project.basePrice;
  const discount = basePrice * 0.5;
  const discountedBasePrice = basePrice - discount;
  
  const extraScreens = Math.max(0, newScreens - project.baseScreens);
  const screensCost = extraScreens * 50;

  const activeAddOns = ADD_ONS_LIST.filter(addon => addOnsString.includes(addon.name));
  const addOnsCost = activeAddOns.reduce((sum, addon) => sum + addon.price, 0);

  const minPrice = discountedBasePrice + screensCost + addOnsCost;
  const maxPrice = Math.round(minPrice * 1.2);

  const isRush = addOnsString.includes("Priority Rush Delivery");
  let timelineString = "";
  if (project.id === "landing") {
    let minDays = 7;
    let maxDays = 10;
    minDays += extraScreens * 2;
    maxDays += extraScreens * 3;
    const activeAddonsCount = activeAddOns.filter(addon => addon.id !== "rush").length;
    minDays += activeAddonsCount * 1;
    maxDays += activeAddonsCount * 2;
    if (isRush) {
      minDays = Math.max(4, Math.round(minDays * 0.6));
      maxDays = Math.max(6, Math.round(maxDays * 0.6));
    }
    timelineString = `${minDays}-${maxDays} Days`;
  } else {
    let minWeeks = project.id === "webapp" ? 3 : project.id === "mobile" ? 6 : project.id === "threed" ? 2 : 4;
    let maxWeeks = project.id === "webapp" ? 5 : project.id === "mobile" ? 9 : project.id === "threed" ? 4 : 6;
    const screensAddition = Math.ceil(extraScreens / 3);
    minWeeks += screensAddition;
    maxWeeks += screensAddition;
    const activeAddonsCount = activeAddOns.filter(addon => addon.id !== "rush").length;
    minWeeks += Math.ceil(activeAddonsCount * 0.5);
    maxWeeks += Math.ceil(activeAddonsCount * 0.5);
    if (isRush) {
      minWeeks = Math.max(2, Math.round(minWeeks * 0.65));
      maxWeeks = Math.max(3, Math.round(maxWeeks * 0.65));
    }
    timelineString = `${minWeeks}-${maxWeeks} Weeks`;
  }

  return {
    hasEstimate: true,
    projectType: projectTypeName,
    screens: newScreens,
    addOns: addOnsString,
    budget: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()} USD`,
    timeline: timelineString,
    projectActualPrice: `$${basePrice.toLocaleString()} USD`,
    discount: `-$${discount.toLocaleString()} USD (50% Off)`,
    screensPrice: extraScreens > 0 ? `+$${screensCost.toLocaleString()} USD` : "$0 USD (Base included)",
    addOnsPrice: `+$${addOnsCost.toLocaleString()} USD`,
  };
};

function Contact({ 
  estimatorData, 
  setEstimatorData 
}: { 
  estimatorData: EstimatorData;
  setEstimatorData: React.Dispatch<React.SetStateAction<EstimatorData>>;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClearEstimate = () => {
    setIsEditing(false);
    setEstimatorData({
      hasEstimate: false,
      projectType: "",
      screens: 0,
      addOns: "",
      budget: "",
      timeline: "",
    });
  };

  const handleUpdateScreens = (newScreens: number) => {
    const clamped = Math.max(1, Math.min(25, newScreens));
    const updated = recalculateEstimate(estimatorData.projectType, clamped, estimatorData.addOns);
    setEstimatorData(updated);
  };

  const handleUpdateProjectType = (newType: string) => {
    const project = PROJECT_TYPES_MAP[newType as keyof typeof PROJECT_TYPES_MAP];
    const updated = recalculateEstimate(newType, project.baseScreens, estimatorData.addOns);
    setEstimatorData(updated);
  };

  const handleToggleAddOn = (addonName: string) => {
    let currentAddOns = estimatorData.addOns === "None" ? [] : estimatorData.addOns.split(", ").map(x => x.trim()).filter(Boolean);
    if (currentAddOns.includes(addonName)) {
      currentAddOns = currentAddOns.filter(x => x !== addonName);
    } else {
      currentAddOns.push(addonName);
    }
    const addOnsString = currentAddOns.join(", ") || "None";
    const updated = recalculateEstimate(estimatorData.projectType, estimatorData.screens, addOnsString);
    setEstimatorData(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setMessage("");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-wrap">
          <div className="reveal">
            <p className="section-label" style={{ textAlign: "center" }}>Let&apos;s Talk</p>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.7", textAlign: "center", marginTop: "16px" }}>
              Ready to build something extraordinary? I&apos;m open to freelance contracts and full-time opportunities. Drop a message — I reply within a few hours.
            </p>
          </div>

          {status === "success" ? (
            <div className="contact-success-card glass success-pop-in">
              <div className="success-icon-wrap">
                <svg className="checkmark-svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <div className="success-sparks">
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * 360) / 24;
                    const rad = (angle * Math.PI) / 180;
                    const distance = 140 + Math.random() * 160;
                    const tx = `${(Math.cos(rad) * distance).toFixed(1)}px`;
                    const ty = `${(Math.sin(rad) * distance).toFixed(1)}px`;
                    const colors = ["var(--violet)", "var(--blue)", "var(--emerald)", "var(--gold)"];
                    const color = colors[i % colors.length];
                    const delay = `${(0.4 + Math.random() * 0.15).toFixed(2)}s`;
                    const size = `${(6 + Math.random() * 5).toFixed(1)}px`;
                    return (
                      <div
                        key={i}
                        className="spark"
                        style={{
                          "--tx": tx,
                          "--ty": ty,
                          "background": color,
                          "boxShadow": `0 0 12px ${color}, 0 0 24px ${color}`,
                          "animationDelay": delay,
                          "width": size,
                          "height": size,
                        } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
              </div>
              <h3 className="success-title">Message Sent Successfully!</h3>
              <p className="success-text">
                Ayush will contact you soon. Stay tuned! 🚀
              </p>
              <button onClick={() => setStatus("idle")} className="btn-outline success-reset-btn" data-hover>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form reveal" style={{ transitionDelay: "0.1s" }} onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label>YOUR NAME</label>
                  <input name="name" type="text" required placeholder="Elon Musk" className="input" />
                </div>
                <div>
                  <label>YOUR EMAIL</label>
                  <input name="email" type="email" required placeholder="elon@x.com" className="input" />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label>YOUR COUNTRY</label>
                  <input name="country" type="text" required placeholder="United States" className="input" />
                </div>
                <div>
                  <label>BEST TIME TO CONTACT</label>
                  <input name="bestTime" type="text" required placeholder="Evening (5 PM - 8 PM EST)" className="input" />
                </div>
              </div>
              <div>
                <label>WHATSAPP NUMBER</label>
                <input name="whatsapp" type="tel" required placeholder="Enter WhatsApp Number" className="input" />
              </div>
              
              {estimatorData && estimatorData.hasEstimate && (
                <div className="estimator-locked-summary glass">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ 
                        width: "8px", 
                        height: "8px", 
                        borderRadius: "50%", 
                        background: isEditing ? "var(--accent-cyan)" : "var(--violet)", 
                        boxShadow: isEditing ? "0 0 8px var(--accent-cyan)" : "0 0 8px var(--violet)" 
                      }} />
                      <span style={{ fontSize: "11px", fontFamily: "JetBrains Mono", fontWeight: "700", color: isEditing ? "var(--accent-cyan)" : "var(--violet)", letterSpacing: "0.05em" }}>
                        ESTIMATOR DETAILS {isEditing ? "(EDITING)" : "(ACTIVE)"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(!isEditing)} 
                        style={{
                          background: isEditing ? "var(--accent-cyan)" : "rgba(255, 255, 255, 0.05)",
                          border: "1px solid var(--glass-border)",
                          color: isEditing ? "var(--black)" : "var(--white)",
                          fontSize: "11px",
                          fontWeight: "bold",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        {isEditing ? "Done" : "Modify"}
                      </button>
                      <button 
                        type="button" 
                        onClick={handleClearEstimate} 
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.25)",
                          color: "#ef4444",
                          fontSize: "11px",
                          fontWeight: "bold",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="locked-fields-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <span className="locked-field-label">PROJECT TYPE</span>
                      {isEditing ? (
                        <select 
                          value={estimatorData.projectType}
                          onChange={(e) => handleUpdateProjectType(e.target.value)}
                          style={{
                            background: "rgba(10, 10, 12, 0.9)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--white)",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            fontSize: "13px",
                            width: "100%",
                            marginTop: "6px",
                            cursor: "pointer",
                            outline: "none"
                          }}
                        >
                          {Object.keys(PROJECT_TYPES_MAP).map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="locked-field-value">{estimatorData.projectType}</span>
                      )}
                    </div>
                    <div>
                      <span className="locked-field-label">ESTIMATED TIMELINE</span>
                      <span className="locked-field-value" style={{ marginTop: isEditing ? "10px" : "0" }}>{estimatorData.timeline}</span>
                    </div>
                  </div>

                  {isEditing ? (
                    <div style={{ marginTop: "16px", borderTop: "1px solid var(--glass-border)", paddingTop: "16px" }}>
                      <span className="locked-field-label">EDIT ESTIMATED SCREENS / SUBPAGES</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                        <button
                          type="button"
                          onClick={() => handleUpdateScreens(estimatorData.screens - 1)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--white)",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s"
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "var(--white)", minWidth: "24px", textAlign: "center", fontFamily: "JetBrains Mono" }}>
                          {estimatorData.screens}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateScreens(estimatorData.screens + 1)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--white)",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s"
                          }}
                        >
                          +
                        </button>
                        <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                          (Base project includes {PROJECT_TYPES_MAP[estimatorData.projectType as keyof typeof PROJECT_TYPES_MAP]?.baseScreens || 1} screens)
                        </span>
                      </div>

                      <div style={{ marginTop: "16px", borderTop: "1px dashed var(--glass-border)", paddingTop: "12px" }}>
                        <span className="locked-field-label">TOGGLE ADD-ONS</span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                          {ADD_ONS_LIST.map(addon => {
                            const isActive = estimatorData.addOns.includes(addon.name);
                            return (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() => handleToggleAddOn(addon.name)}
                                style={{
                                  fontSize: "11px",
                                  padding: "6px 12px",
                                  borderRadius: "20px",
                                  border: "1px solid",
                                  borderColor: isActive ? "var(--violet)" : "var(--glass-border)",
                                  background: isActive ? "rgba(124, 58, 237, 0.15)" : "rgba(0, 0, 0, 0.3)",
                                  color: isActive ? "var(--white)" : "var(--muted)",
                                  cursor: "pointer",
                                  transition: "all 0.2s"
                                }}
                              >
                                {addon.name} (+${addon.price})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div style={{ marginTop: "16px", borderTop: "1px solid var(--glass-border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "var(--muted)" }}>Project Base Price:</span>
                      <span style={{ fontWeight: 600, color: "var(--white)", fontFamily: "JetBrains Mono" }}>{estimatorData.projectActualPrice}</span>
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "var(--emerald)" }}>50% Special Discount:</span>
                      <span style={{ fontWeight: 600, color: "var(--emerald)", fontFamily: "JetBrains Mono" }}>{estimatorData.discount}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "var(--muted)" }}>Screens ({estimatorData.screens} total):</span>
                      <span style={{ fontWeight: 600, color: "var(--white)", fontFamily: "JetBrains Mono" }}>{estimatorData.screensPrice}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "var(--muted)" }}>Custom Add-ons:</span>
                      <span style={{ fontWeight: 600, color: "var(--white)", fontFamily: "JetBrains Mono" }}>{estimatorData.addOnsPrice}</span>
                    </div>

                    {!isEditing && estimatorData.addOns !== "None" && (
                      <div style={{ fontSize: "11px", color: "var(--muted)", paddingLeft: "10px", borderLeft: "2px solid var(--violet)", marginTop: "-4px" }}>
                        Selected: {estimatorData.addOns}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", borderTop: "1px dashed var(--glass-border)", paddingTop: "12px", marginTop: "4px" }}>
                      <span style={{ fontWeight: "bold", color: "var(--white)" }}>Total Estimated Budget:</span>
                      <span className="gradient-text" style={{ fontWeight: "800", fontFamily: "JetBrains Mono" }}>{estimatorData.budget}</span>
                    </div>
                  </div>

                  {/* Hidden inputs to pass data via formData on submit */}
                  <input type="hidden" name="estimatorProjectType" value={estimatorData.projectType} />
                  <input type="hidden" name="estimatorScreens" value={estimatorData.screens} />
                  <input type="hidden" name="estimatorAddOns" value={estimatorData.addOns} />
                  <input type="hidden" name="estimatorBudget" value={estimatorData.budget} />
                  <input type="hidden" name="estimatorTimeline" value={estimatorData.timeline} />
                  <input type="hidden" name="estimatorProjectActualPrice" value={estimatorData.projectActualPrice} />
                  <input type="hidden" name="estimatorDiscount" value={estimatorData.discount} />
                  <input type="hidden" name="estimatorScreensPrice" value={estimatorData.screensPrice} />
                  <input type="hidden" name="estimatorAddOnsPrice" value={estimatorData.addOnsPrice} />
                </div>
              )}

              <div>
                <label>YOUR MESSAGE</label>
                <textarea 
                  name="message" 
                  required 
                  rows={5} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, budget, and timeline..." 
                  className="textarea" 
                />
              </div>
              <button type="submit" className="btn-primary" data-hover disabled={status === "loading"}
                style={{ alignSelf: "flex-start" }}>
                <span>{status === "loading" ? "Sending..." : "Launch Message"}</span>
                <Send size={15} />
              </button>
              {status === "error" && (
                <p style={{ color: "#ef4444", fontSize: "13px" }}>Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── CLIENT REVIEWS ─────────────────────────────────────── */
const reviews = [
  {
    text: "Honestly, Ayush was a lifesaver for our Next.js project. We had a super tight deadline and a limited budget, but he got the entire web app up and running ahead of schedule. The code is super clean, and he even helped us set up some basic SEO things that really boosted our search traffic. Definitely hiring him again!",
    author: "Sarah Jenkins",
    rating: 5
  },
  {
    text: "I've worked with a lot of developers, but Ayush stands out. He built our React Native app using Expo and NativeWind, and the UI is incredibly smooth. What I appreciated most was how he kept us in the loop the entire time and didn't charge us agency-level fees. Really solid work.",
    author: "David Chen",
    rating: 5
  },
  {
    text: "We needed to optimize our MongoDB database and NestJS backend because things were lagging. Ayush jumped in, sorted out the query issues, and now everything runs incredibly fast. He's fast, knows his stuff, and didn't cost a fortune. Strongly recommend!",
    author: "Elena Rostova",
    rating: 5
  },
  {
    text: "Ayush built a really clean e-commerce site for us. I was worried about the payment integration and Stripe checkout, but he handled everything perfectly. He delivered exactly what we wanted on time, and his pricing was very fair. Super happy with the final product.",
    author: "Amit Sharma",
    rating: 5
  },
  {
    text: "Really happy with the mobile app Ayush built for us! It's super fast, and the animations are exactly what we had in mind. He suggested some great UX tweaks that made the app way better to use. He's very professional and finished everything right on budget.",
    author: "Sneha Reddy",
    rating: 5
  },
  {
    text: "Our store's loading speed was terrible and we were losing customers. Ayush did a complete audit, optimized the custom theme, and fixed our SEO. The site loads instantly now and our conversion rate went up. Saved us a ton of cash!",
    author: "Rohan Malhotra",
    rating: 5
  },
  {
    text: "Absolutely amazing frontend work. He turned our Figma designs into a working Next.js site, and it looks identical. The hover effects and transitions are very clean. Great communication, fast turnaround, and very reasonable pricing.",
    author: "Carlos Mendez",
    rating: 5
  },
  {
    text: "He upgraded our Expo app to the latest version and resolved some really tricky navigation bugs. The app is much more stable now. Ayush is incredibly skilled and got it done very quickly. Great experience working with him!",
    author: "Deepika Verma",
    rating: 5
  },
  {
    text: "We wanted a custom dashboard with real-time updates for our feedback tool, and Ayush built it using Socket.IO. The sync works perfectly. He's super smart, easy to talk to, and delivered exactly what we needed without any hassle.",
    author: "Rajesh Patel",
    rating: 5
  },
  {
    text: "Highly recommend Ayush for full stack work. He optimized our site's SEO, fixed our page speed issues, and cleaned up our backend. The project was completed on time, and he went above and beyond to make sure everything was perfect.",
    author: "Liam O'Connor",
    rating: 5
  }
];

function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIdx = reviews.length - visibleCards;
      return prev === 0 ? maxIdx : prev - 1;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIdx = reviews.length - visibleCards;
      return prev >= maxIdx ? 0 : prev + 1;
    });
  };

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Client Reviews</h2>
          <div className="section-desc">
            Here is what clients and team leads have to say about collaborating with me on production applications.
          </div>
        </div>

        <div className="slider-wrapper reveal">
          {/* Slider Controls */}
          <button onClick={prevSlide} className="slider-btn prev" aria-label="Previous review" data-hover>
            <ChevronLeft size={24} />
          </button>

          <div className="slider-container">
            <div
              className="slider-track"
              style={{ transform: `translate3d(-${currentIndex * (100 / visibleCards)}%, 0, 0)` }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="slider-slide"
                  style={{ flex: `0 0 ${100 / visibleCards}%` }}
                >
                  <div className="glass reviews-card">
                    <div className="reviews-rating">
                      {[...Array(r.rating)].map((_, idx) => (
                        <Star key={idx} size={16} fill="var(--emerald)" stroke="var(--emerald)" />
                      ))}
                    </div>
                    <p className="reviews-text">&ldquo;{r.text}&rdquo;</p>
                    <div className="reviews-footer">
                      <div className="reviews-author">{r.author}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextSlide} className="slider-btn next" aria-label="Next review" data-hover>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="slider-dots reveal">
          {reviews.slice(0, reviews.length - visibleCards + 1).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`slider-dot ${currentIndex === i ? "active" : ""}`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer aria-label="Site footer">
      <div className="container">
        <div className="footer-links">
          {[
            { label: "GitHub", href: "https://github.com/Ayush08k", rel: "noopener noreferrer me" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush08k/", rel: "noopener noreferrer me" },
            { label: "Instagram", href: "https://www.instagram.com/ayush08.k/", rel: "noopener noreferrer" },
            { label: "X", href: "https://x.com/aayush08k", rel: "noopener noreferrer" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel={l.rel} className="footer-link" data-hover aria-label={`Ayush Kumar on ${l.label}`}>
              {l.label}
            </a>
          ))}
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Ayush Kumar — Freelance Full Stack & Mobile App Developer. Designed & Built with ♥ and TypeScript.
        </p>
      </div>
    </footer>
  );
}

function SectionDivider() {
  return (
    <div className="section-divider reveal">
      <div className="divider-line" />
      <div className="divider-glow" />
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal();
  useSkillBars();
  useTilt(".bento-card, .project-card, .reviews-card");

  const [estimatorData, setEstimatorData] = useState<EstimatorData>({
    hasEstimate: false,
    projectType: "",
    screens: 0,
    addOns: "",
    budget: "",
    timeline: "",
  });

  const handleProceedEstimate = (data: EstimatorData) => {
    setEstimatorData(data);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main id="main-content" role="main">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <ClientReviews />
        <SectionDivider />
        <PricingEstimator onProceed={handleProceedEstimate} />
        <SectionDivider />
        <Contact estimatorData={estimatorData} setEstimatorData={setEstimatorData} />
      </main>
      <Footer />
    </>
  );
}
