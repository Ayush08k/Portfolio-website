"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      // Spring-follow ring with lag
      const dx = pos.current.x - ring.current.x;
      const dy = pos.current.y - ring.current.y;
      ring.current.x += dx * 0.12;
      ring.current.y += dy * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform  = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("a, button, [data-hover]")) {
        document.body.classList.add("cursor-hover");
      } else {
        document.body.classList.remove("cursor-hover");
      }
    };
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
