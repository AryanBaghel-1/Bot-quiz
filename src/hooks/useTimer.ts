"use client";

import { useEffect, useState } from "react";

export function useTimer(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const reset = () => setSeconds(0);

  return { seconds, reset };
}
