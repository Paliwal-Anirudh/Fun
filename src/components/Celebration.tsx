"use client";
import { motion } from "framer-motion";
export function Celebration() { return <div className="pointer-events-none fixed inset-0 overflow-hidden">{Array.from({ length: 18 }).map((_, i) => <motion.span key={i} initial={{ y: "110vh", opacity: 0 }} animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }} transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.25 }} className="absolute text-2xl" style={{ left: `${(i * 37) % 100}%` }}>💖</motion.span>)}</div>; }
