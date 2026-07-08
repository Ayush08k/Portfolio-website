"use client";
import { useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  birthTime: number;
  rotation: number;
  rotationSpeed: number;
  type: "star" | "circle";
}

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const particleIdRef = useRef(0);
  const isHoveringRef = useRef(false);
  const ringPosRef = useRef({ x: -100, y: -100 });
  const ringSizeRef = useRef(8);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastMoveTime = Date.now();

    // Resize canvas to cover viewport — cap DPR to avoid overdraw
    const MAX_DPR = 1.5;
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Premium monochromatic palette matching the "True Black" theme
    const colors = [
      "#ffffff",                  // Pure white
      "rgba(255, 255, 255, 0.95)", // High contrast white
      "rgba(255, 255, 255, 0.8)",  // Soft white
      "rgba(241, 245, 249, 0.7)",  // Slate 100
      "rgba(226, 232, 240, 0.5)",  // Slate 200
      "rgba(203, 213, 225, 0.4)",  // Slate 300
    ];

    const createParticle = (x: number, y: number, isIdle = false, isBurst = false) => {
      particleIdRef.current += 1;
      const angle = Math.random() * Math.PI * 2;
      
      let speed;
      if (isIdle) {
        speed = Math.random() * 0.4 + 0.1;
      } else if (isBurst) {
        speed = Math.random() * 2.5 + 1.2;
      } else {
        speed = Math.random() * 1.4 + 0.3;
      }

      let size;
      if (isIdle) {
        size = Math.random() * 2 + 1.2;
      } else if (isBurst) {
        size = Math.random() * 4.5 + 2.5;
      } else {
        size = Math.random() * 3.5 + 2.0;
      }
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const type = Math.random() > 0.45 ? "star" : "circle";

      let vx = Math.cos(angle) * speed * 0.4;
      let vy = Math.sin(angle) * speed * 0.4;
      
      if (!isBurst) {
        vy -= (isIdle ? 0.08 : 0.25); // Gentle upward float drift
      }

      particlesRef.current.push({
        id: particleIdRef.current,
        x,
        y,
        vx,
        vy,
        size,
        color,
        birthTime: Date.now(),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * (isIdle ? 0.03 : 0.07),
        type,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      lastMoveTime = Date.now();

      const dx = clientX - mouseRef.current.lastX;
      const dy = clientY - mouseRef.current.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 2) {
        const steps = Math.min(Math.floor(distance / 8), 5);
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const px = mouseRef.current.lastX + dx * t;
          const py = mouseRef.current.lastY + dy * t;
          
          createParticle(px, py);
          if (Math.random() > 0.75) {
            createParticle(px, py);
          }
        }
        mouseRef.current.lastX = clientX;
        mouseRef.current.lastY = clientY;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("a, button, [data-hover], input, textarea, select")) {
        isHoveringRef.current = true;
        document.body.classList.add("cursor-hover");
      } else {
        isHoveringRef.current = false;
        document.body.classList.remove("cursor-hover");
      }
    };

    const handleMouseDown = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        for (let i = 0; i < 10; i++) {
          createParticle(mx, my, false, true);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);

    // Render helper for 4-pointed sparkles (shadowBlur removed for perf)
    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = alpha;
      c.fillStyle = color;

      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();

      c.fill();
      c.restore();
    };

    // Render helper for stardust circles (shadowBlur removed for perf)
    const drawCircle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;

      c.beginPath();
      c.arc(0, 0, size, 0, Math.PI * 2);
      c.closePath();

      c.fill();
      c.restore();
    };

    // Animation Loop
    let animationFrameId: number;

    const MAX_PARTICLES = 60; // Cap particles for perf
    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const duration = 400; // slightly faster fade

      // 1. Update & draw all active trail particles
      particlesRef.current = particlesRef.current.filter((p) => {
        const age = now - p.birthTime;
        if (age >= duration) return false;

        const progress = age / duration;
        const alpha = 1 - progress;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const currentSize = p.size * (1 - progress * 0.5);

        if (p.type === "star") {
          drawSparkle(ctx, p.x, p.y, currentSize, p.rotation, p.color, alpha);
        } else {
          drawCircle(ctx, p.x, p.y, currentSize * 0.45, p.color, alpha);
        }

        return true;
      });

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 2. Idle Sparkle Spawning (gently sparkles when cursor is stationary)
      if (mx > 0 && my > 0 && now - lastMoveTime > 80 && particlesRef.current.length < MAX_PARTICLES) {
        if (Math.random() > 0.9) {
          const rx = mx + (Math.random() - 0.5) * 12;
          const ry = my + (Math.random() - 0.5) * 12;
          createParticle(rx, ry, true);
        }
      }

      // 3. Draw a fluid lagging ring and a precise central dot pointer
      if (mx > 0 && my > 0) {
        if (ringPosRef.current.x === -100) {
          ringPosRef.current.x = mx;
          ringPosRef.current.y = my;
        } else {
          // Smooth spring-like lerping
          ringPosRef.current.x += (mx - ringPosRef.current.x) * 0.16;
          ringPosRef.current.y += (my - ringPosRef.current.y) * 0.16;
        }

        const targetSize = isHoveringRef.current ? 18 : 7;
        ringSizeRef.current += (targetSize - ringSizeRef.current) * 0.2;

        // Draw outer ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(ringPosRef.current.x, ringPosRef.current.y, ringSizeRef.current, 0, Math.PI * 2);
        ctx.strokeStyle = isHoveringRef.current ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = isHoveringRef.current ? 1.0 : 1.25;
        
        if (isHoveringRef.current) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
          ctx.fill();
        }
        
        ctx.stroke();
        ctx.restore();

        // Draw central dot (shrinks/fades out completely when hovering)
        const targetDotSize = isHoveringRef.current ? 0 : 2.5;
        if (targetDotSize > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(mx, my, targetDotSize, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}
