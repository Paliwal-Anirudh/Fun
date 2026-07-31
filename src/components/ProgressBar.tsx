type ProgressBarProps = {
  value: number;
  label: string;
};

export function ProgressBar({ value, label }: Readonly<ProgressBarProps>) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span>{Math.round(safeValue)}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 transition-all"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
