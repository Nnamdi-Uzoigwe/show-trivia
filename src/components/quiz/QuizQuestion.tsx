"use client";

import { motion } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";

const optionLabels = ["A", "B", "C", "D"];

export default function QuizQuestion() {
  const { questions, currentIndex, answers, answerQuestion } = useQuizStore();
  const question = questions[currentIndex];
  const selected = answers[currentIndex];

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl flex flex-col gap-6"
    >
      {/* Question */}
      <div
        className="card p-6"
        style={{ borderColor: "rgba(229,56,59,0.1)" }}
      >
        <p
          className="font-clash font-semibold text-xl leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => answerQuestion(currentIndex, i)}
              className="w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all duration-200"
              style={{
                background: isSelected ? "rgba(229,56,59,0.1)" : "var(--bg-card)",
                border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                cursor: "pointer",
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  background: isSelected ? "var(--accent)" : "var(--bg-secondary)",
                  color: isSelected ? "#fff" : "var(--text-muted)",
                }}
              >
                {optionLabels[i]}
              </span>
              <span
                className="text-base"
                style={{
                  color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}