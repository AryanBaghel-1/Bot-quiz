import { NextResponse } from "next/server";
import { isHistoryRelated } from "@/lib/historyGuard";
import type { ChatMessage } from "@/types/chat";

// const ETHICS_MESSAGE = "This is not in my ethics.";

type ChatPayload = {
  message: string;
  history?: ChatMessage[];
};

export async function POST(request: Request) {
  try {
    const { message, history = [] } = (await request.json()) as ChatPayload;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // if (!isHistoryRelated(message)) {
    //   return NextResponse.json({ reply: "This is not in my ethics." });
    // }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "API key is missing. Add GEMINI_API_KEY in your environment to enable the chatbot.",
        },
        { status: 200 },
      );
    }

    const systemInstruction =
      "You are a strict history-only tutor. Answer only history questions about world history, ancient civilizations, historical figures, events, and periods. If user asks anything non-history related, respond exactly: This is not in my ethics. Default to short, clear answers (2-4 sentences). Expand with deeper detail only when the user explicitly asks for more. Remember the conversation context and refer back to previous discussions if relevant.";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2000,
          },
          contents: [
            ...history.map((item) => ({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content }],
            })),
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { reply: "I could not process your request right now." },
        { status: 200 },
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I could not process your request right now.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "I could not process your request right now." },
      { status: 200 },
    );
  }
}


