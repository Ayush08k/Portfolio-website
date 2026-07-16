"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquareCode, X, ArrowLeft, Bot, Sparkles, Send, User, Loader2 } from "lucide-react";
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
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
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
            text: "Looking for the best freelancer to bring your project to life? You are at the right place!\n\nHi, this is Ayush. I have been a freelancer for the last 3 years and have successfully delivered 50+ projects that are currently live and in use.\n\nHow can I help you today?",
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
  }, [messages, isTyping, isThinking]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newUserMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsThinking(true);

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

    // 2. Wait exactly 2 seconds for thinking animation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsThinking(false);
    setIsTyping(true);

    // 3. Show typing animation for at least 1.5 seconds while waiting for API
    const typingDelayPromise = new Promise((resolve) => setTimeout(resolve, 1500));

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
      await typingDelayPromise; // Ensure typing shows for at least 1.5s even on error
      
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Logo Trigger Button (Bottom Right Corner) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger-button"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1f1f1f 0%, #000000 100%)",
              border: "2px solid #ffffff",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              cursor: "pointer",
              outline: "none",
            }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 255, 255, 0.35)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot size={28} className="animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

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
              background: "rgba(0, 0, 0, 0.95)",
              border: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
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
                    bottom: "30px",
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
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255, 255, 255, 0.02)",
                borderTopLeftRadius: isMobile ? 0 : "16px",
                borderTopRightRadius: isMobile ? 0 : "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {isMobile ? (
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: "#ffffff",
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
                      background: "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
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
                    Ask Me
                    <Sparkles size={14} style={{ color: "#ffffff" }} />
                  </h3>
                  <p style={{ fontSize: "12px", color: "#8892b0", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 0 8px #ffffff",
                      }}
                    />
                    Online • Copilot
                  </p>
                </div>
              </div>
              
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8892b0")}
              >
                <X size={20} />
              </button>
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
                            background: "rgba(255, 255, 255, 0.08)",
                            color: "#ffffff",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderTopRightRadius: "2px",
                          }
                        : {
                            background: "rgba(255, 255, 255, 0.03)",
                            color: "#e2e8f0",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            borderTopLeftRadius: "2px",
                          }),
                    }}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", maxWidth: "80%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", fontSize: "10px", color: "#8892b0" }}>
                    <Bot size={12} style={{ color: "#ffffff" }} />
                    <span>Ask Me is thinking...</span>
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      borderTopLeftRadius: "2px",
                      background: "rgba(255, 255, 255, 0.03)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <Loader2 size={14} className="spin-loader" style={{ color: "#ffffff" }} />
                    <span style={{ fontSize: "13px", color: "#a8b2d1", fontFamily: "Outfit, sans-serif" }}>Formulating response...</span>
                  </div>
                </div>
              )}

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
              <div ref={chatEndRef} />
            </div>

            {/* Quick suggested chips */}
            {messages.length > 0 && inputValue.trim() === "" && (
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
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  transition: "var(--transition)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)")}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "8px",
                  background: "#ffffff",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-loader {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
}
