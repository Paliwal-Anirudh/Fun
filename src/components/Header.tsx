"use client";
import Link from "next/link";
import { RotateCcw, Sparkles } from "lucide-react";
import { useGame } from "@/context/GameContext";

export function Header() {
  const { progress, resetGame } = useGame();
  return <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6"><Link href="/" className="flex items-center gap-2 font-black"><Sparkles className="text-cyan-200" /> Fun</Link><div className="flex items-center gap-3 text-sm text-slate-200">{progress.playerName && <span>{progress.playerName} · {progress.currentScore} pts</span>}<button onClick={resetGame} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-2 hover:bg-white/10"><RotateCcw size={16}/> Reset</button></div></header>;
}
