type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="slide-up space-y-2 rounded-xl border border-violet-100/40 bg-gradient-to-r from-white/80 to-purple-50/60 p-3">
      <div className="flex items-center justify-between text-xs font-medium text-slate-600">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
