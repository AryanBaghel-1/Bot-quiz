import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <Card className="slide-up space-y-4">
            <h1 className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
              AI History Quiz Chatbot
            </h1>
            <p className="max-w-2xl text-slate-700">
              Practice history MCQs, check your answers instantly, and get AI analysis after quiz submission.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quiz">
                <Button>Start Quiz</Button>
              </Link>
              <Link href="/chatbot">
                <Button variant="secondary">Open History Chatbot</Button>
              </Link>
            </div>
          </Card>
          <div className="slide-up mt-4 rounded-xl border border-cyan-200/40 bg-gradient-to-r from-cyan-50/60 to-emerald-50/60 p-4 text-sm text-cyan-900">
            Note: The chatbot is restricted to history topics only.
          </div>
        </main>
      </div>
    </div>
  );
}
