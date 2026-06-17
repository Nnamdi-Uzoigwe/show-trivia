"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import { getFingerprint } from "@/lib/fingerprint";

export default function NamePrompt({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setFingerprint } = useUserStore();

  async function handleSubmit() {
    if (!name.trim() || name.trim().length < 2) {
      setError("Enter at least 2 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fp = await getFingerprint();
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), fingerprint: fp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setUser(data.user);
      setFingerprint(fp);
      onComplete();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(10,10,15,0.96)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="card w-full max-w-md p-8 flex flex-col gap-6"
        style={{ border: "1px solid rgba(229,56,59,0.2)" }}
      >
        <div className="flex flex-col gap-2">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Welcome to ShowTrivia
          </span>
          <h2
            className="text-3xl font-clash"
            style={{ color: "var(--text-primary)" }}
          >
            What should we call you?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
            Your name will appear on the leaderboard when you top the charts.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            maxLength={20}
            className="w-full px-4 py-3 rounded-md text-base outline-none transition-all duration-200"
            style={{
              background: "var(--bg-secondary)",
              border: error
                ? "1px solid var(--accent)"
                : "1px solid var(--border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-satoshi)",
            }}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "var(--accent)", fontSize: "13px" }}
            >
              {error}
            </motion.p>
          )}
        </div>

        <button
          className="btn-primary w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Let's Go →"}
        </button>
      </motion.div>
    </motion.div>
  );
}


