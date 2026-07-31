"use client";

import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { initialProgress, loadProgress, resetGame as resetStoredGame, saveProgress } from "@/lib/gameEngine";
import type { GameProgress } from "@/types/game";

type GameContextValue = { progress: GameProgress; hydrated: boolean; setProgress: Dispatch<SetStateAction<GameProgress>>; startGame: (name: string) => void; resetGame: () => void };

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setProgress(loadProgress()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) saveProgress(progress); }, [hydrated, progress]);

  const value = useMemo(() => ({
    progress,
    hydrated,
    setProgress,
    startGame: (name: string) => setProgress({ ...initialProgress, playerName: name.trim() }),
    resetGame: () => setProgress(resetStoredGame()),
  }), [hydrated, progress]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
}
