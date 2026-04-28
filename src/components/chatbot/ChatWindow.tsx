import type { ChatMessage } from "@/types/chat";
import { MessageBubble } from "@/components/chatbot/MessageBubble";

export function ChatWindow({ messages }: { messages: ChatMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-cyan-300/50 bg-gradient-to-br from-cyan-50/40 to-emerald-50/40 p-4 text-sm text-cyan-700">
        Ask me about history. I only answer history-related questions.
      </div>
    );
  }

  return (
    <div className="max-h-[460px] space-y-3 overflow-y-auto rounded-xl border border-violet-100/40 bg-gradient-to-br from-white/80 to-purple-50/40 p-3 backdrop-blur-sm">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
