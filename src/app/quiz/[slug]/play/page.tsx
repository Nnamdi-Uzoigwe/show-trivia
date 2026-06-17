"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useQuizStore } from "@/store/quizStore";
import { SHOWS } from "@/lib/showsData";
import QuizTimer from "@/components/quiz/QuizTimer";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizResult from "@/components/quiz/QuizResult";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useUserStore();
  const {
    questions, currentIndex, isFinished, isStarted,
    setQuestions, finishQuiz, resetQuiz,
  } = useQuizStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const show = SHOWS.find((s) => s.slug === slug);

  // useEffect(() => {
  //   if (!user) { router.push("/"); return; }
  //   if (isStarted && questions.length > 0) { setLoading(false); return; }

  //   async function loadQuiz() {
  //     try {
  //       const res = await fetch(`/api/questions?slug=${slug}&limit=20`);
  //       const data = await res.json();
  //       if (!res.ok) throw new Error(data.error || "Failed to load questions");
  //       if (!data.questions?.length) throw new Error("No questions found for this show yet.");
  //       setQuestions(data.questions, slug as string, show?.title ?? "");
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadQuiz();

  //   return () => { if (isFinished) resetQuiz(); };
  // }, []);

  useEffect(() => {
  if (!user) { router.push("/"); return; }

  async function loadQuiz() {
    try {
      const res = await fetch(`/api/questions?slug=${slug}&limit=20`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load questions");
      if (!data.questions?.length) throw new Error("No questions found for this show yet.");
      setQuestions(data.questions, slug as string, show?.title ?? "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  loadQuiz();
}, [slug]);

  if (!show) return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ color: "var(--text-secondary)" }}>Show not found.</p>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 rounded-full border-2"
        style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
      />
      <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading your questions...
      </p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <span className="text-4xl">😬</span>
      <p className="font-clash text-xl" style={{ color: "var(--text-primary)" }}>
        Something went wrong
      </p>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", textAlign: "center" }}>
        {error}
      </p>
      <button className="btn-ghost" onClick={() => router.push(`/quiz/${slug}`)}>
        ← Back to Preview
      </button>
    </div>
  );

  if (isFinished) return (
    <QuizResult slug={slug as string} showTitle={show.title} />
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between gap-4"
        style={{
          background: "rgba(10,10,15,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => { resetQuiz(); router.push(`/quiz/${slug}`); }}
          className="text-sm flex items-center gap-1"
          style={{ color: "var(--text-muted)" }}
        >
          ✕ Quit
        </button>

        <div className="flex items-center gap-2">
          <span
            className="font-clash font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {show.title}
          </span>
        </div>

        <QuizTimer onExpire={finishQuiz} />
      </div>

      {/* Progress */}
      <QuizProgress />

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          <QuizQuestion key={currentIndex} />
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <BottomNav slug={slug as string} />
    </div>
  );
}

function BottomNav({ slug }: { slug: string }) {
  const { currentIndex, questions, answers, nextQuestion, prevQuestion, finishQuiz } =
    useQuizStore();

  const isLast = currentIndex === questions.length - 1;
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div
      className="sticky bottom-0 px-4 py-4 flex items-center justify-between gap-4"
      style={{
        background: "rgba(10,10,15,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <button
        className="btn-ghost px-6 py-3"
        onClick={prevQuestion}
        disabled={currentIndex === 0}
        style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
      >
        ← Prev
      </button>

      <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
        {answeredCount}/{questions.length} answered
      </span>

      {isLast ? (
        <button
          className="btn-primary px-6 py-3"
          onClick={finishQuiz}
        >
          Submit →
        </button>
      ) : (
        <button
          className="btn-primary px-6 py-3"
          onClick={nextQuestion}
        >
          Next →
        </button>
      )}
    </div>
  );
}