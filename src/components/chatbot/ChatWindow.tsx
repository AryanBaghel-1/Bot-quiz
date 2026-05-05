"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import { MessageBubble } from "@/components/chatbot/MessageBubble";

export function ChatWindow({ messages }: { messages: ChatMessage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#d4af37]/30 bg-black/40 backdrop-blur-md p-8 text-center text-sm text-[#f5d27a] animate-pulse">
        Seek the wisdom of the past. Ask the Oracle any history-related question.
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-[500px] space-y-4 overflow-y-auto rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] scrollbar-thin scrollbar-thumb-[#d4af37]/40 scrollbar-track-transparent"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
