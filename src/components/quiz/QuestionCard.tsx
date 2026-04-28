import type { QuizQuestion } from "@/types/quiz";
import { Card } from "@/components/ui/Card";
import { OptionButton } from "@/components/quiz/OptionButton";

type QuestionCardProps = {
  question: QuizQuestion;
  selectedOption: number | undefined;
  onSelect: (optionIndex: number) => void;
  disabled?: boolean;
};

export function QuestionCard({
  question,
  selectedOption,
  onSelect,
  disabled = false,
}: QuestionCardProps) {
  return (
    <Card className="slide-up space-y-4 p-6 border-white/10 bg-black/40 backdrop-blur-md rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300">
      <div className="flex items-center">
        <p className="inline-flex w-fit rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#f5d27a] drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]">
          {question.era}
        </p>
      </div>
      <h3 className="text-lg font-semibold leading-relaxed text-[#ffffff] tracking-wide">
        {question.question}
      </h3>
      <div className="space-y-3 pt-2">
        {question.options.map((option, index) => (
          <OptionButton
            key={`${question.id}-${option}`}
            label={option}
            selected={selectedOption === index}
            onClick={() => onSelect(index)}
            disabled={disabled}
          />
        ))}
      </div>
    </Card>
  );
}
