"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LeaderboardEntry } from "@/types";

export default function LeaderboardPreview({ slug }: { slug: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leaderboard?slug=${slug}&limit=5`)
      .then((r) => r.json())
      .then((data) => setEntries(data.entries || []))
      .finally(() => setLoading(false));
  }, [slug]);

  const medalColor = ["#f4a228", "#9997a0", "#cd7f32"];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3
          className="font-clash font-semibold text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          🏆 Top Scores
        </h3>
        <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          This quiz
        </span>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6 flex items-center justify-center">
            <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Loading leaderboard...
            </span>
          </div>
        ) : entries.length === 0 ? (
          <div className="p-8 flex flex-col items-center gap-2">
            <span className="text-3xl">🎯</span>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              No scores yet — be the first!
            </p>
          </div>
        ) : (
          <div>
            {entries.map((entry, i) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 px-5 py-3"
                style={{
                  borderBottom:
                    i < entries.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  className="font-clash font-bold text-lg w-6 text-center"
                  style={{ color: medalColor[i] ?? "var(--text-muted)" }}
                >
                  {i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--bg-secondary)", color: "var(--accent)" }}
                >
                  {entry.userName[0].toUpperCase()}
                </div>
                <span
                  className="flex-1 font-medium"
                  style={{ color: "var(--text-primary)", fontSize: "15px" }}
                >
                  {entry.userName}
                </span>
                <span
                  className="font-clash font-bold text-lg"
                  style={{ color: "var(--gold)" }}
                >
                  {entry.bestScore}/20
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}