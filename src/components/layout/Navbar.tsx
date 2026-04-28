import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-violet-100/40 bg-gradient-to-r from-white/80 via-purple-50/60 to-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-lg font-extrabold text-transparent"
        >
          AI History Quizbot
        </Link>
        <nav className="flex items-center gap-2 text-sm text-slate-700">
          <Link href="/quiz" className="rounded-lg px-3 py-1.5 transition-colors hover:bg-violet-50 hover:text-violet-700">
            Quiz
          </Link>
          <Link href="/feedback" className="rounded-lg px-3 py-1.5 transition-colors hover:bg-fuchsia-50 hover:text-fuchsia-700">
            Feedback
          </Link>
          <Link href="/chatbot" className="rounded-lg px-3 py-1.5 transition-colors hover:bg-cyan-50 hover:text-cyan-700">
            Chatbot
          </Link>
        </nav>
      </div>
    </header>
  );
}
