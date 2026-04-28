export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  era: string;
};

export type QuizAnswers = Record<number, number>;

export type QuizSubmission = {
  questions: QuizQuestion[];
  answers: QuizAnswers;
  score: number;
  total: number;
  percentage: number;
};
