"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquareCode, X, ArrowLeft, Bot, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const FAQ_QUESTIONS = [
  { icon: "🟢", label: "Check Availability & Timezone", question: "What is your current availability and timezone?" },
  { icon: "💻", label: "Technical Skills & Stack", question: "What is your tech stack and technical expertise?" },
  { icon: "💰", label: "Project Rates & Pricing Guide", question: "What are your typical project rates and pricing?" },
  { icon: "🚀", label: "Featured Works & Projects", question: "Can you show me some of your featured projects?" },
  { icon: "⏱️", label: "Delivery Speed & Timelines", question: "What are your typical project delivery timelines?" },
  { icon: "📱", label: "Mobile App Development", question: "Do you develop iOS and Android mobile apps?" },
  { icon: "🛍️", label: "E-Commerce & Shopify Experience", question: "What is your experience with E-Commerce and Shopify?" },
  { icon: "🤖", label: "AI & Automation Capabilities", question: "Can you integrate AI chatbots and automation?" },
  { icon: "🔒", label: "NDAs, Support & Figma files", question: "Do you sign NDAs and provide post-launch support?" },
  { icon: "📝", label: "How to Start a Project?", question: "How do we get started on a project?" },
  { icon: "👨‍💻", label: "Ayush's Freelance Background", question: "Tell me about Ayush's professional background and experience." },
  { icon: "✨", label: "Working with Startups & Agencies", question: "Do you work with startups, agencies, or custom enterprise contracts?" },
  { icon: "🛠️", label: "Post-Launch Free Maintenance", question: "Do you offer free post-launch maintenance and support?" },
  { icon: "🎨", label: "Figma UI/UX File Integration", question: "Can you build websites directly from Figma UI designs?" },
];

