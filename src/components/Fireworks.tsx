"use client";
import { motion } from "framer-motion";
export function Fireworks() { return <div className="pointer-events-none absolute inset-0">{["top-10 left-8", "top-24 right-12", "bottom-20 left-1/3"].map((pos) => <motion.div key={pos} className={`absolute ${pos} h-28 w-28 rounded-full border border-cyan-200/30`} animate={{ scale: [0.2, 1.4, 0.2], opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />)}</div>; }
