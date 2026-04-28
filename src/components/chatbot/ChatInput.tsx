"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type ChatInputProps = {
  onSend: (value: string) => Promise<void>;
  isLoading: boolean;
};

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) {
      return;
    }

    setInput("");
    await onSend(value);
  };

  return (
    <form onSubmit={onSubmit} className="slide-up flex items-center gap-2">
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Ask any history question..."
        className="h-11 flex-1 rounded-xl border border-slate-300 bg-white/90 px-3 text-sm text-slate-900 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />
      <Button type="submit" disabled={isLoading}>
        Send
      </Button>
    </form>
  );
}
