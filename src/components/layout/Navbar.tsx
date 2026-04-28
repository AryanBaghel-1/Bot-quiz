import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-xl font-extrabold tracking-wider uppercase text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-transform hover:scale-105"
        >
          Chronicles of Time
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] uppercase tracking-wider">
          <Link href="/quiz" className="rounded-lg px-3 py-1.5 transition-all duration-300 hover:bg-white/5 hover:text-[#f5d27a] hover:shadow-[inset_0_-2px_0_rgba(212,175,55,0.8)]">
            Quiz
          </Link>
          <Link href="/feedback" className="rounded-lg px-3 py-1.5 transition-all duration-300 hover:bg-white/5 hover:text-[#f5d27a] hover:shadow-[inset_0_-2px_0_rgba(212,175,55,0.8)]">
            Feedback
          </Link>
          <Link href="/chatbot" className="rounded-lg px-3 py-1.5 transition-all duration-300 hover:bg-white/5 hover:text-[#f5d27a] hover:shadow-[inset_0_-2px_0_rgba(212,175,55,0.8)]">
            Chatbot
          </Link>
        </nav>
      </div>
    </header>
  );
}
