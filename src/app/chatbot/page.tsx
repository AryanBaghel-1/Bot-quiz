"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { ChatWindow } from "@/components/chatbot/ChatWindow";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { useChat } from "@/hooks/useChat";

export default function ChatbotPage() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();

  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl">
        <Sidebar />
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <Card className="slide-up space-y-3">
            <h1 className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
              History Chatbot
            </h1>
            <p className="text-sm text-slate-700">
              This assistant answers only history-related questions.
            </p>
          </Card>

          <Card className="slide-up space-y-3">
            <ChatWindow messages={messages} />
            {isLoading ? <Loader label="Thinking..." /> : null}
            <ChatInput onSend={sendMessage} isLoading={isLoading} />
            <Button variant="secondary" onClick={clearMessages}>
              Clear Chat
            </Button>
          </Card>
        </main>
      </div>
    </div>
  );
}
