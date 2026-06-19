"use client";

import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2
          className="font-clash font-bold text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          All Users
        </h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md text-sm outline-none"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-satoshi)",
            width: "200px",
          }}
        />
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Loading users...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              No users found
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["", "Name", "Quizzes Taken", "Streak", "Last Played", "Joined"].map((h) => (
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
              {filtered.map((user, i) => (
                <tr
                  key={user._id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  {/* Avatar */}
                  <td className="px-4 py-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent)",
                        border: "1px solid rgba(229,56,59,0.2)",
                      }}
                    >
                      {user.name[0].toUpperCase()}
                    </div>
                  </td>

                  {/* Name */}
                  <td
                    className="px-4 py-3 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {user.name}
                  </td>

                  {/* Quizzes taken */}
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {user.totalQuizzesTaken ?? 0}
                  </td>

                  {/* Streak */}
                  <td className="px-4 py-3">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--gold)" }}
                    >
                      🔥 {user.streak ?? 0}
                    </span>
                  </td>

                  {/* Last played */}
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {user.lastPlayedDate
                      ? new Date(user.lastPlayedDate).toLocaleDateString()
                      : "Never"}
                  </td>

                  {/* Joined */}
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
        {filtered.length} of {users.length} users
      </p>
    </div>
  );
}