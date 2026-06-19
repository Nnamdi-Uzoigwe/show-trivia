"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/quizStore";
import { useUserStore } from "@/store/userStore";

export default function QuizResult({ slug, showTitle }: { slug: string; showTitle: string }) {
  const router = useRouter();
  const { questions, answers, getScore, getResults, resetQuiz, timeLeft } = useQuizStore();
  const { user } = useUserStore();
  const [saved, setSaved] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const hasSaved = useRef(false);

  const score = getScore();
  const total = questions.length;
  const timeTaken = 30 * 60 - timeLeft;
  const percentage = Math.round((score / total) * 100);

  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  const emoji =
    percentage >= 80 ? "🏆" : percentage >= 60 ? "🎯" : percentage >= 40 ? "😅" : "💀";

  const message =
    percentage >= 80
      ? "You really watched it!"
      : percentage >= 60
      ? "Decent. Could be better."
      : percentage >= 40
      ? "You skipped a few episodes, huh?"
      : "Are you sure you watched this show?";

  useEffect(() => {
    if (hasSaved.current || !user) return;
    hasSaved.current = true;
  const { fingerprint } = useUserStore.getState();
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  userId: user._id,
  userName: user.name,
  showSlug: slug,
  score,
  totalQuestions: total,
  timeTaken,
  answers: getResults(),
  fingerprint,
}),
    }).then(() => setSaved(true));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-16 gap-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg flex flex-col gap-6"
      >
        {/* Score card */}
        <div
          className="card p-8 flex flex-col items-center gap-4 text-center"
          style={{ borderColor: "rgba(229,56,59,0.2)" }}
        >
          <span className="text-6xl">{emoji}</span>
          <div>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "4px" }}>
              {showTitle}
            </p>
            <h1
              className="font-clash font-bold text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              {score}
              <span style={{ color: "var(--text-muted)" }}>/{total}</span>
            </h1>
            <p
              className="font-clash text-xl mt-1"
              style={{ color: percentage >= 60 ? "var(--gold)" : "var(--accent)" }}
            >
              {percentage}%
            </p>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
            {message}
          </p>

          <div className="flex gap-6 mt-2">
            <div className="flex flex-col items-center gap-1">
              <span className="font-clash font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                {mins}m {secs}s
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Time taken</span>
            </div>
            <div
              className="w-px"
              style={{ background: "var(--border)" }}
            />
            <div className="flex flex-col items-center gap-1">
              <span className="font-clash font-bold text-lg" style={{ color: "#22c55e" }}>
                {score}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Correct</span>
            </div>
            <div
              className="w-px"
              style={{ background: "var(--border)" }}
            />
            <div className="flex flex-col items-center gap-1">
              <span className="font-clash font-bold text-lg" style={{ color: "var(--accent)" }}>
                {total - score}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Wrong</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            className="btn-primary w-full py-4"
            onClick={() => { resetQuiz(); router.push(`/quiz/${slug}/play`); }}
          >
            Try Again →
          </button>
          <button
            className="btn-ghost w-full"
            onClick={() => setShowReview(!showReview)}
          >
            {showReview ? "Hide Review" : "Review Answers"}
          </button>
          <button
            className="btn-ghost w-full"
            onClick={() => { resetQuiz(); router.push("/"); }}
          >
            ← Back to Home
          </button>
        </div>

        {/* Share */}
        <div
          className="card p-4 flex items-center justify-between"
        >
          <div>
            <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
              Share your score
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              Challenge your friends
            </p>
          </div>
          <button
            className="btn-primary px-5 py-2 text-sm"
            onClick={() => {
              const text = `I scored ${score}/${total} on the ${showTitle} quiz on ShowTrivia! Can you beat me? 🎬`;
              navigator.clipboard.writeText(
                `${text}\n${window.location.origin}/quiz/${slug}`
              );
            }}
          >
            Copy & Share
          </button>
        </div>

        {/* Review */}
        {showReview && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-clash font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
              Answer Review
            </h3>
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q._id}
                  className="card p-4 flex flex-col gap-3"
                  style={{
                    borderColor: isCorrect
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(229,56,59,0.2)",
                  }}
                >
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {i + 1}. {q.question}
                  </p>
                  <div className="flex flex-col gap-1">
                    {userAnswer !== null && (
                      <p className="text-xs" style={{ color: isCorrect ? "#22c55e" : "var(--accent)" }}>
                        Your answer: {q.options[userAnswer]}
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="text-xs" style={{ color: "#22c55e" }}>
                        Correct: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}