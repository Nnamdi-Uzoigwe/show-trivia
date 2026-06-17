"use client";

import { useQuizStore } from "@/store/quizStore";

export default function QuizProgress() {
  const { currentIndex, questions, answers } = useQuizStore();
  const total = questions.length;

  return (
    <div className="px-4 pt-4 pb-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          Question {currentIndex + 1} of {total}
        </span>
        <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          {Math.round(((currentIndex + 1) / total) * 100)}%
        </span>
      </div>

      {/* Track */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--bg-card)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / total) * 100}%`,
            background: "var(--accent)",
          }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1 flex-wrap mt-1">
        {questions.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{
              background:
                i === currentIndex
                  ? "var(--accent)"
                  : answers[i] !== null
                  ? "rgba(34,197,94,0.6)"
                  : "var(--bg-card)",
              border: `1px solid ${
                i === currentIndex ? "var(--accent)" : "var(--border)"
              }`,
              transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}