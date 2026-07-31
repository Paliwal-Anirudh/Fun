"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { canAccessLevel } from "@/lib/gameEngine";
import { useGame } from "@/context/GameContext";

export function useRedirectGuard(levelId?: number) {
  const router = useRouter();
  const { hydrated, progress } = useGame();
  useEffect(() => {
    if (!hydrated) return;
    if (!progress.playerName) router.replace("/start");
    else if (progress.gameFinished && !levelId) router.replace("/result");
    else if (levelId && !canAccessLevel(progress, levelId)) router.replace(`/level/${progress.currentLevel}`);
  }, [hydrated, levelId, progress, router]);
}
