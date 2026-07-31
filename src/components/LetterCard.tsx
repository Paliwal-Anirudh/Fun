"use client";
import { motion } from "framer-motion";
export function LetterCard({ letter }: Readonly<{ letter: string }>) { return <motion.article initial={{ rotateX: 15, opacity: 0, y: 20 }} animate={{ rotateX: 0, opacity: 1, y: 0 }} className="whitespace-pre-line rounded-[2rem] bg-amber-50 p-6 font-serif leading-8 text-slate-900 shadow-2xl">{letter}</motion.article>; }
