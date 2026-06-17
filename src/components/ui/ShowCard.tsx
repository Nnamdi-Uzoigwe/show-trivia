"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Show } from "@/types";

const difficultyColor = {
  Easy: { bg: "rgba(34,197,94,0.12)", text: "#22c55e" },
  Medium: { bg: "rgba(244,162,40,0.12)", text: "#f4a228" },
  Hard: { bg: "rgba(229,56,59,0.12)", text: "#e5383b" },
};

export default function ShowCard({ show, index }: { show: Omit<Show, "_id">; index: number }) {
  const router = useRouter();
  const diff = difficultyColor[show.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={() => router.push(`/quiz/${show.slug}`)}
      className="cursor-pointer group relative overflow-hidden rounded-xl"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Banner Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={show.bannerImage}
          alt={show.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--bg-card) 0%, transparent 60%)",
          }}
        />
        {/* Difficulty badge */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: diff.bg, color: diff.text }}
        >
          {show.difficulty}
        </div>
      </div>

      {/* Content */}
      <div
        className="p-4 flex flex-col gap-2"
        style={{ background: "var(--bg-card)" }}
      >
        <h3
          className="font-clash font-semibold text-lg leading-tight group-hover:text-gradient transition-all duration-200"
          style={{ color: "var(--text-primary)" }}
        >
          {show.title}
        </h3>

        <p
          className="text-sm line-clamp-2"
          style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}
        >
          {show.description}
        </p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-1.5 flex-wrap">
            {show.genre.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {g}
              </span>
            ))}
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            {show.totalSeasons} seasons
          </span>
        </div>
      </div>

      {/* Hover CTA strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 py-2 flex items-center justify-center gap-2 text-sm font-bold"
        style={{ background: "var(--accent)", color: "#fff" }}
      >
        Take the Quiz →
      </motion.div>
    </motion.div>
  );
}