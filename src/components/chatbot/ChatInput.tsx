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
    <form onSubmit={onSubmit} className="slide-up flex flex-col md:flex-row items-center gap-3 w-full">
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Ask the Oracle an ancient query..."
        className="h-14 flex-1 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-5 text-[15px] text-[#f5d27a] placeholder:text-[#9ca3af] outline-none transition-all duration-300 focus:border-[#d4af37]/50 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
      />
      <Button type="submit" disabled={isLoading} className="w-full md:w-auto h-14 px-8 tracking-wider">
        Send
      </Button>
    </form>
  );
}
