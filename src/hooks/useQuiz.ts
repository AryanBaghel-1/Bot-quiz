"use client";

import { useMemo, useState } from "react";
import type { QuizAnswers, QuizQuestion, QuizSubmission } from "@/types/quiz";
import { calculateScore, formatPercentage } from "@/utils/helpers";

export function useQuiz(questions: QuizQuestion[]) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );

  const score = useMemo(
    () => calculateScore(questions, answers),
    [questions, answers],
  );

  const percentage = useMemo(
    () => formatPercentage(score, questions.length),
    [score, questions.length],
  );

  const selectAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  const submitQuiz = (): QuizSubmission => {
    setSubmitted(true);

    return {
      questions,
      answers,
      score,
      total: questions.length,
      percentage,
    };
  };

  return {
    answers,
    answeredCount,
    score,
    percentage,
    submitted,
    selectAnswer,
    submitQuiz,
  };
}
