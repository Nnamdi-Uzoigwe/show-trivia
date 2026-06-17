"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Lights. Camera. Trivia.",
  "How well do you know your shows?",
  "The ultimate TV quiz awaits.",
];

export default function LoadingBanner({ onDone }: { onDone: () => void }) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => {
        if (i < phrases.length - 1) return i + 1;
        clearInterval(interval);
        setTimeout(onDone, 900);
        return i;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <span
          className="text-4xl font-clash font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Show
        </span>
        <span
          className="text-4xl font-clash font-bold px-2 py-0.5 rounded"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Trivia
        </span>
      </motion.div>

      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            style={{ color: "var(--text-secondary)", fontSize: "15px" }}
          >
            {phrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5 mt-2">
        {phrases.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === phraseIndex ? 20 : 6, opacity: i === phraseIndex ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}