"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { QuizAttemptSummary, QuizSubmission } from "@/types/quiz";

const ATTEMPTS_KEY = "history-quiz-attempts";
const LATEST_SUBMISSION_KEY = "history-quiz-submission";

type StoredLatestSubmission = QuizSubmission & {
  elapsedSeconds: number;
  submittedAt: string;
};

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function QuizHistory() {
  const [attempts, setAttempts] = useState<QuizAttemptSummary[] | null>(null);

  useEffect(() => {
    const storedAttempts = safeParseJson<QuizAttemptSummary[]>(localStorage.getItem(ATTEMPTS_KEY));
    if (storedAttempts && Array.isArray(storedAttempts) && storedAttempts.length > 0) {
      setAttempts(storedAttempts);
      return;
    }

    // Backward-compat: migrate single latest submission into attempts list once.
    const latest = safeParseJson<StoredLatestSubmission>(localStorage.getItem(LATEST_SUBMISSION_KEY));
    if (!latest) {
      setAttempts([]);
      return;
    }

    const migratedAttempt: QuizAttemptSummary = {
      id: `${Date.now()}-migrated`,
      submittedAt: latest.submittedAt,
      elapsedSeconds: latest.elapsedSeconds,
      score: latest.score,
      total: latest.total,
      percentage: latest.percentage,
      correctCount: latest.score,
      wrongCount: Math.max(0, latest.total - latest.score),
    };

    const nextAttempts = [migratedAttempt];
    try {
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(nextAttempts));
    } catch {
      // ignore
    }
    setAttempts(nextAttempts);
  }, []);

  if (attempts === null) {
    return (
      <Card className="slide-up border-white/10 bg-black/40 backdrop-blur-md animate-pulse">
        <p className="text-[#9ca3af]">Reviewing your chronicles...</p>
      </Card>
    );
  }

  if (attempts.length === 0) {
    return (
      <Card className="slide-up border-white/10 bg-black/40 backdrop-blur-md space-y-4">
        <p className="text-[#d1d5db]">No quiz marks recorded yet.</p>
        <Link href="/quiz">
          <Button>Take Quiz</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {attempts.map((attempt) => (
          <Card
            key={attempt.id}
            className="slide-up border-white/10 bg-black/40 backdrop-blur-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-[#9ca3af]">Submitted</p>
                <p className="text-[#d1d5db] font-semibold">{formatWhen(attempt.submittedAt)}</p>
                <p className="text-sm text-[#9ca3af]">Time: <span className="text-[#d1d5db]">{attempt.elapsedSeconds}s</span></p>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#9ca3af]">Score</p>
                  <p className="text-[#f5d27a] font-bold text-xl">{attempt.score}<span className="text-[#d4af37]/70">/{attempt.total}</span></p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#9ca3af]">Correct</p>
                  <p className="text-[#f5d27a] font-bold text-xl">{attempt.correctCount}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#9ca3af]">Wrong</p>
                  <p className="text-red-400 font-bold text-xl">{attempt.wrongCount}</p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-xs uppercase tracking-widest text-[#9ca3af]">Percentage</p>
                <p className="text-2xl font-bold text-[#d4af37]">{attempt.percentage}%</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
