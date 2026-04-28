"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RatingStars } from "@/components/feedback/RatingStars";

type FeedbackFormProps = {
  onSubmit: (payload: { rating: number; note: string }) => Promise<void>;
  isLoading: boolean;
};

export function FeedbackForm({ onSubmit, isLoading }: FeedbackFormProps) {
  const [rating, setRating] = useState(4);
  const [note, setNote] = useState("");

  return (
    <Card className="slide-up space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Get AI Feedback</h3>
      <div className="space-y-2">
        <p className="text-sm text-slate-700">How confident did you feel in this quiz?</p>
        <RatingStars rating={rating} onChange={setRating} />
      </div>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-slate-700">Optional note</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="min-h-24 w-full rounded-xl border border-slate-300 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          placeholder="Example: I struggle with timeline-based questions."
        />
      </label>

      <Button
        type="button"
        onClick={async () => {
          await onSubmit({ rating, note });
        }}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze My Quiz"}
      </Button>
    </Card>
  );
}
