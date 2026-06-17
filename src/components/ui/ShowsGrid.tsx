"use client";

import { SHOWS } from "@/lib/showsData";
import ShowCard from "./ShowCard";

export default function ShowsGrid() {
  return (
    <section className="px-6 pb-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            Choose Your Show
          </p>
          <h2
            className="font-clash font-bold text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            All Quizzes
          </h2>
        </div>
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          {SHOWS.length} shows available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SHOWS.map((show, i) => (
          <ShowCard key={show.slug} show={show} index={i} />
        ))}
      </div>
    </section>
  );
}