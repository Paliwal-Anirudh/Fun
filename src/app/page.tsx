"use client";

import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import { GameShell } from "@/components/GameShell";
import { ProgressBar } from "@/components/ProgressBar";
import { initialGameState, isCorrect, scorePercent, type GameState } from "@/lib/game";
import { levels, passingPercent, storageKey } from "@/lib/levels";

type Screen = "landing" | "level" | "results" | "surprise";

function loadState(): GameState {
  if (typeof window === "undefined") return initialGameState;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return initialGameState;
  try {
    return { ...initialGameState, ...JSON.parse(saved) };
  } catch {
    return initialGameState;
  }
}

export default function Home() {
  const [state, setState] = useState<GameState>(initialGameState);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const screen: Screen = useMemo(() => {
    if (!state.playerName) return "landing";
    if (state.unlockedSurprise) return "surprise";
    if (state.completed) return "results";
    return "level";
  }, [state]);

  const level = levels[state.currentLevel] ?? levels[levels.length - 1];
  const percent = scorePercent(state.score);

  function startGame(formData: FormData) {
    const playerName = String(formData.get("playerName") ?? "").trim();
    if (!playerName) return;
    setState({ ...initialGameState, playerName });
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answer.trim()) return;
    const correct = isCorrect(level, answer);
    const nextScore = state.score + (correct ? 1 : 0);
    const completed = state.currentLevel === levels.length - 1;
    const nextState = {
      ...state,
      score: nextScore,
      currentLevel: completed ? state.currentLevel : state.currentLevel + 1,
      completed,
      unlockedSurprise: completed && scorePercent(nextScore) >= passingPercent,
    };
    setFeedback(correct ? "Correct! Advancing..." : `Not quite. ${level.hint}`);
    setAnswer("");
    window.setTimeout(() => {
      setFeedback(null);
      setState(nextState);
    }, 650);
  }

  function resetGame() {
    window.localStorage.removeItem(storageKey);
    setState(initialGameState);
    setAnswer("");
    setFeedback(null);
  }

  useEffect(() => {
    if (screen === "surprise") {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.62 } });
    }
  }, [screen]);

  return (
    <GameShell>
      {screen === "landing" && (
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">Quest of Five</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Five levels. One hidden celebration.</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-200">Enter your name, answer each level in sequence, and score at least {passingPercent}% to unlock the surprise room.</p>
          </div>
          <form action={startGame} className="rounded-3xl border border-white/15 bg-slate-950/50 p-6">
            <label className="text-sm font-semibold text-slate-200" htmlFor="playerName">Player name</label>
            <input id="playerName" name="playerName" required minLength={2} className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none ring-cyan-300 focus:ring-2" placeholder="Ada Lovelace" />
            <button className="mt-5 w-full rounded-2xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200">Start adventure</button>
          </form>
        </div>
      )}

      {screen === "level" && (
        <div className="p-6 sm:p-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-cyan-200">Player: {state.playerName}</p><h1 className="text-3xl font-black">Level {level.id}: {level.title}</h1></div>
            <p className="rounded-full bg-white/10 px-4 py-2 font-bold">Score {state.score}/{levels.length}</p>
          </div>
          <ProgressBar current={state.currentLevel + 1} total={levels.length} />
          <form onSubmit={submitAnswer} className="mt-8 rounded-3xl bg-slate-950/45 p-6">
            <fieldset disabled={Boolean(feedback)}>
              <legend className="mb-5 text-2xl font-bold">{level.prompt}</legend>
              {level.kind === "multiple-choice" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {level.options?.map((option) => (
                    <label key={option} className="cursor-pointer rounded-2xl border border-white/15 bg-white/10 p-4 hover:bg-white/15">
                      <input className="mr-3" type="radio" name="answer" value={option} checked={answer === option} onChange={(event) => setAnswer(event.target.value)} />{option}
                    </label>
                  ))}
                </div>
              ) : (
                <input value={answer} onChange={(event) => setAnswer(event.target.value)} className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none ring-fuchsia-300 focus:ring-2" placeholder="Type your answer" />
              )}
              <button className="mt-6 rounded-2xl bg-fuchsia-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-fuchsia-200">Submit answer</button>
            </fieldset>
            {feedback && <p className="mt-4 font-semibold text-cyan-100">{feedback}</p>}
          </form>
        </div>
      )}

      {screen === "results" && (
        <div className="p-6 text-center sm:p-12">
          <h1 className="text-4xl font-black">Results for {state.playerName}</h1>
          <p className="mt-4 text-6xl font-black text-cyan-200">{percent}%</p>
          <p className="mt-4 text-slate-200">You scored {state.score} out of {levels.length}. A score of {passingPercent}% unlocks the surprise page.</p>
          <button onClick={resetGame} className="mt-8 rounded-2xl bg-white px-6 py-3 font-bold text-slate-950">Try again</button>
        </div>
      )}

      {screen === "surprise" && (
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-cyan-200">Unlocked with {percent}%</p>
            <h1 className="text-4xl font-black">Surprise, {state.playerName}!</h1>
            <div className="mt-6 rounded-3xl bg-white p-6 font-serif text-slate-900 shadow-xl">
              <p className="text-xl font-bold">Dear {state.playerName},</p>
              <p className="mt-4 leading-7">You crossed every checkpoint with curiosity and courage. May this little celebration remind you that persistence turns ordinary questions into memorable victories.</p>
              <p className="mt-4 text-right font-bold">With admiration,<br />The Quest of Five</p>
            </div>
            <audio className="mt-6 w-full" controls autoPlay loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
            <button onClick={resetGame} className="mt-6 rounded-2xl bg-cyan-300 px-6 py-3 font-bold text-slate-950">Play again</button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
            <iframe className="aspect-video w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Surprise celebration video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}
    </GameShell>
  );
}
