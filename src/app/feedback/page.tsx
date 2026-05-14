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

// Simple floating particles for sub-pages
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 fixed">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#d4af37] opacity-20 particle-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 15 + 15}s`,
          }}
        />
      ))}
    </div>
  );
};

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
    if (!submission) return;

    setIsLoading(true);
    try {
      const response = await getQuizFeedback({
        submission,
        rating,
        note,
      });
      setAnalysis(response.analysis);
    } catch {
      setAnalysis("The Oracle's connection severed temporarily. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#000000] text-[#d1d5db] relative flex flex-col min-h-screen">
      <Particles />
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl flex-1 z-10 relative">
        <Sidebar />
        <main className="flex-1 space-y-6 p-4 md:p-8 w-full mt-10 md:mt-2 max-w-4xl mx-auto">
          <h1 className="slide-up bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-3xl font-bold text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] tracking-wide">
            Oracle's Evaluation
          </h1>

          {!isReady ? (
            <Card className="slide-up border-white/10 bg-black/40 backdrop-blur-md animate-pulse">
              <p className="text-[#9ca3af]">Deciphering the ancient scrolls...</p>
            </Card>
          ) : !submission ? (
            <Card className="slide-up border-white/10 bg-black/40 backdrop-blur-md space-y-4">
              <p className="text-[#d1d5db]">No chronological journey recorded. Complete a quiz to seek guidance.</p>
              <Link href="/quiz">
                <Button>Embark on Quiz</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="slide-up border-white/10 bg-black/40 backdrop-blur-md space-y-3">
                <div className="flex items-center gap-4">
                  <p className="text-[#9ca3af] uppercase tracking-wider text-sm">Chronicles Score:</p>
                  <p className="text-xl">
                    <span className="font-bold text-[#f5d27a] text-2xl">{submission.score}</span> 
                    <span className="text-[#d4af37]/70"> / {submission.total} </span> 
                    <span className="text-[#d4af37] ml-2">({submission.percentage}%)</span>
                  </p>
                </div>
                <p className="text-sm text-[#9ca3af]">Time Elapsed: <span className="text-[#d1d5db]">{submission.elapsedSeconds}s</span></p>
              </Card>

              <FeedbackForm onSubmit={handleAnalyze} isLoading={isLoading} />

              {(isLoading || analysis) && (
                <Card className="slide-up border-white/10 bg-black/40 backdrop-blur-md space-y-4 mt-6 shadow-[0_0_25px_rgba(212,175,55,0.1)]">
                  <h2 className="text-xl font-bold text-[#f5d27a] border-b border-white/10 pb-3">The Oracle's Verdict</h2>
                  {isLoading ? (
                    <div className="flex items-center gap-3 pt-2">
                       <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-[#f5d27a] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                       <span className="w-2 h-2 bg-[#e6c065] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                       <span className="text-sm text-[#9ca3af] ml-2 tracking-widest uppercase">Channeling Wisdom...</span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#d1d5db] pt-2 font-light">
                      {analysis}
                    </p>
                  )}
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
