"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Loading stats...</p>;

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: "👤" },
    { label: "Total Attempts", value: stats.totalAttempts, icon: "🎯" },
    { label: "Total Questions", value: stats.totalQuestions, icon: "❓" },
    { label: "Active Shows", value: stats.totalShows, icon: "🎬" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon }) => (
          <div key={label} className="card p-5 flex flex-col gap-2">
            <span className="text-2xl">{icon}</span>
            <span
              className="font-clash font-bold text-3xl"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Attempts by show */}
      <div className="flex flex-col gap-4">
        <h2 className="font-clash font-bold text-xl" style={{ color: "var(--text-primary)" }}>
          Attempts by Show
        </h2>
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Show", "Attempts", "Avg Score"].map((h) => (
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
              {stats.attemptsByShow.map((row: any, i: number) => (
                <tr
                  key={row._id}
                  style={{ borderBottom: i < stats.attemptsByShow.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {row._id}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {row.count}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gold)" }}>
                    {row.avgScore?.toFixed(1)}/20
                  </td>
                </tr>
              ))}
              {stats.attemptsByShow.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                    No attempts yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}