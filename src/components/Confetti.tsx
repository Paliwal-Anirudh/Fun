"use client";
import confetti from "canvas-confetti";
import { useEffect } from "react";
export function Confetti() { useEffect(() => { const burst = () => confetti({ particleCount: 120, spread: 100, origin: { y: 0.65 } }); burst(); const id = window.setInterval(burst, 2600); return () => window.clearInterval(id); }, []); return null; }
