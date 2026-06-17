"use client";

import { useEffect, useRef } from "react";
import { useQuizStore } from "@/store/quizStore";

export default function QuizTimer({ onExpire }: { onExpire: () => void }) {
  const { timeLeft, setTimeLeft } = useQuizStore();
  const expiredRef = useRef(false);

  useEffect(() => {
    expiredRef.current = false;
    const interval = setInterval(() => {
      setTimeLeft(useQuizStore.getState().timeLeft - 1);
      if (useQuizStore.getState().timeLeft <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        clearInterval(interval);
        onExpire();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  const isLow = timeLeft < 120;

  return (
    <div
      className="px-3 py-1.5 rounded-md font-clash font-bold text-sm tabular-nums"
      style={{
        background: isLow ? "rgba(229,56,59,0.12)" : "var(--bg-card)",
        color: isLow ? "var(--accent)" : "var(--text-primary)",
        border: `1px solid ${isLow ? "rgba(229,56,59,0.3)" : "var(--border)"}`,
        transition: "all 0.3s ease",
      }}
    >
      ⏱ {mins}:{secs}
    </div>
  );
}