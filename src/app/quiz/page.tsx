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

export default function QuizPage() {
  const router = useRouter();
  const [submittedAt, setSubmittedAt] = useState<number | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState(quizData.slice(0, Math.min(10, quizData.length)));
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setSelectedQuestions(pickRandomQuestions());
    setIsHydrated(true);
  }, []);

  const { answers, answeredCount, score, percentage, submitted, selectAnswer, submitQuiz } =
    useQuiz(selectedQuestions);

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
    <div className="app-shell min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl">
        <Sidebar />
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <h1 className="slide-up bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
            History MCQ Quiz
          </h1>

          <div
            className={`slide-up inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${
              remainingSeconds <= 15
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-violet-200 bg-violet-50 text-violet-700"
            }`}
          >
            <span>Time Left:</span>
            <span>{formatTime(remainingSeconds)}</span>
          </div>

          {!isHydrated ? (
            <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-white/80 to-purple-50/60 p-4 text-sm text-slate-600">
              Questions are displaying...
            </div>
          ) : (
            <>
          <ProgressBar current={answeredCount} total={selectedQuestions.length} />

          {selectedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedOption={answers[question.id]}
              onSelect={(optionIndex) => selectAnswer(question.id, optionIndex)}
              disabled={submitted || isTimeUp}
            />
          ))}

          {!submitted ? (
            <Button onClick={handleSubmit} disabled={!allAnswered || isTimeUp}>
              Submit Quiz
            </Button>
          ) : (
            <div className="space-y-3">
              <ResultBox
                score={score}
                total={selectedQuestions.length}
                percentage={percentage}
                elapsedSeconds={submittedAt ?? seconds}
              />
              <Button onClick={() => router.push("/feedback")}>Go to Feedback</Button>
            </div>
          )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
