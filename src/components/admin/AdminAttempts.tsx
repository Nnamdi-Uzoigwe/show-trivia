"use client";

import { useEffect, useState } from "react";

export default function AdminAttempts() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setAttempts(data.recentAttempts || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-clash font-bold text-xl" style={{ color: "var(--text-primary)" }}>
        Recent Attempts
      </h2>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading...</p>
          </div>
        ) : attempts.length === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No attempts yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["User", "Show", "Score", "Time", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt, i) => {
                const mins = Math.floor(attempt.timeTaken / 60);
                const secs = attempt.timeTaken % 60;
                const date = new Date(attempt.completedAt).toLocaleDateString();
                const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                return (
                  <tr
                    key={attempt._id}
                    style={{ borderBottom: i < attempts.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {attempt.userName}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {attempt.showSlug}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-sm font-bold"
                        style={{ color: pct >= 60 ? "#22c55e" : "var(--accent)" }}
                      >
                        {attempt.score}/{attempt.totalQuestions}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {mins}m {secs}s
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>
                      {date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}