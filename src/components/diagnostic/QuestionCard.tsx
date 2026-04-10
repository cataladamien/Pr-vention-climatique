import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { AnswerValue } from '../../types';

interface QuestionCardProps {
  id: string;
  text: string;
  why: string;
  answer: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
  index: number;
}

const answerOptions: { value: AnswerValue; label: string; activeClass: string }[] = [
  { value: 'oui', label: 'Oui', activeClass: 'bg-green-500 text-white border-green-500' },
  { value: 'non', label: 'Non', activeClass: 'bg-red-500 text-white border-red-500' },
  { value: 'ne_sais_pas', label: 'Ne sais pas', activeClass: 'bg-amber-500 text-white border-amber-500' },
];

export default function QuestionCard({ id, text, why, answer, onAnswer, index }: QuestionCardProps) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm" id={`question-${id}`}>
      <div className="flex gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-gray-800 font-medium mb-3">{text}</p>

          {/* Answer buttons */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {answerOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  answer === opt.value
                    ? opt.activeClass
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Why toggle */}
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Pourquoi c'est important
            {showWhy ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showWhy && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg text-xs text-gray-600 leading-relaxed border border-blue-100">
              {why}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
