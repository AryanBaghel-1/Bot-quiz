type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="slide-up space-y-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 w-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
        <span>Journey</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 relative">
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d27a] to-[#d4af37] transition-all duration-700 shadow-[0_0_10px_rgba(212,175,55,0.6)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
