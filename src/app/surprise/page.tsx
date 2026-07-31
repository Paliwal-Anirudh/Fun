"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { surprise } from "@/data/surprise";
import { useGame } from "@/context/GameContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Confetti } from "@/components/Confetti";
import { Celebration } from "@/components/Celebration";
import { Fireworks } from "@/components/Fireworks";
import { LetterCard } from "@/components/LetterCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function SurprisePage() {
  const router = useRouter();
  const { hydrated, progress } = useGame();
  useEffect(() => { if (hydrated && !progress.surpriseUnlocked) router.replace(progress.playerName ? "/result" : "/start"); }, [hydrated, progress, router]);
  if (!hydrated) return <LoadingScreen />;
  const letter = surprise.letter.replaceAll("{name}", progress.playerName);
  return <main className="relative mx-auto min-h-[78vh] max-w-6xl overflow-hidden px-4 py-8"><Confetti /><Celebration /><Fireworks /><section className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="inline-flex items-center gap-2 text-cyan-200"><Heart className="animate-pulse" fill="currentColor" /> Thank You</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">{surprise.title}</h1><p className="mt-4 text-lg text-slate-200">{surprise.subtitle}</p><p className="mt-2 text-slate-300">{surprise.thankYou}</p><div className="mt-6"><LetterCard letter={letter} /></div><div className="mt-5"><AudioPlayer src={surprise.audio} /></div></div><div className="self-center"><VideoPlayer src={surprise.video} /></div></section></main>;
}
