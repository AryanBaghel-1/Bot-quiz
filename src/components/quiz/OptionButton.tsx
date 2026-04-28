type OptionButtonProps = {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function OptionButton({
  label,
  selected,
  disabled = false,
  onClick,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 transform ${
        selected
          ? "border-[#d4af37] bg-gradient-to-r from-[#d4af37]/20 to-[#f5d27a]/20 text-[#f5d27a] shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-102"
          : "border-white/10 bg-black/40 text-[#d1d5db] backdrop-blur-md hover:-translate-y-0.5 hover:border-[#d4af37]/50 hover:bg-white/5 hover:text-[#f5d27a] hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
      } ${disabled ? "cursor-not-allowed opacity-50 hover:transform-none hover:shadow-none hover:border-white/10 hover:text-[#d1d5db] hover:bg-black/40" : ""}`.trim()}
    >
      {label}
    </button>
  );
}
