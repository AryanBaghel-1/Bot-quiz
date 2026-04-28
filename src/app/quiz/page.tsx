"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { quizData } from "@/data/quizData";
import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ResultBox } from "@/components/quiz/ResultBox";

const STORAGE_KEY = "history-quiz-submission";
const QUIZ_DURATION_SECONDS = 90;

function pickRandomQuestions() {
  const shuffled = [...quizData];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, Math.min(10, shuffled.length));
}

// Simple floating particles for sub-pages
const Particles = () => {
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

export default function QuizPage() {
  const router = useRouter();
  const [submittedAt, setSubmittedAt] = useState<number | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState(quizData.slice(0, Math.min(10, quizData.length)));
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setSelectedQuestions(pickRandomQuestions());
    setIsHydrated(true);
  }, []);

  const { answers, answeredCount, score, percentage, submitted, selectAnswer, submitQuiz } = useQuiz(selectedQuestions);

  const { seconds } = useTimer(!submitted);
  const remainingSeconds = Math.max(0, QUIZ_DURATION_SECONDS - seconds);
  const isTimeUp = remainingSeconds === 0;

  const allAnswered = answeredCount === selectedQuestions.length;

  const details = useMemo(
    () =>
      selectedQuestions.map((question) => {
        const selected = answers[question.id];
        const isCorrect = selected === question.correctAnswer;
        return {
          id: question.id,
          question: question.question,
          selected: typeof selected === "number" ? question.options[selected] : "Not answered",
          correct: question.options[question.correctAnswer],
          isCorrect,
          explanation: question.explanation,
        };
      }),
    [answers, selectedQuestions],
  );

  const handleSubmit = () => {
    if (submitted) {
      return;
    }

    const submission = submitQuiz();
    const payload = {
      ...submission,
      elapsedSeconds: Math.min(seconds, QUIZ_DURATION_SECONDS),
      details,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSubmittedAt(Math.min(seconds, QUIZ_DURATION_SECONDS));
  };

  useEffect(() => {
    if (!isHydrated || submitted || !isTimeUp) {
      return;
    }
    handleSubmit();
  }, [isHydrated, submitted, isTimeUp]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="bg-[#000000] text-[#d1d5db] relative flex flex-col min-h-screen">
      <Particles />
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl flex-1 z-10 relative">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 space-y-8 p-4 md:p-8 w-full mt-10 md:mt-2 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 slide-up">
            <h1 className="bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-3xl font-bold text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              Chronicles Assessment
            </h1>

            <div
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                remainingSeconds <= 15
                  ? "border-red-900/50 bg-red-950/30 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                  : "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f5d27a] shadow-[0_0_10px_rgba(212,175,55,0.1)]"
              }`}
            >
              <span>Sands Remaining:</span>
              <span className="text-lg tabular-nums">{formatTime(remainingSeconds)}</span>
            </div>
          </div>

          {!isHydrated ? (
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-6 text-center text-[#9ca3af] animate-pulse">
              Unearthing ancient scrolls...
            </div>
          ) : (
            <div className="space-y-8">
              <ProgressBar current={answeredCount} total={selectedQuestions.length} />
              
              <div className="space-y-6">
                {selectedQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    selectedOption={answers[question.id]}
                    onSelect={(optionIndex) => selectAnswer(question.id, optionIndex)}
                    disabled={submitted || isTimeUp}
                  />
                ))}
              </div>

              {!submitted ? (
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSubmit} disabled={!allAnswered || isTimeUp} className="w-full md:w-auto px-10 py-6 text-lg tracking-wider font-semibold rounded-xl">
                    Seal Answers
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 pt-4 slide-up">
                  <ResultBox
                    score={score}
                    total={selectedQuestions.length}
                    percentage={percentage}
                    elapsedSeconds={submittedAt ?? seconds}
                  />
                  <div className="flex justify-center">
                    <Button onClick={() => router.push("/feedback")} className="px-8 py-5 rounded-xl">
                      Consult the Oracle (Feedback)
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
