import { Calendar, Clock } from 'lucide-react';
import { Wind, Droplets, ThermometerSun } from 'lucide-react';
import type { UrgencePeril } from '../../types';

const perilIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wind: Wind,
  droplets: Droplets,
  'thermometer-sun': ThermometerSun,
};

const perilColors: Record<string, { bg: string; border: string; iconBg: string; text: string }> = {
  wind: { bg: 'bg-slate-50', border: 'border-slate-200', iconBg: 'bg-slate-100', text: 'text-slate-700' },
  droplets: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', text: 'text-blue-700' },
  'thermometer-sun': { bg: 'bg-orange-50', border: 'border-orange-200', iconBg: 'bg-orange-100', text: 'text-orange-700' },
};

interface UrgenceCardProps {
  peril: UrgencePeril;
}

export default function UrgenceCard({ peril }: UrgenceCardProps) {
  const Icon = perilIcons[peril.icon] || Wind;
  const colors = perilColors[peril.icon] || perilColors.wind;

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <h2 className={`text-xl font-bold ${colors.text}`}>{peril.label}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jours avant */}
        <div className="bg-white/80 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className={`w-4 h-4 ${colors.text}`} />
            <h3 className="text-sm font-semibold text-gray-700">Quelques jours avant</h3>
          </div>
          <ul className="space-y-2">
            {peril.jours_avant.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} mt-1.5`} />
                {action}
              </li>
            ))}
          </ul>
        </div>

        {/* Heures avant */}
        <div className="bg-white/80 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className={`w-4 h-4 ${colors.text}`} />
            <h3 className="text-sm font-semibold text-gray-700">Quelques heures avant</h3>
          </div>
          <ul className="space-y-2">
            {peril.heures_avant.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} mt-1.5`} />
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
