import type { QuizSubmission } from "@/types/quiz";

export type FeedbackRequest = {
  submission: QuizSubmission;
  rating: number;
  note?: string;
};

export type FeedbackResponse = {
  analysis: string;
};
