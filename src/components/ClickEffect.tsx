"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ClickInstance {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [clicks, setClicks] = useState<ClickInstance[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handleClick = (e: MouseEvent) => {
      // Don't trigger on interactive elements to avoid blocking clicks
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        return;
      }

      const newClick = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };

      setClicks((prev) => [...prev, newClick]);

      // Remove after animation completes (1s)
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="click-effect-text"
          style={{ left: click.x, top: click.y }}
        >
          Hi this is ayush
        </div>
      ))}
    </>,
    document.body
  );
}
