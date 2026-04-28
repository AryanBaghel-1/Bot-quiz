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
            className={`text-4xl leading-none transition-all duration-300 hover:scale-125 focus:outline-none ${
              active 
                ? "text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" 
                : "text-white/10 hover:text-[#d4af37]/50"
            }`}
            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
