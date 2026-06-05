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
    const handleMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest<HTMLElement>(selector);
      if (!card) return;

      const r = card.getBoundingClientRect();
      const x = ((e.clientY - r.top)  / r.height - 0.5) * 14;
      const y = ((e.clientX - r.left) / r.width  - 0.5) * -14;
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
                <img src="/profile.jpeg" alt="Ayush Kumar — Expert Freelance Full Stack, Mobile App & AI Developer from India" className="split-glow-img" width="400" height="480" />
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

/* ─── SEO TEXT BLOCK (visually hidden, crawler-visible) ─── */
function SeoBlock() {
  return (
    <section aria-label="About Ayush Kumar Services" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
      <h2>Ayush Kumar — Expert Freelance Developer</h2>
      <p>
        Ayush Kumar is a highly skilled freelance full stack developer, mobile app developer, and AI/ML engineer based in India.
        Specializing in React, Next.js, React Native, Expo, Node.js, TypeScript, and Express.js, Ayush delivers premium
        web applications, cross-platform iOS and Android mobile apps, AI-powered solutions, and custom software products.
      </p>
      <h3>Services Offered</h3>
      <ul>
        <li>Freelance Full Stack Web Development — React, Next.js, Node.js, TypeScript, REST APIs</li>
        <li>Freelance Mobile App Development — React Native, Expo, iOS, Android</li>
        <li>AI & Machine Learning Integration — LLM, ChatGPT, OpenAI API, intelligent automation</li>
        <li>UI/UX Design & Frontend Development — pixel-perfect, responsive, premium interfaces</li>
        <li>Performance Optimization — Core Web Vitals, SEO, Lighthouse auditing, page speed</li>
        <li>E-Commerce Development — custom online stores, payment integration, product management</li>
        <li>App Testing & Quality Assurance — unit testing, E2E testing, QA engineering</li>
        <li>API Design & Backend Engineering — REST, GraphQL, microservices, database design</li>
        <li>SaaS Application Development — scalable software-as-a-service products</li>
        <li>Startup & MVP Development — rapid prototyping and product launch</li>
      </ul>
      <h3>Technologies & Expertise</h3>
      <p>
        Expert coder proficient in JavaScript, TypeScript, React.js, Next.js, React Native, Expo, Node.js, Express.js,
        MongoDB, PostgreSQL, Firebase, Tailwind CSS, Framer Motion, Redux, Zustand, Git, Docker, AWS, Vercel, and more.
        Deep knowledge in AI/ML engineering, machine learning model integration, natural language processing (NLP),
        computer vision, and building AI-driven web and mobile applications.
      </p>
      <h3>Why Hire Ayush Kumar?</h3>
      <p>
        With 3+ years of professional freelance experience and 50+ deployed products, Ayush Kumar is trusted by clients
        worldwide for expert-level software development. Whether you need a web developer, app developer, AI engineer,
        performance optimizer, tester, designer, or full-product engineer — Ayush Kumar delivers with precision, speed,
        and exceptional quality. Available for freelance contracts, remote work, and full-time roles globally.
      </p>
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
            { label: "LinkedIn", href: "#", rel: "noopener noreferrer me" },
            { label: "Instagram", href: "#", rel: "noopener noreferrer" },
            { label: "Twitter / X", href: "#", rel: "noopener noreferrer me" },
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

  return (
    <>
      <Navbar />
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
        <Contact />
      </main>
      <SeoBlock />
      <Footer />
    </>
  );
}
