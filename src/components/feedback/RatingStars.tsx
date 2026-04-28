type RatingStarsProps = {
  rating: number;
  onChange: (value: number) => void;
};

export function RatingStars({ rating, onChange }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1" aria-label="Rate your quiz experience">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        const active = value <= rating;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`text-3xl leading-none transition-transform duration-150 hover:scale-110 ${active ? "text-emerald-500" : "text-slate-300"}`}
            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
