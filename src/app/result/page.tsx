"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LevelCard } from "@/components/LevelCard";
import { levels, maxScore, passingScore } from "@/data/levels";
import { useGame } from "@/context/GameContext";
import { scorePercentage } from "@/lib/gameEngine";
import { useRedirectGuard } from "@/hooks/useRedirectGuard";

export default function ResultPage() {
  const router = useRouter();
  const { hydrated, progress, resetGame } = useGame();
  useRedirectGuard();
  useEffect(() => { if (hydrated && !progress.gameFinished) router.replace(progress.playerName ? `/level/${progress.currentLevel}` : "/start"); }, [hydrated, progress, router]);
  if (!hydrated || !progress.gameFinished) return <LoadingScreen />;
  const percentage = scorePercentage(progress.currentScore);
  const passed = progress.currentScore >= passingScore;
  const stars = Math.max(1, Math.ceil((percentage / 100) * 5));
  return <main className="mx-auto min-h-[78vh] max-w-5xl px-4 py-8"><section className="glass rounded-[2rem] p-6 text-center sm:p-10"><p className="text-cyan-200">Result Page</p><h1 className="mt-2 text-4xl font-black">{passed ? "Pass!" : "Try Again"}, {progress.playerName}</h1><div className="mt-6 flex justify-center gap-2 text-yellow-200">{Array.from({ length: 5 }).map((_, index) => <Star key={index} fill={index < stars ? "currentColor" : "none"} />)}</div><p className="mt-6 text-6xl font-black text-cyan-200">{percentage}%</p><p className="mt-3 text-lg text-slate-200">Total Score: {progress.currentScore}/{maxScore} points. Surprise unlocks at {passingScore} points.</p><div className="mt-8 flex flex-wrap justify-center gap-3">{passed ? <AnimatedButton onClick={() => router.push("/surprise")}>Open Surprise</AnimatedButton> : <AnimatedButton onClick={() => { resetGame(); router.push("/start"); }}>Replay Game</AnimatedButton>}<button onClick={() => { resetGame(); router.push("/"); }} className="rounded-2xl border border-white/15 px-6 py-3 font-bold hover:bg-white/10">Reset Progress</button></div></section><div className="mt-6 grid gap-3 sm:grid-cols-5">{levels.map((level) => <LevelCard key={level.id} level={level} locked={false} done={progress.completedLevels.includes(level.id)} />)}</div></main>;
}
