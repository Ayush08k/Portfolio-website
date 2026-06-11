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
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function Contact({ estimatorData }: { estimatorData: EstimatorData }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--violet)", boxShadow: "0 0 8px var(--violet)" }} />
                    <span style={{ fontSize: "11px", fontFamily: "JetBrains Mono", fontWeight: "700", color: "var(--violet)", letterSpacing: "0.05em" }}>ESTIMATOR DETAILS (LOCKED)</span>
                  </div>
                  
                  <div className="locked-fields-grid">
                    <div>
                      <span className="locked-field-label">PROJECT TYPE</span>
                      <span className="locked-field-value">{estimatorData.projectType}</span>
                    </div>
                    <div>
                      <span className="locked-field-label">TOTAL PAGES / SCREENS</span>
                      <span className="locked-field-value">{estimatorData.screens} screens</span>
                    </div>
                    <div>
                      <span className="locked-field-label">ESTIMATED TIMELINE</span>
                      <span className="locked-field-value">{estimatorData.timeline}</span>
                    </div>
                    <div>
                      <span className="locked-field-label">ESTIMATED BUDGET</span>
                      <span className="locked-field-value gradient-text" style={{ fontWeight: "800" }}>{estimatorData.budget}</span>
                    </div>
                  </div>

                  {estimatorData.addOns !== "None" && (
                    <div style={{ marginTop: "16px", borderTop: "1px solid var(--glass-border)", paddingTop: "12px" }}>
                      <span className="locked-field-label">SELECTED ADD-ONS</span>
                      <span className="locked-field-value" style={{ fontSize: "13px" }}>{estimatorData.addOns}</span>
                    </div>
                  )}

                  {/* Hidden inputs to pass data via formData on submit */}
                  <input type="hidden" name="estimatorProjectType" value={estimatorData.projectType} />
                  <input type="hidden" name="estimatorScreens" value={estimatorData.screens} />
                  <input type="hidden" name="estimatorAddOns" value={estimatorData.addOns} />
                  <input type="hidden" name="estimatorBudget" value={estimatorData.budget} />
                  <input type="hidden" name="estimatorTimeline" value={estimatorData.timeline} />
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

