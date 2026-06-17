import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface UserStore {
  user: User | null;
  fingerprint: string | null;
  setUser: (user: User) => void;
  setFingerprint: (fp: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      fingerprint: null,
      setUser: (user) => set({ user }),
      setFingerprint: (fp) => set({ fingerprint: fp }),
      clearUser: () => set({ user: null, fingerprint: null }),
    }),
    { name: "showTrivia-user" }
  )
);