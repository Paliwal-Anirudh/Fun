"use client";
import { Music } from "lucide-react";
import { useState } from "react";
export function AudioPlayer({ src }: Readonly<{ src: string }>) { const [enabled, setEnabled] = useState(true); return <div className="rounded-3xl border border-white/15 bg-white/10 p-4"><button onClick={() => setEnabled((value) => !value)} className="mb-3 inline-flex items-center gap-2 font-bold"><Music size={18}/>{enabled ? "Music on" : "Music off"}</button>{enabled && <audio className="w-full" controls autoPlay loop src={src} />}</div>; }
