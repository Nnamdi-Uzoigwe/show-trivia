"use client";

import { useEffect, useState } from "react";
import { SHOWS } from "@/lib/showsData";

const emptyForm = {
  showSlug: "prison-break",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
  explanation: "",
  difficulty: "Medium",
};

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("prison-break");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...emptyForm });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadQuestions(slug: string) {
    setLoading(true);
    const res = await fetch(`/api/admin/questions?slug=${slug}`);
    const data = await res.json();
    setQuestions(data.questions || []);
    setLoading(false);
  }

  useEffect(() => { loadQuestions(selectedSlug); }, [selectedSlug]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this question?")) return;
    await fetch(`/api/admin/questions?id=${id}`, { method: "DELETE" });
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  }

  async function handleSave() {
    if (!form.question || form.options.some((o) => !o)) {
      alert("Fill in all fields"); return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, showSlug: selectedSlug }),
    });
    const data = await res.json();
    if (res.ok) {
      setQuestions((prev) => [data.question, ...prev]);
      setForm({ ...emptyForm, showSlug: selectedSlug });
      setShowForm(false);
    }
    setSaving(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
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
          <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            {questions.length} questions
          </span>
        </div>
        <button
          className="btn-primary px-4 py-2 text-sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Question"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-5 flex flex-col gap-4" style={{ borderColor: "rgba(229,56,59,0.2)" }}>
          <h3 className="font-clash font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
            New Question
          </h3>

          <textarea
            placeholder="Question text..."
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-md text-sm outline-none resize-none"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-satoshi)",
            }}
          />

          <div className="grid grid-cols-2 gap-3">
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: form.correctAnswer === i ? "var(--accent)" : "var(--bg-secondary)",
                    color: form.correctAnswer === i ? "#fff" : "var(--text-muted)",
                    cursor: "pointer",
                  }}
                  onClick={() => setForm({ ...form, correctAnswer: i })}
                >
                  {["A", "B", "C", "D"][i]}
                </span>
                <input
                  placeholder={`Option ${["A", "B", "C", "D"][i]}`}
                  value={opt}
                  onChange={(e) => {
                    const opts = [...form.options];
                    opts[i] = e.target.value;
                    setForm({ ...form, options: opts });
                  }}
                  className="flex-1 px-3 py-2 rounded-md text-sm outline-none"
                  style={{
                    background: "var(--bg-secondary)",
                    border: `1px solid ${form.correctAnswer === i ? "var(--accent)" : "var(--border)"}`,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-satoshi)",
                  }}
                />
              </div>
            ))}
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            Click a letter to set the correct answer
          </p>

          <div className="flex gap-3">
            <input
              placeholder="Explanation (optional)"
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              className="flex-1 px-3 py-2 rounded-md text-sm outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-satoshi)",
              }}
            />
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="px-3 py-2 rounded-md text-sm outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-satoshi)",
              }}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button className="btn-primary py-2.5 text-sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Question"}
          </button>
        </div>
      )}

      {/* Questions list */}
      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {questions.map((q, i) => (
            <div key={q._id} className="card p-4 flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {i + 1}. {q.question}
                </p>
                <div className="flex gap-2 flex-wrap mt-1">
                  {q.options.map((opt: string, j: number) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: j === q.correctAnswer ? "rgba(34,197,94,0.12)" : "var(--bg-secondary)",
                        color: j === q.correctAnswer ? "#22c55e" : "var(--text-muted)",
                        border: `1px solid ${j === q.correctAnswer ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                      }}
                    >
                      {["A", "B", "C", "D"][j]}: {opt}
                    </span>
                  ))}
                </div>
                <span
                  className="text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {q.difficulty}
                </span>
              </div>
              <button
                onClick={() => handleDelete(q._id)}
                className="text-xs px-3 py-1.5 rounded-md shrink-0"
                style={{
                  background: "rgba(229,56,59,0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(229,56,59,0.2)",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
          {questions.length === 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              No questions found for this show.
            </p>
          )}
        </div>
      )}
    </div>
  );
}