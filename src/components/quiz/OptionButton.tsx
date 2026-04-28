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
      className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
        selected
          ? "border-violet-500 bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-900 shadow-md"
          : "border-slate-200 bg-white/90 text-slate-800 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/60"
      } ${disabled ? "cursor-not-allowed opacity-70" : ""}`.trim()}
    >
      {label}
    </button>
  );
}
