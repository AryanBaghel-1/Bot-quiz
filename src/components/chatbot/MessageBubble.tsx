import type { ChatMessage } from "@/types/chat";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`fade-in flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-2xl px-3 py-2.5 text-sm shadow-sm ${
          isUser
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
            : "border border-slate-200 bg-white/90 text-slate-900"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
