import { Check } from 'lucide-react';

interface ActionCardProps {
  action: string;
  actionKey: string;
  done: boolean;
  onToggle: (key: string) => void;
}

export default function ActionCard({ action, actionKey, done, onToggle }: ActionCardProps) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
        done
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-200 hover:border-primary/30'
      }`}
    >
      <button
        onClick={() => onToggle(actionKey)}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
          done
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-primary'
        }`}
      >
        {done && <Check className="w-3 h-3 text-white" />}
      </button>
      <span className={`text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
        {action}
      </span>
    </label>
  );
}
