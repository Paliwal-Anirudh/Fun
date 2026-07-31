export function ProgressBar({ current, total }: Readonly<{ current: number; total: number }>) {
  const width = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="h-3 rounded-full bg-white/10" aria-label={`Level progress ${current} of ${total}`}>
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400 transition-all" style={{ width: `${width}%` }} />
    </div>
  );
}
