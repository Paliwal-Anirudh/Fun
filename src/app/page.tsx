"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export default function HomePage() {
  return <main className="mx-auto grid min-h-[78vh] max-w-6xl place-items-center px-4"><motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass relative overflow-hidden rounded-[2.5rem] p-8 text-center sm:p-14"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.22),transparent_35rem)]"/><div className="relative"><Sparkles className="mx-auto mb-4 text-cyan-200" size={44}/><p className="text-sm font-black uppercase tracking-[0.4em] text-cyan-200">Interactive Quest</p><h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">Fun</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">Enter a beautiful glassmorphism adventure, solve five unique levels, earn points, and unlock a personalized celebration.</p><Link href="/start" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-7 py-4 font-black text-slate-950 shadow-xl transition hover:scale-105"><Play size={20}/> Start</Link></div></motion.section></main>;
}
