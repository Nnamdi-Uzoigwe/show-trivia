"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-7xl">📺</span>
        <h1
          className="font-clash font-bold text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          404
        </h1>
        <p
          className="font-clash text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          This page doesn't exist — much like a good GOT ending.
        </p>
        <button
          className="btn-primary px-8 py-3 mt-2"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}