/* ─── SEO TEXT BLOCK (visually hidden, crawler-visible) ─── */
function SeoBlock() {
  return (
    <section
      aria-label="About Ayush Kumar — Freelance Full Stack Developer"
      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
    >
      <h2>Ayush Kumar — Best Freelancer, Freelance Full Stack Dev & Mobile App Developer Near Me</h2>
      <p>
        Welcome to the ultimate freelancer site of Ayush Kumar. If you are searching online to hire a freelance developer near me, or looking to hire the best full stack dev for your business, Ayush is your go-to expert. As one of the best freelancer resources online, Ayush has 3+ years of experience delivering high-end custom web and mobile solutions worldwide. Hire freelance developer services today for fast delivery, top-tier quality, and affordable rates.
      </p>
      <p>
        Ayush Kumar is a highly skilled freelance full stack developer and mobile app developer based in India, available
        for remote work with clients across the USA, UK, Canada, Australia, Europe, and worldwide. With 3+ years of
        professional freelance experience and 50+ successfully shipped web and mobile applications, Ayush Kumar is one of
        the top freelance developers available for hire online today. He specializes in building high-performance, scalable,
        and visually stunning digital products — from responsive React and Next.js web applications to cross-platform iOS
        and Android mobile apps using React Native and Expo.
      </p>

      <h3>Why Hire Ayush Kumar as Your Freelance Developer?</h3>
      <p>
        Hiring a freelance developer from India has never been more risk-free. Ayush Kumar combines world-class technical
        skills with a proven track record, professional communication, and competitive freelance rates. He delivers
        clean code, premium UI/UX design, and production-ready applications on time and within budget — making him the
        ideal choice for startups, businesses, and entrepreneurs looking to hire a reliable, affordable, and highly skilled
        full stack or mobile app developer.
      </p>
      <ul>
        <li>3+ years professional freelance experience</li>
        <li>50+ web and mobile products shipped successfully</li>
        <li>100% client satisfaction rating</li>
        <li>Available for freelance contracts and full-time opportunities</li>
        <li>Fast delivery without compromising quality</li>
        <li>Competitive and transparent pricing</li>
        <li>Responsive communication and professional workflow</li>
      </ul>

      <h3>Freelance Services Offered by Ayush Kumar</h3>
      <ul>
        <li>Freelance Full Stack Web Development — React.js, Next.js, Node.js, Express.js, TypeScript, REST APIs, GraphQL</li>
        <li>Freelance Mobile App Development — React Native, Expo SDK, iOS app development, Android app development</li>
        <li>Freelance AI & Machine Learning Integration — OpenAI API, LLM integration, ChatGPT, intelligent automation</li>
        <li>Freelance UI/UX Design & Frontend Development — Tailwind CSS, Framer Motion, responsive design, animations</li>
        <li>Freelance Performance & SEO Optimization — Core Web Vitals, Lighthouse auditing, page speed, structured data</li>
        <li>Freelance E-Commerce Development — Shopify, Next.js stores, Stripe integration, product management</li>
        <li>Freelance WordPress Development — custom themes, plugins, WooCommerce, performance tuning</li>
        <li>Freelance Backend Development — NestJS, Node.js, MongoDB, PostgreSQL, Firebase, Supabase, REST APIs</li>
        <li>Freelance SaaS Development — scalable software-as-a-service architecture, subscription billing, dashboards</li>
        <li>Freelance MVP Development — rapid prototyping and fast time-to-market for startups</li>
        <li>Freelance App Testing & QA — Jest, Supertest, end-to-end testing, quality assurance</li>
        <li>Freelance API Design & Integration — REST APIs, third-party API integration, microservices</li>
      </ul>

      <h3>Technologies & Skills — Ayush Kumar Full Stack Developer</h3>
      <p>
        Ayush Kumar is proficient in a wide range of modern web and mobile technologies. As a React developer, Next.js
        developer, and React Native developer, he brings both frontend and backend expertise to every project. His
        full stack capabilities span the entire software development lifecycle — from database design and API development
        to pixel-perfect UI implementation and cloud deployment.
      </p>
      <ul>
        <li>Frontend: React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, HTML5, CSS3, Vanilla CSS</li>
        <li>Mobile: React Native, Expo SDK 54, NativeWind, React Navigation, Redux Toolkit, AsyncStorage</li>
        <li>Backend: Node.js, NestJS, Express.js, REST APIs, GraphQL, Socket.IO, WebSockets, JWT, Passport.js</li>
        <li>Databases: MongoDB, Mongoose, PostgreSQL, Firebase, Supabase, MySQL, Prisma ORM</li>
        <li>AI/ML: OpenAI API, Meta AI, LLM integration, intelligent chatbots, automation workflows</li>
        <li>DevOps & Tools: Git, GitHub, Vercel, Docker, AWS, Postman, Swagger, VS Code</li>
        <li>E-Commerce: Shopify Liquid, Stripe, WooCommerce, payment gateway integration</li>
        <li>Testing: Jest, Supertest, unit testing, integration testing, E2E testing</li>
      </ul>

      <h3>Ayush Kumar — Freelance Developer India</h3>
      <p>
        Based in India and serving clients globally, Ayush Kumar is one of the best freelance developers available for
        hire from India. He offers premium software development services at competitive Indian freelance rates, making
        it affordable for businesses of all sizes to access world-class technical talent. Whether you are a startup
        looking for an MVP developer, a business needing a Shopify or WordPress site, or an enterprise requiring a
        custom SaaS application, Ayush Kumar has the skills and experience to deliver outstanding results.
      </p>

      <h3>Hire Ayush Kumar — Contact Information</h3>
      <p>
        Ready to hire Ayush Kumar as your freelance developer? Contact him through the contact form on this portfolio
        website. He is available for freelance projects starting immediately and typically responds to all inquiries
        within a few hours. You can also connect with him on GitHub at github.com/Ayush08k or on LinkedIn at
        linkedin.com/in/ayush08k to review his work, open source contributions, and professional background.
      </p>

      <h3>Featured Projects by Ayush Kumar</h3>
      <ul>
        <li>Feedo — Customer feedback and satisfaction platform built with React Native, Expo SDK 54, NestJS, and MongoDB</li>
        <li>Music Player App — Cross-platform music streaming app with React Native, Expo, and real-time audio visualization</li>
        <li>E-Commerce Platform — Full-featured Next.js online store with Stripe, inventory management, and SEO optimization</li>
        <li>JLM Tournaments — Online gaming tournament platform with React, Vite, and Supabase real-time features</li>
        <li>Gurugram University Attendance Management System — Full stack attendance tracking with React, Node.js, and MongoDB</li>
      </ul>
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
        <Contact estimatorData={estimatorData} />
      </main>
      <SeoBlock />
      <Footer />
    </>
  );
}
