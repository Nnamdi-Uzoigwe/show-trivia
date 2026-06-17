"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import LoadingBanner from "@/components/ui/LoadingBanner";
import NamePrompt from "@/components/ui/NamePrompt";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import ShowsGrid from "@/components/ui/ShowsGrid";

type Stage = "loading" | "name-prompt" | "home";

export default function HomePage() {
  const { user } = useUserStore();
  const [stage, setStage] = useState<Stage>("loading");

  useEffect(() => {
    if (stage === "home" && !user) setStage("name-prompt");
  }, [stage, user]);

  return (
    <>
      <AnimatePresence>
        {stage === "loading" && (
          <LoadingBanner onDone={() => setStage(user ? "home" : "name-prompt")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "name-prompt" && (
          <NamePrompt onComplete={() => setStage("home")} />
        )}
      </AnimatePresence>

      {stage === "home" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
          <main className="min-h-screen">
            <Hero userName={user?.name ?? "friend"} />
            <ShowsGrid />
          </main>
        </motion.div>
      )}
    </>
  );
}