const renderMessageText = (text: string) => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;

  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(boldRegex, '<strong style="color: #e6f1ff; font-weight: 600;">$1</strong>');
  html = html.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #64ffda; text-decoration: underline; font-weight: 500;">$1</a>');

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function HiringAgentSandbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  
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
    if (isOpen) {
      setShowQuestions(true); // Always reset questions list to visible on open
      if (messages.length === 0) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setMessages([
            {
              id: "greeting",
              sender: "bot",
              text: "Looking for the best freelancer to bring your project to life? You are at the right place!\n\nHi, this is Ayush. I have been a freelancer for the last 3 years and have successfully delivered 50+ projects that are currently live and in use.\n\nHow can I help you today?",
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setShowQuestions(false);

    const newUserMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    // 1. Start fetching API response in parallel
    const apiPromise = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedMessages }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        if (data.reply) return data.reply;
      }
      throw new Error("Chat API route returned non-OK response");
    });

    // 2. Show typing animation for at least 800ms to look natural
    const typingDelayPromise = new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const [reply] = await Promise.all([apiPromise, typingDelayPromise]);
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Chat API error, using static fallback:", error);
      await typingDelayPromise; // Ensure typing shows for at least 800ms even on error
      
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "bot",
          text: "I apologize, but I encountered a connection issue. Rest assured that Ayush is extremely prompt and professional. I highly recommend leaving your message, email, and goals in the **Contact form** just below this chat window, and Ayush will get back to you personally within a couple of hours!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger-button"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              width: "60px",
              height: "60px",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #64ffda 0%, #0a192f 100%)",
              border: "2px solid rgba(100, 255, 218, 0.4)",
              boxShadow: "0 10px 30px -10px rgba(100, 255, 218, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              color: "#ffffff",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
              <MessageSquareCode size={24} style={{ color: "#ffffff" }} />
              <span
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "2px solid #64ffda",
                  animation: "pulse 2s infinite alternate",
                  pointerEvents: "none",
                  left: 0,
                  top: 0,
                }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-sandbox-drawer"
            initial={isMobile ? { y: "100%", opacity: 0 } : { y: 100, scale: 0.9, opacity: 0 }}
            animate={isMobile ? { y: 0, opacity: 1 } : { y: 0, scale: 1, opacity: 1 }}
            exit={isMobile ? { y: "100%", opacity: 0 } : { y: 100, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            style={{
              position: "fixed",
              bottom: isMobile ? 0 : "100px",
              right: isMobile ? 0 : "24px",
              width: isMobile ? "100vw" : "420px",
              height: isMobile ? "100vh" : "600px",
              background: "rgba(10, 25, 47, 0.95)",
              backdropFilter: "blur(20px)",
              border: isMobile ? "none" : "1px solid rgba(100, 255, 218, 0.15)",
              borderRadius: isMobile ? 0 : "16px",
              boxShadow: "0 20px 40px -15px rgba(2, 12, 27, 0.8), 0 0 0 1px rgba(100, 255, 218, 0.1)",
              display: "flex",
              flexDirection: "column",
              zIndex: 9999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(2, 12, 27, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(100, 255, 218, 0.1)",
                    border: "1px solid rgba(100, 255, 218, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Bot size={18} style={{ color: "#64ffda" }} />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#64ffda",
                      border: "2px solid #0a192f",
                    }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#e6f1ff",
                      fontFamily: "Outfit, sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Ask Me <Sparkles size={12} style={{ color: "#64ffda" }} />
                  </h3>
                  <span style={{ fontSize: "11px", color: "#8892b0", fontFamily: "Outfit, sans-serif" }}>
                    Ayush's Interactive AI Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#8892b0",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#8892b0";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {isMobile ? <ArrowLeft size={20} /> : <X size={20} />}
              </button>
            </div>

            <div
              style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "radial-gradient(circle at 50% 0%, rgba(100, 255, 218, 0.03) 0%, transparent 75%)",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "4px",
                      fontSize: "10px",
                      color: "#8892b0",
                      alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {msg.sender === "bot" ? (
                      <>
                        <Bot size={12} style={{ color: "#ffffff" }} />
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
                            color: "#ffffff",
                            border: "1px solid rgba(100, 255, 218, 0.2)",
                            borderTopRightRadius: "2px",
                          }
                        : {
                            background: "rgba(255, 255, 255, 0.05)",
                            color: "#e2e8f0",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderTopLeftRadius: "2px",
                          }),
                    }}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", maxWidth: "80%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", fontSize: "10px", color: "#8892b0" }}>
                    <Bot size={12} style={{ color: "#ffffff" }} />
                    <span>Ask Me typing...</span>
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      borderTopLeftRadius: "2px",
                      background: "rgba(255, 255, 255, 0.03)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span className="dot" style={{ width: "6px", height: "6px", backgroundColor: "#ffffff", borderRadius: "50%", display: "inline-block", animation: "pulse 1s infinite alternate" }} />
                    <span className="dot" style={{ width: "6px", height: "6px", backgroundColor: "#ffffff", borderRadius: "50%", display: "inline-block", animation: "pulse 1s infinite alternate 0.2s" }} />
                    <span className="dot" style={{ width: "6px", height: "6px", backgroundColor: "#ffffff", borderRadius: "50%", display: "inline-block", animation: "pulse 1s infinite alternate 0.4s" }} />
                  </div>
                </div>
              )}

              {showQuestions && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "8px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#8892b0",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Select a Frequently Asked Question:</span>
                    {isTyping && (
                      <span style={{ color: "#64ffda", fontSize: "10px", textTransform: "none", animation: "pulse 1s infinite alternate" }}>
                        Agent is responding...
                      </span>
                    )}
                  </div>
                  <div
                    className="faq-scroll-container"
                    style={{
                      maxHeight: "220px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      paddingRight: "4px",
                    }}
                  >
                    {FAQ_QUESTIONS.map((faq, index) => (
                      <button
                        key={index}
                        disabled={isTyping}
                        onClick={() => handleSendMessage(faq.question)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#ccd6f6",
                          fontSize: "13px",
                          fontFamily: "Outfit, sans-serif",
                          cursor: isTyping ? "not-allowed" : "pointer",
                          opacity: isTyping ? 0.6 : 1,
                          transition: "all 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          if (isTyping) return;
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.transform = "translateX(2px)";
                        }}
                        onMouseLeave={(e) => {
                          if (isTyping) return;
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.color = "#ccd6f6";
                          e.currentTarget.style.transform = "none";
                        }}
                      >
                        <span style={{ fontSize: "14px", flexShrink: 0 }}>{faq.icon}</span>
                        <span style={{ flex: 1 }}>{faq.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {!showQuestions && (
              <div
                style={{
                  padding: "16px 20px 20px 20px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(2, 12, 27, 0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setShowQuestions(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 24px",
                    borderRadius: "20px",
                    background: "rgba(100, 255, 218, 0.1)",
                    border: "1px solid rgba(100, 255, 218, 0.3)",
                    color: "#64ffda",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "Outfit, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(100, 255, 218, 0.2)";
                    e.currentTarget.style.borderColor = "rgba(100, 255, 218, 0.5)";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(100, 255, 218, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(100, 255, 218, 0.3)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <MessageSquareCode size={16} />
                  Ask More
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pulse {
          from { opacity: 0.3; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1.1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-loader {
          animation: spin 1s linear infinite;
        }
        .faq-scroll-container::-webkit-scrollbar {
          width: 4px;
        }
        .faq-scroll-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .faq-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .faq-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </>
  );
}
