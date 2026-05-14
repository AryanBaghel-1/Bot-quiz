"use client";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { useEffect, useState } from "react";
// Simple falling/floating particles using CSS
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#fde68a] opacity-30 particle-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-[#000000] text-[#d1d5db] relative overflow-hidden flex flex-col min-h-screen">
      <Particles />
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl flex-1 z-10 relative">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 w-full mt-10 md:mt-0">
          <div className="w-full max-w-5xl mx-auto space-y-16 text-center animate-in fade-in zoom-in duration-700">
            <div className="space-y-6 slide-up">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight py-2">
                <span className="bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  Chronicles of Time
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#9ca3af] max-w-3xl mx-auto font-light tracking-wide">
                Unravel the mysteries of the past with our premium AI-driven history experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 slide-up" style={{ animationDelay: '100ms' }}>
              <Link href="/quiz" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:scale-105">
                  Embark on Quizzes
                </Button>
              </Link>
              <Link href="/chatbot" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 transform hover:scale-105">
                  Consult the Chatbot
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left slide-up" style={{ animationDelay: '200ms' }}>
              <Card className="p-6 space-y-4 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-500 transform hover:-translate-y-2 border-white/10 bg-black/40 backdrop-blur-md rounded-xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20 relative z-10">
                  <span className="text-[#f5d27a] text-2xl">🏛️</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#f5d27a] relative z-10">Ancient Wisdom</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed relative z-10">Explore interactive narratives and test your knowledge of ancient civilizations.</p>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-500 transform hover:-translate-y-2 border-white/10 bg-black/40 backdrop-blur-md rounded-xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20 relative z-10">
                  <span className="text-[#f5d27a] text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#f5d27a] relative z-10">AI Chatbot</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed relative z-10">Consult our advanced AI to analyze historical events in detail with precision.</p>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-500 transform hover:-translate-y-2 border-white/10 bg-black/40 backdrop-blur-md rounded-xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20 relative z-10">
                  <span className="text-[#f5d27a] text-2xl">📜</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#f5d27a] relative z-10">Chronicles</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed relative z-10">Review your journey and master human history step-by-step through epochs.</p>
              </Card>
            </div>
            
            <div className="slide-up mt-8 rounded-xl border border-[#d4af37]/20 bg-[#111111]/80 backdrop-blur-md p-4 text-sm text-[#9ca3af] max-w-lg mx-auto transition-all hover:border-[#d4af37]/50" style={{ animationDelay: '300ms' }}>
              <span className="text-[#d4af37] font-semibold">Notice:</span> The Chatbot is bound to historical inquiries only.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
