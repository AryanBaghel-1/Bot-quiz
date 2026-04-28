"use client";

import { useState } from "react";
import { askHistoryChatbot } from "@/lib/api";
import type { ChatMessage } from "@/types/chat";
import { generateId } from "@/utils/helpers";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const cleanContent = content.trim();http://localhost:3000/feedback
    if (!cleanContent) {
      return;
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: cleanContent,
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const data = await askHistoryChatbot(cleanContent, messages);

      const botMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.reply,
        createdAt: new Date().toISOString(),
      };

      setMessages((previous) => [...previous, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "I could not respond right now. Please try again.",
        createdAt: new Date().toISOString(),
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
