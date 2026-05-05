import { NextResponse } from "next/server";

type SubmissionDetail = {
  id: number;
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  explanation: string;
};

type FeedbackPayload = {
  submission: {
    score: number;
    total: number;
    percentage: number;
    details?: SubmissionDetail[];
  };
  rating: number;
  note?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as FeedbackPayload;

    if (!payload?.submission) {
      return NextResponse.json({ error: "Submission is required." }, { status: 400 });
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

    if (!apiKey) {
      const fallback = `You scored ${payload.submission.score}/${payload.submission.total} (${payload.submission.percentage}%). Add GEMINI_API_KEY to enable detailed AI feedback.`;
      return NextResponse.json({ analysis: fallback });
    }

    const details = payload.submission.details
      ?.map(
        (item) =>
          `Q${item.id}: ${item.question}\nSelected: ${item.selected}\nCorrect: ${item.correct}\nCorrectness: ${item.isCorrect ? "Correct" : "Incorrect"}\nWhy: ${item.explanation}`,
      )
      .join("\n\n");

    const prompt = [
      `User score: ${payload.submission.score}/${payload.submission.total} (${payload.submission.percentage}%)`,
      `Self rating: ${payload.rating}/5`,
      `User note: ${payload.note || "None"}`,
      "Use ALL context above in your response.",
      "Give feedback in this exact order:",
      "1) Short appreciation (1-2 sentences).",
      "2) Incorrect answers only: list each wrong question with the correct answer and one-sentence fix.",
      "3) Focus areas: summarize the topics/patterns the user should improve.",
      "4) Strengths: briefly mention what they did well.",
      details || "No details provided",
    ].join("\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2000,
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are a history quiz coach. Analyze the quiz and give actionable feedback. " +
                    "Be precise about what was wrong and what to study. Always appreciate the user. " +
                    "You must incorporate every detail provided in the prompt (including the user note and each question).\n\n" +
                    prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      let reason = "Unknown Gemini API error";
      try {
        const errorData = (await response.json()) as {
          error?: { message?: string };
        };
        reason = errorData.error?.message || reason;
      } catch {
        reason = `${response.status} ${response.statusText}`;
      }

      return NextResponse.json({
        analysis: `Unable to generate full AI feedback at the moment. ${reason}`,
      });
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const analysis =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("\n")
        .trim() || "Unable to generate feedback at the moment.";

    return NextResponse.json({ analysis });
  } catch {
    return NextResponse.json({
      analysis: "Unable to generate feedback at the moment.",
    });
  }
}


