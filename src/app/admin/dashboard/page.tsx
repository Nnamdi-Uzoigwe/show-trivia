"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminStats from "@/components/admin/AdminStats";
import AdminQuestions from "@/components/admin/AdminQuestions";
import AdminLeaderboard from "@/components/admin/AdminLeaderboard";
import AdminAttempts from "@/components/admin/AdminAttempts";

type Tab = "stats" | "questions" | "leaderboard" | "attempts";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => { if (r.status === 401) router.push("/admin"); })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "stats", label: "📊 Overview" },
    { key: "questions", label: "❓ Questions" },
    { key: "leaderboard", label: "🏆 Leaderboard" },
    { key: "attempts", label: "📝 Attempts" },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,10,15,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-clash font-bold text-xl" style={{ color: "var(--text-primary)" }}>
            Show
          </span>
          <span
            className="font-clash font-bold text-xl px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Trivia
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="btn-ghost px-4 py-2 text-sm"
            onClick={() => router.push("/")}
          >
            View Site
          </button>
          <button
            className="btn-primary px-4 py-2 text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="px-6 flex gap-1 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200"
            style={{
              color: activeTab === tab.key ? "var(--text-primary)" : "var(--text-muted)",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.key ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "stats" && <AdminStats />}
          {activeTab === "questions" && <AdminQuestions />}
          {activeTab === "leaderboard" && <AdminLeaderboard />}
          {activeTab === "attempts" && <AdminAttempts />}
        </motion.div>
      </div>
    </div>
  );
}