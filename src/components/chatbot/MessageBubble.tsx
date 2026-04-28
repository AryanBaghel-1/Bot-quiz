import type { ChatMessage } from "@/types/chat";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`fade-in flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-r from-[#d4af37]/80 to-[#c9a44c]/80 text-[#111111] font-medium shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            : "border border-white/10 bg-white/5 text-[#d1d5db] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        }`}
      >
        {isUser ? (
           message.content
        ) : (
          <div className="prose prose-invert prose-p:my-1 prose-h3:text-[#f5d27a] prose-strong:text-[#f5d27a] max-w-none text-[15px]">
            {message.content.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
