"use client";
import type { Level } from "@/types/game";

export function AnswerInput({ level, value, onChange }: Readonly<{ level: Level; value: string; onChange: (value: string) => void }>) {
  if (level.type === "multiple-choice") return <div className="grid gap-3 sm:grid-cols-2">{level.options?.map((option) => <label key={option} className="cursor-pointer rounded-2xl border border-white/15 bg-white/10 p-4 hover:bg-white/15"><input className="mr-3" type="radio" name="answer" checked={value === option} onChange={() => onChange(option)} />{option}</label>)}</div>;
  if (level.type === "image-choice") return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{level.imageOptions?.map((option) => <button type="button" key={option.value} onClick={() => onChange(option.value)} className={`rounded-3xl border p-5 text-center transition ${value === option.value ? "border-cyan-200 bg-cyan-200/20" : "border-white/15 bg-white/10 hover:bg-white/15"}`}><span className="block text-5xl">{option.emoji}</span><span className="mt-2 block font-bold">{option.label}</span></button>)}</div>;
  return <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none ring-cyan-300 focus:ring-2" placeholder={level.type === "riddle" ? "Solve the riddle" : "Type your answer"} />;
}
