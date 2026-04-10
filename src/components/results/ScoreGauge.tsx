import type { GlobalScore } from '../../types';
import { getRiskConfig } from '../../utils/scoring';

interface ScoreGaugeProps {
  score: GlobalScore;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const config = getRiskConfig(score.level);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score.percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={config.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: config.color }}>
            {score.score}/{score.total}
          </span>
          <span className="text-xs text-gray-500">réponses positives</span>
        </div>
      </div>
    </div>
  );
}
