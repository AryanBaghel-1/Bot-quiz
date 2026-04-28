import type { QuizAnswers, QuizQuestion } from "@/types/quiz";

export function calculateScore(questions: QuizQuestion[], answers: QuizAnswers) {
  return questions.reduce((score, question) => {
    if (answers[question.id] === question.correctAnswer) {
      return score + 1;
    }
    return score;
  }, 0);
}

export function formatPercentage(score: number, total: number) {
  if (total === 0) {
    return 0;
  }
  return Math.round((score / total) * 100);
}

export function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
