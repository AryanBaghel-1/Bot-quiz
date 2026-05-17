"use client";

import { useEffect, useState } from "react";

type InitialLoaderProps = {
  children: React.ReactNode;
  minimumMs?: number;
};

export function InitialLoader({ children, minimumMs = 600 }: InitialLoaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const done = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minimumMs - elapsed);
      window.setTimeout(() => setIsReady(true), remaining);
    };

    // Next tick so the loading UI paints first.
    const id = window.setTimeout(done, 0);
    return () => window.clearTimeout(id);
  }, [minimumMs]);

  if (!isReady) {
    return (
      <div className="min-h-screen w-full bg-[#000000] text-[#d1d5db] flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-center space-y-3 slide-up">
          <h1 className="bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            Chronicles of Time
          </h1>
          <p className="text-sm text-[#9ca3af] tracking-wide">Unsealing the archives...</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="h-5 w-5 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#f5d27a]"
            aria-hidden="true"
          />
          <span className="text-sm text-[#f5d27a] uppercase tracking-widest" role="status">
            Loading.....
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
