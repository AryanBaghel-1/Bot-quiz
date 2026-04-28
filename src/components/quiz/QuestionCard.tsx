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
    <Card className="slide-up space-y-3">
      <p className="inline-flex w-fit rounded-full bg-gradient-to-r from-violet-100 to-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
        {question.era}
      </p>
      <h3 className="text-base font-semibold leading-relaxed text-slate-900">
        {question.question}
      </h3>
      <div className="space-y-2">
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
