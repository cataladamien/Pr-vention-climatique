import { MapPin, Shield, Users, Link as LinkIcon, ClipboardCheck } from 'lucide-react';
import type { Category, AnswerValue } from '../../types';
import QuestionCard from './QuestionCard';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'map-pin': MapPin,
  'shield': Shield,
  'users': Users,
  'link': LinkIcon,
  'clipboard-check': ClipboardCheck,
};

interface CategoryStepProps {
  category: Category;
  answers: Record<string, AnswerValue>;
  onAnswer: (questionId: string, value: AnswerValue) => void;
}

export default function CategoryStep({ category, answers, onAnswer }: CategoryStepProps) {
  const Icon = iconMap[category.icon] || Shield;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-primary">{category.label}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {category.questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            text={q.text}
            why={q.why}
            answer={answers[q.id] || null}
            onAnswer={(value) => onAnswer(q.id, value)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
