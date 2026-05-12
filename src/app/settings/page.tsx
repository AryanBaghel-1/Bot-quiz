"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { QuizHistory } from "@/components/settings/QuizHistory";

// Simple floating particles for sub-pages
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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

export default function SettingsPage() {
  return (
    <div className="bg-[#000000] text-[#d1d5db] relative flex flex-col min-h-screen">
      <Particles />
      <Navbar />
      <div className="mx-auto flex w-full max-w-8xl flex-1 z-10 relative">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 space-y-6 p-4 md:p-8 w-full mt-10 md:mt-2 max-w-4xl mx-auto">
          <h1 className="slide-up bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-3xl font-bold text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] tracking-wide">
            Settings
          </h1>

          <QuizHistory />
        </main>
      </div>
    </div>
  );
}
