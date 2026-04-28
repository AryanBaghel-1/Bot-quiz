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
    <Card className="slide-up space-y-3">
      <h3 className="text-xl font-bold text-slate-900">Your Result</h3>
      <div className="grid gap-2 md:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 p-3 text-sm text-violet-900 border border-violet-200/40">
          <p className="text-xs uppercase tracking-wide text-violet-600 font-semibold">Score</p>
          <p className="mt-1 font-semibold text-lg">
            {score} / {total}
          </p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 p-3 text-sm text-fuchsia-900 border border-fuchsia-200/40">
          <p className="text-xs uppercase tracking-wide text-fuchsia-600 font-semibold">Percentage</p>
          <p className="mt-1 font-semibold text-lg">{percentage}%</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 p-3 text-sm text-cyan-900 border border-cyan-200/40">
          <p className="text-xs uppercase tracking-wide text-cyan-600 font-semibold">Time Taken</p>
          <p className="mt-1 font-semibold text-lg">{elapsedSeconds}s</p>
        </div>
      </div>
    </Card>
  );
}
