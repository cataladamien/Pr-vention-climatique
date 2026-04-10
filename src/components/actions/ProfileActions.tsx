import { ShieldCheck, RefreshCw } from 'lucide-react';
import type { ProfileActions as ProfileActionsType, ActionStatus } from '../../types';
import ActionCard from './ActionCard';

interface ProfileActionsProps {
  profile: ProfileActionsType;
  actionStatus: ActionStatus;
  onToggle: (key: string) => void;
}

export default function ProfileActions({ profile, actionStatus, onToggle }: ProfileActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-primary mb-1">
        Recommandations pour votre profil
      </h2>
      <p className="text-sm text-gray-500 mb-4">{profile.label}</p>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-primary">Prévention</h3>
        </div>
        <div className="flex flex-col gap-2">
          {profile.prevention.map((action, i) => {
            const key = `profile_${profile.id}_prev_${i}`;
            return (
              <ActionCard
                key={key}
                action={action}
                actionKey={key}
                done={!!actionStatus[key]}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-4 h-4 text-accent-orange" />
          <h3 className="text-sm font-semibold text-accent-orange">Continuité d'activité</h3>
        </div>
        <div className="flex flex-col gap-2">
          {profile.continuite.map((action, i) => {
            const key = `profile_${profile.id}_cont_${i}`;
            return (
              <ActionCard
                key={key}
                action={action}
                actionKey={key}
                done={!!actionStatus[key]}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
