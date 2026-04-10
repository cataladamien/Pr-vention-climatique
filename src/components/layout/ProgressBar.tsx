interface ProgressBarProps {
  current: number;
  total: number;
  labels?: string[];
}

export default function ProgressBar({ current, total, labels }: ProgressBarProps) {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary">
          Étape {current + 1} sur {total}
        </span>
        <span className="text-sm text-gray-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, i) => (
            <span
              key={label}
              className={`text-xs ${
                i <= current ? 'text-primary font-medium' : 'text-gray-medium'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
