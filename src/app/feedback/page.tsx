"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { getQuizFeedback } from "@/lib/api";
import type { QuizSubmission } from "@/types/quiz";

type StoredSubmission = QuizSubmission & {
  details: Array<{
    id: number;
    question: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  elapsedSeconds: number;
  submittedAt: string;
};

const STORAGE_KEY = "history-quiz-submission";

export default function FeedbackPage() {
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submission, setSubmission] = useState<StoredSubmission | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setSubmission(null);
      setIsReady(true);
      return;
    }

    try {
      setSubmission(JSON.parse(raw) as StoredSubmission);
    } catch {
      setSubmission(null);
    }
    setIsReady(true);
  }, []);

  const handleAnalyze = async ({ rating, note }: { rating: number; note: string }) => {
    if (!submission) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await getQuizFeedback({
        submission,
        rating,
        note,
      });
      setAnalysis(response.analysis);
    } catch {
      setAnalysis("Unable to generate feedback right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl">
        <Sidebar />
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <h1 className="slide-up bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
            Quiz Feedback
          </h1>

          {!isReady ? (
            <Card className="slide-up space-y-3">
              <p className="text-slate-700">Loading your quiz submission...</p>
            </Card>
          ) : !submission ? (
            <Card className="slide-up space-y-3">
              <p className="text-slate-700">No quiz submission found. Complete the quiz first.</p>
              <Link href="/quiz">
                <Button>Go to Quiz</Button>
              </Link>
            </Card>
          ) : (
            <>
              <Card className="slide-up space-y-2">
                <p className="text-slate-700">
                  Score: <span className="font-semibold">{submission.score}</span> / {submission.total} ({submission.percentage}%)
                </p>
                <p className="text-sm text-slate-600">Time: {submission.elapsedSeconds}s</p>
              </Card>

              <FeedbackForm onSubmit={handleAnalyze} isLoading={isLoading} />

              <Card className="slide-up space-y-2">
                <h2 className="text-lg font-semibold text-slate-900">AI Analysis</h2>
                {isLoading ? (
                  <Loader label="Analyzing your quiz answers..." />
                ) : (
                  <p className="whitespace-pre-wrap text-sm text-slate-800">
                    {analysis || "Submit the form above to receive AI feedback."}
                  </p>
                )}
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
