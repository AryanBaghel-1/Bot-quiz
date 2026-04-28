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
    <Card className="slide-up space-y-6 p-6 border-white/10 bg-black/40 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.05)]">
      <h3 className="text-xl font-bold bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]">
        Seek Oracle's Insight
      </h3>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-[#9ca3af] uppercase tracking-wider">
          Confidence Level
        </p>
        <RatingStars rating={rating} onChange={setRating} />
      </div>

      <label className="block space-y-2 pt-2">
        <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wider block">
          Scrolls of Thought (Optional)
        </span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-[15px] text-[#f5d27a] placeholder:text-[#9ca3af]/50 outline-none transition-all duration-300 focus:border-[#d4af37]/50 focus:bg-black/60 focus:shadow-[inset_0_0_15px_rgba(212,175,55,0.1)] resize-y scrollbar-thin scrollbar-thumb-[#d4af37]/40"
          placeholder="e.g. My knowledge of the Byzantine Empire is lacking..."
        />
      </label>

      <Button
        type="button"
        onClick={async () => {
          await onSubmit({ rating, note });
        }}
        disabled={isLoading}
        className="w-full text-lg py-6 mt-2"
      >
        {isLoading ? "Consulting the Stars..." : "Analyze Archives"}
      </Button>
    </Card>
  );
}
