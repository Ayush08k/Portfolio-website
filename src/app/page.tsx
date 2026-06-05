"use client";
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowRight, Code2, ExternalLink, Send, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    const cards = document.querySelectorAll<HTMLElement>(selector);
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];

    cards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientY - r.top)  / r.height - 0.5) * 14;
        const y = ((e.clientX - r.left) / r.width  - 0.5) * -14;
        card.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) translateZ(6px)`;
      };
      const onLeave = () => { card.style.transform = ""; };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push([card, onMove, onLeave]);
    });

    return () => {
      handlers.forEach(([card, onMove, onLeave]) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);
}

/* ─── Navbar ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="/" data-hover><img src="/logofinal.png" alt="Ayush Logo" className="nav-logo" /></a>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} className="nav-link" data-hover>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
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
                <img src="/profile.jpeg" alt="Ayush Kumar" className="split-glow-img" />
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
          {PORTFOLIO_DATA.projects.map((p, i) => (
            <div
              className={`project-card reveal${i % 2 !== 0 ? " reversed" : ""}`}
              key={p.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-hover
            >
              {/* Image */}
              <div className="project-img-wrap">
                <img src={p.image} alt={p.title} />
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
                  {p.github && p.github !== "#" && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" data-hover>
                      <Code2 size={14} /> Source
                    </a>
                  )}
                  {p.link && p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link-btn" data-hover>
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function Contact() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
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
            <div className="glass reveal" style={{ padding: "48px", marginTop: "48px", textAlign: "center" }}>
              <CheckCircle size={48} color="var(--emerald)" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ color: "var(--emerald)", marginBottom: "10px" }}>Message Sent!</h3>
              <p style={{ color: "var(--muted)" }}>Ayush will get back to you shortly. Stay awesome! 🚀</p>
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
              <div>
                <label>YOUR MESSAGE</label>
                <textarea name="message" required rows={5} placeholder="Describe your project, budget, and timeline..." className="textarea" />
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
    text: "Ayush delivered our React Native app ahead of schedule. The code quality was outstanding, and the micro-interactions were flawless.",
    author: "Sarah Jenkins",
    role: "Founder at Bloom",
    rating: 5
  },
  {
    text: "Incredible attention to detail. Ayush redesigned our Next.js dashboard, improving our core web vitals by 40%.",
    author: "David Chen",
    role: "CTO at CloudSync",
    rating: 5
  },
  {
    text: "Working with Ayush was a breeze. He took our complex product requirements and shipped a beautiful mobile experience.",
    author: "Elena Rostova",
    role: "Product Manager at Velo",
    rating: 5
  },
  {
    text: "The best developer we've hired on contract. Exceptional communication and absolute technical excellence.",
    author: "Marcus Vance",
    role: "Director at Sterling Media",
    rating: 5
  },
  {
    text: "Ayush's skills with Expo and React Native are top-notch. He solved navigation state issues that had our team stumped for weeks.",
    author: "Kenji Sato",
    role: "Engineering Lead at J-Force",
    rating: 5
  },
  {
    text: "Superb aesthetics and solid backend integration. Our web application runs smoother than ever.",
    author: "Emily Watson",
    role: "Operations Director at CoreLife",
    rating: 5
  },
  {
    text: "Ayush is a true professional. He didn't just build the screens; he actively suggested UX improvements that our users love.",
    author: "Carlos Mendez",
    role: "Founder at Sendero",
    rating: 5
  },
  {
    text: "Clean code, well-structured API integration, and fantastic responsiveness. Highly recommended!",
    author: "Jessica Taylor",
    role: "VP of Engineering at BrightLoop",
    rating: 5
  },
  {
    text: "He built a scalable Node.js microservice architecture for us that handled our traffic spikes perfectly. A brilliant engineer.",
    author: "Amara Okafor",
    role: "Technical Director at Zenith",
    rating: 5
  },
  {
    text: "Ayush brought our design prototypes to life with spectacular accuracy. A pleasure to collaborate with.",
    author: "Liam O'Connor",
    role: "Design Lead at PixelCraft",
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
                      <div className="reviews-role">{r.role}</div>
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
    <footer>
      <div className="container">
        <div className="footer-links">
          {[
            { label: "GitHub", href: "https://github.com/Ayush08k" },
            { label: "LinkedIn", href: "#" },
            { label: "Instagram", href: "#" },
            { label: "Twitter / X", href: "#" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link" data-hover>
              {l.label}
            </a>
          ))}
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Ayush Kumar — Designed & Built with ♥ and TypeScript
        </p>
      </div>
    </footer>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal();
  useSkillBars();
  useTilt(".bento-card");
  useTilt(".project-card");
  useTilt(".reviews-card");

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ClientReviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
