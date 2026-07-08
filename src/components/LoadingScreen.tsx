"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"initial" | "loading" | "exit">("initial");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show immediately
    const startTimer = setTimeout(() => {
      setPhase("loading");
    }, 50);

    // Let the animation play: 1s for Red, 2s for Yellow, 3s for Green. Exit at 3.5s.
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 3500); 

    // Remove from DOM
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 4100);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${phase === "exit" ? "loading-screen-exit" : ""}`}
      aria-hidden="true"
    >
      <div className="loading-content">
        <div className={`loading-welcome ${(phase === "loading" || phase === "exit") ? "loading-welcome-visible" : ""}`}>
          Welcome
        </div>
        <div className={`loading-dots-container ${(phase === "loading" || phase === "exit") ? "loading-dots-visible" : ""}`}>
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
      </div>
    </div>
  );
}
