export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{
          borderColor: "var(--border)",
          borderTopColor: "var(--accent)",
        }}
      />
    </div>
  );
}