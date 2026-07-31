"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatedButton } from "@/components/AnimatedButton";
import { useGame } from "@/context/GameContext";

export default function StartPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { startGame } = useGame();
  function submit(event: FormEvent) { event.preventDefault(); const trimmed = name.trim(); if (!trimmed) { setError("Please enter your name to continue."); return; } startGame(trimmed); router.push("/level/1"); }
  return <main className="mx-auto flex min-h-[78vh] max-w-2xl items-center px-4"><form onSubmit={submit} className="glass w-full rounded-[2rem] p-6 sm:p-10"><p className="text-cyan-200">Name Page</p><h1 className="mt-2 text-4xl font-black">Who is playing?</h1><label className="mt-8 block text-sm font-bold" htmlFor="name">Player Name</label><input id="name" value={name} onChange={(event) => { setName(event.target.value); setError(""); }} className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none ring-cyan-300 focus:ring-2" placeholder="Your name" />{error && <p className="mt-3 text-rose-200">{error}</p>}<AnimatedButton className="mt-6 w-full" type="submit">Continue to Level 1</AnimatedButton></form></main>;
}
