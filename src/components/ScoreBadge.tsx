import { Trophy } from "lucide-react";
export function ScoreBadge({ score }: Readonly<{ score: number }>) { return <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200/30 bg-yellow-200/10 px-4 py-2 font-bold text-yellow-100"><Trophy size={18}/>{score} pts</div>; }
