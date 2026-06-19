"use client";

import { useEffect, useState } from "react";
import { SHOWS } from "@/lib/showsData";

export default function AdminLeaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("prison-break");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?slug=${selectedSlug}&limit=20`)
      .then((r) => r.json())
      .then((data) => setEntries(data.entries || []))
      .finally(() => setLoading(false));
  }, [selectedSlug]);

  const medalColor = ["#f4a228", "#9997a0", "#cd7f32"];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="px-3 py-2 rounded-md text-sm outline-none"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-satoshi)",
          }}
        >
          {SHOWS.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No scores yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Rank", "Name", "Best Score", "Best Time", "Attempts"].map((h) => (
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
              {entries.map((entry, i) => {
                const mins = Math.floor(entry.bestTime / 60);
                const secs = entry.bestTime % 60;
                return (
                  <tr
                    key={entry._id}
                    style={{ borderBottom: i < entries.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <td className="px-4 py-3">
                      <span
                        className="font-clash font-bold text-base"
                        style={{ color: medalColor[i] ?? "var(--text-muted)" }}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {entry.userName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-clash font-bold text-base" style={{ color: "var(--gold)" }}>
                        {entry.bestScore}/20
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {mins}m {secs}s
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>
                      {entry.totalAttempts}
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