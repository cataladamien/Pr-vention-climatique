import { MapPin, Shield, Users, Link as LinkIcon, ClipboardCheck } from 'lucide-react';
import type { CategoryScore as CategoryScoreType } from '../../types';
import { getRiskConfig } from '../../utils/scoring';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  exposition: MapPin,
  biens: Shield,
  humain: Users,
  dependances: LinkIcon,
  conformite: ClipboardCheck,
};

interface CategoryScoreProps {
  categoryScore: CategoryScoreType;
}

export default function CategoryScoreBar({ categoryScore }: CategoryScoreProps) {
  const config = getRiskConfig(categoryScore.level);
  const Icon = iconMap[categoryScore.categoryId] || Shield;

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 truncate">
            {categoryScore.label}
          </span>
          <span className="text-sm font-semibold ml-2" style={{ color: config.color }}>
            {categoryScore.score}/{categoryScore.total}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{
              width: `${categoryScore.percentage}%`,
              backgroundColor: config.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
