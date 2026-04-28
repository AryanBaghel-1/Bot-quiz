"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { ChatWindow } from "@/components/chatbot/ChatWindow";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { useChat } from "@/hooks/useChat";

// Simple floating particles for sub-pages
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 fixed">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#d4af37] opacity-20 particle-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 15 + 15}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function ChatbotPage() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();

  return (
    <div className="bg-[#000000] text-[#d1d5db] relative flex flex-col min-h-screen">
      <Particles />
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl flex-1 z-10 relative">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 space-y-6 p-4 md:p-8 w-full mt-10 md:mt-2 max-w-4xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
          <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 slide-up">
            <div>
              <h1 className="bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-3xl font-bold text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] tracking-wide">
                The Chatbot
              </h1>
              <p className="text-sm text-[#9ca3af] mt-2 font-light">
                Consult the artificial intelligence regarding matters of ancestry and history.
              </p>
            </div>
            {messages.length > 0 && (
              <Button variant="secondary" onClick={clearMessages} className="text-xs px-4 py-2 border-[#d4af37]/30 text-[#f5d27a]">
                Clear Chronicles
              </Button>
            )}
          </div>

          <Card className="flex-1 flex flex-col slide-up p-4 md:p-6 overflow-hidden border-white/10 bg-black/40 backdrop-blur-md rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <div className="flex-1 overflow-hidden relative">
              <ChatWindow messages={messages} />
              {isLoading && (
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-3 rounded-full bg-black/60 border border-[#d4af37]/30 backdrop-blur-md px-4 py-2 shadow-lg">
                     <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-[#f5d27a] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                     <span className="w-2 h-2 bg-[#e6c065] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                     <span className="text-xs text-[#f5d27a] ml-2 tracking-widest uppercase">Pondering...</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <ChatInput onSend={sendMessage} isLoading={isLoading} />
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
