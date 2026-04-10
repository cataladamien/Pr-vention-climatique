import { AlertTriangle } from 'lucide-react';
import data from '../../../data/prevention-climat.json';
import type { UrgencePeril } from '../../types';
import UrgenceCard from './UrgenceCard';

export default function UrgencePage() {
  const perils = Object.values(data.urgence) as UrgencePeril[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="w-7 h-7 text-accent-orange" />
        <h1 className="text-2xl font-bold text-primary">Fiches réflexes d'urgence</h1>
      </div>
      <p className="text-gray-500 mb-8">
        Gestes de prévention à adopter en cas d'alerte météo. Imprimez ces fiches et affichez-les dans vos locaux.
      </p>

      <div className="flex flex-col gap-6">
        {perils.map(peril => (
          <UrgenceCard key={peril.label} peril={peril} />
        ))}
      </div>
    </div>
  );
}
