"use client";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

export function AnimatedButton({ className = "", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={`rounded-2xl bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-6 py-3 font-black text-slate-950 shadow-lg shadow-fuchsia-950/30 transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>{children}</motion.button>;
}
