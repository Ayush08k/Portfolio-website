"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"initial" | "intro" | "loading" | "exit">("initial");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Phase 0: Trigger fade in of the first text immediately after mount
    const startTimer = setTimeout(() => {
      setPhase("intro");
    }, 50);

    // Phase 1: Show the rest of the text and progress bar
    const loadingTimer = setTimeout(() => {
      setPhase("loading");
    }, 800);

    // Phase 2: Simulate progress bar while assets load
    let progressInterval: ReturnType<typeof setInterval>;
    const progressTimer = setTimeout(() => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Fast start, slow middle, fast finish
          const increment = prev < 30 ? 8 : prev < 70 ? 3 : prev < 90 ? 5 : 10;
          return Math.min(100, prev + increment);
        });
      }, 60);
    }, 900);

    // Phase 3: Exit after progress completes
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2800);

    // Phase 4: Remove from DOM
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3400);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(loadingTimer);
      clearTimeout(progressTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${phase === "exit" ? "loading-screen-exit" : ""}`}
      aria-hidden="true"
    >
      <div className="loading-content">
        {/* Greeting text */}
        <div className={`loading-greeting ${(phase === "intro" || phase === "loading" || phase === "exit") ? "loading-greeting-visible" : ""}`}>
          <span className="loading-hi">Hi</span>
          <span className="loading-comma">,</span>
        </div>

        <div className={`loading-name ${phase === "loading" || phase === "exit" ? "loading-name-visible" : ""}`}>
          <span>this is</span>{" "}
          <span className="loading-ayush">Ayush</span>
        </div>

        {/* Progress bar */}
        <div className={`loading-bar-wrap ${phase === "loading" || phase === "exit" ? "loading-bar-visible" : ""}`}>
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loading-percentage">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
