"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquareCode, X, ArrowLeft, Bot, Sparkles, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  { text: "🟢 Check current availability", query: "availability" },
  { text: "💻 Tech stack & specializations", query: "tech stack" },
  { text: "💰 Typical project rates", query: "rates" },
  { text: "📝 How do we start a project?", query: "how to start" },
];

export default function HiringAgentSandbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Screen size detector
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pre-populate with bot greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: "greeting",
            sender: "bot",
            text: "Hello! I am Ayush's AI Copilot. Ask me anything about his technical expertise, project rates, or availability. I'm here to help you scope your project!",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newUserMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Dynamic mock response generation based on keyword mapping
    setTimeout(() => {
      const lowerText = textToSend.toLowerCase();
      let reply = "";

      if (lowerText.includes("availab") || lowerText.includes("free") || lowerText.includes("open") || lowerText.includes("schedule")) {
        reply = "Ayush is currently open for select high-end freelance contracts starting next month! He has the bandwidth for 1 large-scale application (or SaaS portal) and 1 custom marketing/landing page. You can lock in a discovery slot using the main Contact section below!";
      } else if (lowerText.includes("stack") || lowerText.includes("tech") || lowerText.includes("language") || lowerText.includes("skill") || lowerText.includes("react") || lowerText.includes("next")) {
        reply = "Ayush possesses an elite, comprehensive technical skill set that covers end-to-end digital product design and development:\n\n• Frontend & Animation: React, Next.js, TypeScript, Tailwind, Vanilla CSS, Bootstrap, Framer Motion, GSAP\n• Mobile Development: React Native, Expo\n• Backend Engineering: Node.js, Java, SpringBoot, Rust, Go, REST APIs, Prisma\n• Cloud & Databases: PostgreSQL, Supabase, MongoDB, MySQL, Firebase, NoSQL\n• CMS & E-Commerce: WordPress (Custom Themes & Plugins), Shopify (Liquid & Custom App integration)\n• AI & Automation: AI Integration (Meta AI integration, prompt engineering, and LLM automation workflows)";
      } else if (lowerText.includes("rate") || lowerText.includes("cost") || lowerText.includes("price") || lowerText.includes("budget") || lowerText.includes("money")) {
        reply = "Ayush provides highly value-driven, fixed-scope project rates rather than unpredictable hourly billing. Here are typical guides:\n\n• Premium Interactive Landing Page: $1,500 – $3,000 (Built for Conversion)\n• Custom Full-Stack Web Application: $5,000+\n• Development Retainers: Available upon discussion. \n\nEach project includes rigorous testing, speed audits, and a 30-day warranty.";
      } else if (lowerText.includes("start") || lowerText.includes("process") || lowerText.includes("hire") || lowerText.includes("work")) {
        reply = "Here is the seamless roadmap to launch your project with Ayush:\n\n1. Discovery: Drop a message in the Contact form below with your goals.\n2. Strategy & Mockups: Ayush designs a custom Figma mockup and dynamic proposal.\n3. Development: Clean, performant code written with interactive demos shared every few days.\n4. Deployment & Support: Live deployment to Vercel/AWS with a 30-day bug warranty.";
      } else {
        reply = "That is an excellent question! Ayush focuses on bringing premium visual design and solid, bulletproof engineering to every project. To get concrete answers regarding your specific project ideas, I highly recommend filling out the Contact form at the bottom of the page, and Ayush will get back to you directly within a few hours!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Logo Trigger Button (Bottom Right Corner) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #112240 0%, #0a192f 100%)",
          border: "2px solid #64ffda",
          boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)",
          color: "#64ffda",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          cursor: "pointer",
          outline: "none",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(100, 255, 218, 0.6)" }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="bot-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Bot size={28} className="animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Responsive Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              isMobile
                ? { y: "100%", opacity: 0 }
                : { y: 50, scale: 0.95, opacity: 0 }
            }
            animate={
              isMobile
                ? { y: 0, opacity: 1 }
                : { y: 0, scale: 1, opacity: 1 }
            }
            exit={
              isMobile
                ? { y: "100%", opacity: 0 }
                : { y: 30, scale: 0.95, opacity: 0 }
            }
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            style={{
              position: "fixed",
              zIndex: 998,
              background: "rgba(10, 25, 47, 0.95)",
              border: isMobile ? "none" : "1px solid rgba(100, 255, 218, 0.15)",
              boxShadow: "0 20px 40px rgba(2, 12, 27, 0.8)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              // Responsive Styles
              ...(isMobile
                ? {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                  }
                : {
                    bottom: "105px",
                    right: "30px",
                    width: "380px",
                    height: "580px",
                    borderRadius: "16px",
                  }),
            }}
          >
            {/* Header section */}
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid rgba(100, 255, 218, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(17, 34, 64, 0.6)",
                borderTopLeftRadius: isMobile ? 0 : "16px",
                borderTopRightRadius: isMobile ? 0 : "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {isMobile ? (
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: "#64ffda",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "8px",
                    }}
                  >
                    <ArrowLeft size={24} />
                  </button>
                ) : (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(100, 255, 218, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64ffda",
                    }}
                  >
                    <Bot size={20} />
                  </div>
                )}
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      color: "#e6f1ff",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Hiring Agent AI
                    <Sparkles size={14} style={{ color: "#64ffda" }} />
                  </h3>
                  <p style={{ fontSize: "12px", color: "#8892b0", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#64ffda",
                        boxShadow: "0 0 8px #64ffda",
                      }}
                    />
                    Online • Copilot
                  </p>
                </div>
              </div>
              
              {!isMobile && (
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#8892b0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    padding: "4px",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8892b0")}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Conversation Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                      fontSize: "10px",
                      color: "#8892b0",
                    }}
                  >
                    {msg.sender === "bot" ? (
                      <>
                        <Bot size={12} style={{ color: "#64ffda" }} />
                        <span>AI Copilot</span>
                      </>
                    ) : (
                      <>
                        <span>Guest Client</span>
                        <User size={12} style={{ color: "#8892b0" }} />
                      </>
                    )}
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      whiteSpace: "pre-line",
                      ...(msg.sender === "user"
                        ? {
                            background: "rgba(100, 255, 218, 0.1)",
                            color: "#64ffda",
                            border: "1px solid rgba(100, 255, 218, 0.2)",
                            borderTopRightRadius: "2px",
                          }
                        : {
                            background: "#112240",
                            color: "#ccd6f6",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            borderTopLeftRadius: "2px",
                          }),
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", maxWidth: "80%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", fontSize: "10px", color: "#8892b0" }}>
                    <Bot size={12} style={{ color: "#64ffda" }} />
                    <span>AI Copilot typing...</span>
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      borderTopLeftRadius: "2px",
                      background: "#112240",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span className="dot" style={{ width: "6px", height: "6px", backgroundColor: "#64ffda", borderRadius: "50%", display: "inline-block", animation: "pulse 1s infinite alternate" }} />
                    <span className="dot" style={{ width: "6px", height: "6px", backgroundColor: "#64ffda", borderRadius: "50%", display: "inline-block", animation: "pulse 1s infinite alternate 0.2s" }} />
                    <span className="dot" style={{ width: "6px", height: "6px", backgroundColor: "#64ffda", borderRadius: "50%", display: "inline-block", animation: "pulse 1s infinite alternate 0.4s" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick suggested chips */}
            {messages.length > 0 && (
              <div
                style={{
                  padding: "0 20px 10px 20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt.text)}
                    style={{
                      fontSize: "12px",
                      padding: "6px 12px",
                      borderRadius: "16px",
                      background: "rgba(17, 34, 64, 0.8)",
                      border: "1px solid rgba(100, 255, 218, 0.15)",
                      color: "#8892b0",
                      transition: "all 0.2s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#64ffda";
                      e.currentTarget.style.borderColor = "#64ffda";
                      e.currentTarget.style.background = "rgba(100, 255, 218, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#8892b0";
                      e.currentTarget.style.borderColor = "rgba(100, 255, 218, 0.15)";
                      e.currentTarget.style.background = "rgba(17, 34, 64, 0.8)";
                    }}
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input field */}
            <div
              style={{
                padding: "20px",
                borderTop: "1px solid rgba(100, 255, 218, 0.1)",
                display: "flex",
                gap: "10px",
                background: "rgba(17, 34, 64, 0.4)",
                borderBottomLeftRadius: isMobile ? 0 : "16px",
                borderBottomRightRadius: isMobile ? 0 : "16px",
              }}
            >
              <input
                type="text"
                placeholder="Ask about availability, stack, rates..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{
                  flex: 1,
                  background: "#0a192f",
                  border: "1px solid rgba(100, 255, 218, 0.2)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#ccd6f6",
                  fontSize: "14px",
                  outline: "none",
                  transition: "var(--transition)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#64ffda")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(100, 255, 218, 0.2)")}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "8px",
                  background: "#64ffda",
                  color: "#0a192f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#52e0c0";
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(100, 255, 218, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#64ffda";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pulse {
          from { opacity: 0.3; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}
