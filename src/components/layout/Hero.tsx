"use client";

import { motion } from "framer-motion";

export default function Hero({ userName }: { userName: string }) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(229,56,59,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4 relative z-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "var(--accent-glow)",
            color: "var(--accent)",
            border: "1px solid rgba(229,56,59,0.2)",
          }}
        >
          12 Shows · 1,200 Questions
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-clash font-bold text-5xl md:text-7xl max-w-2xl"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
        >
          Hey {userName},{" "}
          <span className="text-gradient">prove</span> you watched it.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-lg max-w-md"
          style={{ color: "var(--text-secondary)" }}
        >
          Pick a show, answer 20 questions, beat the clock. Your name on the
          leaderboard or it didn't happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-4 mt-2"
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--accent)", fontSize: "20px" }}>⏱</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>30 min timer</span>
          </div>
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "var(--text-muted)" }}
          />
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--gold)", fontSize: "20px" }}>🏆</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Live leaderboard</span>
          </div>
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "var(--text-muted)" }}
          />
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "20px" }}>🎲</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Random questions</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}