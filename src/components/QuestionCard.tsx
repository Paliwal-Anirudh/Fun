"use client";
import { motion } from "framer-motion";
import type { Level } from "@/types/game";
import { AnswerInput } from "./AnswerInput";
import { AnimatedButton } from "./AnimatedButton";

export function QuestionCard({ level, answer, feedback, status, onAnswer, onSubmit, onNext }: Readonly<{ level: Level; answer: string; feedback: string; status: "idle" | "success" | "error" | "submitted-error"; onAnswer: (value: string) => void; onSubmit: () => void; onNext: () => void }>) {
  return <motion.section animate={status === "error" || status === "submitted-error" ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }} className="rounded-[2rem] border border-white/15 bg-slate-950/45 p-5 shadow-2xl sm:p-8"><p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">{level.type.replace("-", " ")}</p><h1 className="mt-2 text-3xl font-black sm:text-5xl">{level.title}</h1><p className="mt-5 text-lg text-slate-100">{level.question}</p>{level.image && <img src={level.image} alt="Level clue" className="mt-5 rounded-2xl" />}<div className="mt-7"><AnswerInput level={level} value={answer} onChange={onAnswer} /></div>{feedback && <p className={`mt-5 rounded-2xl p-4 font-semibold ${status === "success" ? "bg-emerald-300/15 text-emerald-100" : "bg-rose-300/15 text-rose-100"}`}>{feedback}</p>}<div className="mt-6 flex flex-wrap gap-3">{status === "success" || status === "submitted-error" ? <AnimatedButton onClick={onNext}>Next</AnimatedButton> : <AnimatedButton onClick={onSubmit} disabled={!answer.trim()}>Submit answer</AnimatedButton>}</div></motion.section>;
}
