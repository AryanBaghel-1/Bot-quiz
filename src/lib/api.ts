import type { ChatMessage, ChatResponse } from "@/types/chat";
import type { FeedbackRequest, FeedbackResponse } from "@/types/feedback";

export async function askHistoryChatbot(
  message: string,
  history: ChatMessage[],
): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error("Unable to get chatbot response.");
  }

  return response.json();
}

export async function getQuizFeedback(
  payload: FeedbackRequest,
): Promise<FeedbackResponse> {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to analyze quiz answers.");
  }

  return response.json();
}
