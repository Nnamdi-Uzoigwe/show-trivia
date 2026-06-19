// "use client";

// import { useUserStore } from "@/store/userStore";

// export default function Navbar() {
//   const { user } = useUserStore();

//   return (
//     <nav
//       className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
//       style={{
//         background: "rgba(10,10,15,0.8)",
//         backdropFilter: "blur(12px)",
//         borderBottom: "1px solid var(--border)",
//       }}
//     >
//       <div className="flex items-center gap-2">
//         <span
//           className="text-xl font-clash font-bold"
//           style={{ color: "var(--text-primary)" }}
//         >
//           Show
//         </span>
//         <span
//           className="text-xl font-clash font-bold px-1.5 py-0.5 rounded"
//           style={{ background: "var(--accent)", color: "#fff" }}
//         >
//           Trivia
//         </span>
//       </div>

//       {user && (
//         <div
//           className="flex items-center gap-2 px-3 py-1.5 rounded-md"
//           style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
//         >
//           <div
//             className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
//             style={{ background: "var(--accent)", color: "#fff" }}
//           >
//             {user.name[0].toUpperCase()}
//           </div>
//           <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
//             {user.name}
//           </span>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";

export default function Navbar() {
  const { user, setUser } = useUserStore();
  const [streak, setStreak] = useState(0);

 useEffect(() => {
  if (!user) return;

  const fingerprint = useUserStore.getState().fingerprint;
  if (!fingerprint) return;

  fetch(`/api/users/me?fingerprint=${fingerprint}`)
    .then((r) => r.json())
    .then((data) => {
      if (data.user) {
        setUser(data.user);
        setStreak(data.user.streak ?? 0);
      }
    });
}, [user?._id]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(10,10,15,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="text-xl font-clash font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Show
        </span>
        <span
          className="text-xl font-clash font-bold px-1.5 py-0.5 rounded"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Trivia
        </span>
      </div>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-3">

          {/* Streak badge */}
          {streak > 0 && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md"
              style={{
                background: "rgba(244,162,40,0.1)",
                border: "1px solid rgba(244,162,40,0.2)",
              }}
            >
              <span style={{ fontSize: "14px" }}>🔥</span>
              <span
                className="font-clash font-bold text-sm"
                style={{ color: "var(--gold)" }}
              >
                {streak}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                day streak
              </span>
            </div>
          )}

          {/* User chip */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {user.name[0].toUpperCase()}
            </div>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              {user.name}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}