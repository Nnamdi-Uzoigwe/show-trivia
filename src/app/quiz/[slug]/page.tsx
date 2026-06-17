"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SHOWS } from "@/lib/showsData";
import { useUserStore } from "@/store/userStore";
import Navbar from "@/components/layout/Navbar";
import LeaderboardPreview from "@/components/ui/LeaderboardPreview";

export default function ShowPreviewPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useUserStore();

  const show = SHOWS.find((s) => s.slug === slug);

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "var(--text-secondary)" }}>Show not found.</p>
      </div>
    );
  }

  const difficultyColor = {
    Easy: { bg: "rgba(34,197,94,0.12)", text: "#22c55e" },
    Medium: { bg: "rgba(244,162,40,0.12)", text: "#f4a228" },
    Hard: { bg: "rgba(229,56,59,0.12)", text: "#e5383b" },
  };
  const diff = difficultyColor[show.difficulty];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Banner */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <img
            src={show.bannerImage}
            alt={show.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--bg-primary) 10%, rgba(10,10,15,0.6) 60%, transparent 100%)",
            }}
          />
          <button
            onClick={() => router.back()}
            className="absolute top-20 left-6 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2"
            style={{
              background: "rgba(10,10,15,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Title row */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: diff.bg, color: diff.text }}
                >
                  {show.difficulty}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  {show.releaseYear} · {show.totalSeasons} Seasons
                </span>
                <div className="flex gap-1.5">
                  {show.genre.map((g) => (
                    <span
                      key={g}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--bg-card)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <h1
                className="font-clash font-bold text-4xl md:text-5xl"
                style={{ color: "var(--text-primary)" }}
              >
                {show.title}
              </h1>

              <p
                className="text-base max-w-xl"
                style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
              >
                {show.description}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Questions", value: "20" },
                { label: "Time Limit", value: "30 min" },
                { label: "Question Pool", value: "200" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="card p-4 flex flex-col gap-1 text-center"
                >
                  <span
                    className="font-clash font-bold text-2xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {value}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div
              className="card p-5 flex flex-col gap-3"
              style={{ borderColor: "rgba(229,56,59,0.15)" }}
            >
              <h3
                className="font-clash font-semibold text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                How it works
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "20 random questions are picked from a pool of 200 each attempt",
                  "You have 30 minutes — timer starts the moment you begin",
                  "You can attempt this quiz up to 4 times per day",
                  "Max 20 total quiz attempts across all shows per day",
                  "Your best score goes on the leaderboard",
                  "Review your answers after the quiz ends",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                className="btn-primary w-full sm:w-auto px-12 py-4 text-base"
                onClick={() => router.push(`/quiz/${slug}/play`)}
              >
                Start Quiz →
              </button>
              <button
                className="btn-ghost w-full sm:w-auto px-8"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                📋 Copy Link
              </button>
            </div>

            {/* Leaderboard preview */}
            <LeaderboardPreview slug={show.slug} />
          </motion.div>
        </div>
      </main>
    </>
  );
}