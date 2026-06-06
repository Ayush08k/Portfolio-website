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
    let pointerAngle = 0;

    // Resize canvas to cover viewport with Retina/High-DPI scaling
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Vibrant neon palette matching the portfolio's Deep Space Aurora design
    const colors = [
      "#7c3aed", // violet
      "#3b82f6", // blue
      "#10b981", // emerald
      "#f59e0b", // gold
      "#ec4899", // pink
      "#00f2fe", // cyan
      "#ffffff", // bright white
    ];

    const createParticle = (x: number, y: number, isIdle = false) => {
      particleIdRef.current += 1;
      const angle = Math.random() * Math.PI * 2;
      
      // Idle particles are smaller and slower for a subtle aura effect
      const speed = isIdle 
        ? (Math.random() * 0.5 + 0.15) 
        : (Math.random() * 1.6 + 0.4);
      const size = isIdle 
        ? (Math.random() * 3.5 + 2.5) 
        : (Math.random() * 8 + 6);
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const type = Math.random() > 0.4 ? "star" : "circle";

      // Slight upward float drift
      const vx = Math.cos(angle) * speed * 0.4;
      const vy = Math.sin(angle) * speed * 0.4 - (isIdle ? 0.12 : 0.35);

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
        rotationSpeed: (Math.random() - 0.5) * (isIdle ? 0.04 : 0.08),
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

      // Spawn particles if the cursor has moved
      if (distance > 2) {
        // Interpolate points between last mouse position and current position for a perfectly smooth trail
        const steps = Math.min(Math.floor(distance / 6), 6);
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const px = mouseRef.current.lastX + dx * t;
          const py = mouseRef.current.lastY + dy * t;
          
          createParticle(px, py);
          if (Math.random() > 0.7) {
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Render helper for 4-pointed sparkles
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

      c.shadowBlur = size * 1.5;
      c.shadowColor = color;
      c.fill();
      c.restore();
    };

    // Render helper for stardust circles
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

      c.shadowBlur = size * 2;
      c.shadowColor = color;
      c.fill();
      c.restore();
    };

    // Animation Loop
    let animationFrameId: number;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const duration = 450; // 450ms animation duration for a tighter, cleaner trail

      // 1. Update & draw all active trail particles
      particlesRef.current = particlesRef.current.filter((p) => {
        const age = now - p.birthTime;
        if (age >= duration) return false;

        const progress = age / duration; // 0 to 1
        const alpha = 1 - progress; // Fade out to 0 over 450ms

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Particles shrink as they age
        const currentSize = p.size * (1 - progress * 0.6);

        if (p.type === "star") {
          drawSparkle(ctx, p.x, p.y, currentSize, p.rotation, p.color, alpha);
        } else {
          drawCircle(ctx, p.x, p.y, currentSize * 0.4, p.color, alpha);
        }

        return true;
      });

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 2. Idle Sparkle Spawning (gently sparkles when cursor is stationary)
      if (mx > 0 && my > 0 && now - lastMoveTime > 80) {
        if (Math.random() > 0.88) { // occasional idle sparks
          const rx = mx + (Math.random() - 0.5) * 16;
          const ry = my + (Math.random() - 0.5) * 16;
          createParticle(rx, ry, true); // true = isIdle
        }
      }

      // 3. Draw a precise leading cursor pointer (slowly spinning 4-pointed sparkle)
      if (mx > 0 && my > 0) {
        pointerAngle += 0.015; // slow rotate
        const pointerSize = isHoveringRef.current ? 8 : 5;
        const pointerColor = isHoveringRef.current ? "#10b981" : "#7c3aed"; // emerald green on hover, violet normally
        drawSparkle(ctx, mx, my, pointerSize, pointerAngle, pointerColor, 1.0);
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
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

