"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { levels } from "@/data/levels";
import { useGame } from "@/context/GameContext";
import { checkAnswer, calculateScore, unlockNextLevel } from "@/lib/gameEngine";
import { useRedirectGuard } from "@/hooks/useRedirectGuard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { ScoreBadge } from "@/components/ScoreBadge";

export default function LevelPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const level = useMemo(() => levels.find((item) => item.id === id), [id]);
  const { hydrated, progress, setProgress } = useGame();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitted-error">("idle");
  useRedirectGuard(id);
  if (!Number.isInteger(id) || !level) return <main className="mx-auto min-h-[78vh] max-w-3xl px-4 py-8"><section className="glass rounded-[2rem] p-8 text-center"><h1 className="text-3xl font-black">Level not found</h1><p className="mt-3 text-slate-200">Please return to your current unlocked level.</p></section></main>;
  if (!hydrated) return <LoadingScreen />;

  function submit() {
    if (!answer.trim()) { setFeedback("Please answer before submitting."); setStatus("error"); return; }
    const correct = checkAnswer(level, answer);
    const nextScore = calculateScore(progress, level, correct);
    const nextProgress = unlockNextLevel({ ...progress, currentScore: nextScore }, level.id);
    if (!correct) { setProgress(nextProgress); setFeedback(`${level.wrongMessage} No points this round, but the next level is unlocked.`); setStatus("submitted-error"); return; }
    setProgress(nextProgress);
    setFeedback(level.successMessage);
    setStatus("success");
  }

  function next() { router.push(level.id === levels.length ? "/result" : `/level/${level.id + 1}`); }

  return <main className="mx-auto min-h-[78vh] max-w-5xl px-4 py-8"><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-cyan-200">Level {level.id} of {levels.length}</p><h2 className="text-2xl font-black">Welcome, {progress.playerName}</h2></div><ScoreBadge score={progress.currentScore} /></div><ProgressBar label="Quest progress" value={(progress.completedLevels.length / levels.length) * 100} /><div className="mt-8"><QuestionCard level={level} answer={answer} feedback={feedback} status={status} onAnswer={(value) => { setAnswer(value); setFeedback(""); setStatus("idle"); }} onSubmit={submit} onNext={next} /></div>{status === "success" && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 rounded-full bg-emerald-300 p-4 text-slate-950 shadow-2xl"><CheckCircle2 /></motion.div>}</main>;
}
