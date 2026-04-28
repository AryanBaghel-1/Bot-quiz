import { Card } from "@/components/ui/Card";

type ResultBoxProps = {
  score: number;
  total: number;
  percentage: number;
  elapsedSeconds: number;
};

export function ResultBox({
  score,
  total,
  percentage,
  elapsedSeconds,
}: ResultBoxProps) {
  return (
    <Card className="slide-up space-y-4 p-8 border-white/10 bg-black/50 backdrop-blur-xl rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 text-center mb-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
          Chronicles Completed
        </h3>
        <p className="text-[#9ca3af] mt-2">The Oracle has recorded your answers.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 relative z-10">
        <div className="rounded-xl bg-white/5 p-4 text-center border border-white/10 hover:border-[#d4af37]/40 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <p className="text-xs uppercase tracking-widest text-[#9ca3af] font-semibold mb-2">Knowledge Assessed</p>
          <p className="font-bold text-3xl text-[#f5d27a]">
            {score} <span className="text-xl text-[#d4af37]/70">/ {total}</span>
          </p>
        </div>
        
        <div className="rounded-xl bg-white/5 p-4 text-center border border-white/10 hover:border-[#d4af37]/40 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <p className="text-xs uppercase tracking-widest text-[#9ca3af] font-semibold mb-2">Wisdom Retained</p>
          <div className="flex items-baseline justify-center">
            <p className="font-bold text-3xl text-[#f5d27a]">{percentage}</p>
            <span className="text-xl text-[#d4af37]/70 ml-1">%</span>
          </div>
        </div>
        
        <div className="rounded-xl bg-white/5 p-4 text-center border border-white/10 hover:border-[#d4af37]/40 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <p className="text-xs uppercase tracking-widest text-[#9ca3af] font-semibold mb-2">Time Immersed</p>
          <div className="flex items-baseline justify-center">
            <p className="font-bold text-3xl text-[#f5d27a]">{elapsedSeconds}</p>
            <span className="text-xl text-[#d4af37]/70 ml-1">s</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
