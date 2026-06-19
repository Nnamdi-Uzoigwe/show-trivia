"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) { setError("Fill in both fields"); return; }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-2">
          <span className="text-2xl font-clash font-bold" style={{ color: "var(--text-primary)" }}>
            Show
          </span>
          <span
            className="text-2xl font-clash font-bold px-2 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Trivia
          </span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full ml-1"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            Admin
          </span>
        </div>

        <div
          className="card p-6 flex flex-col gap-4"
          style={{ borderColor: "rgba(229,56,59,0.15)" }}
        >
          <h1
            className="font-clash font-bold text-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            Admin Login
          </h1>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-md text-base outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-satoshi)",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-md text-base outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-satoshi)",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "var(--accent)", fontSize: "13px" }}>{error}</p>
          )}

          <button
            className="btn-primary w-full py-3"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}