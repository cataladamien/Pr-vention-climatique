import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, RotateCcw, Truck, Package, Building } from 'lucide-react';
import type { CompanyProfile } from '../../types';

const profileTypes = [
  {
    id: 'flux',
    label: 'Flux & logistique',
    description: 'Livraisons, multi-sites, transport',
    icon: Truck,
  },
  {
    id: 'stocks',
    label: 'Stocks sensibles',
    description: 'Matériel, produits chimiques, denrées',
    icon: Package,
  },
  {
    id: 'bati',
    label: 'Bâti & construction',
    description: 'Locaux, entrepôts, chantiers',
    icon: Building,
  },
];

const sectors = [
  'Agriculture / Agroalimentaire',
  'Industrie / Manufacture',
  'BTP / Construction',
  'Commerce / Distribution',
  'Transport / Logistique',
  'Services / Tertiaire',
  'Hôtellerie / Restauration',
  'Santé / Médical',
  'Autre',
];

const sizes = [
  '1-10 salariés',
  '11-50 salariés',
  '51-250 salariés',
  '250+ salariés',
];

interface HomePageProps {
  profile: CompanyProfile;
  setProfile: (profile: CompanyProfile) => void;
  hasExistingDiagnostic: boolean;
  onReset: () => void;
}

export default function HomePage({ profile, setProfile, hasExistingDiagnostic, onReset }: HomePageProps) {
  const navigate = useNavigate();

  const updateProfile = (field: keyof CompanyProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const canStart = profile.profileType !== '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">
          Prévention des risques climatiques
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Évaluez la vulnérabilité de votre entreprise face aux aléas climatiques
          et obtenez un plan d'actions personnalisé.
        </p>
      </div>

      {/* Existing diagnostic banner */}
      {hasExistingDiagnostic && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex items-center justify-between flex-wrap gap-3">
          <p className="text-primary font-medium">
            Un diagnostic précédent a été trouvé.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/resultats')}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
            >
              Voir mes résultats
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Recommencer
            </button>
          </div>
        </div>
      )}

      {/* Company info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Informations de l'entreprise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={e => updateProfile('name', e.target.value)}
              placeholder="Ex : SARL Dupont"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localisation
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={e => updateProfile('location', e.target.value)}
              placeholder="Ex : Nîmes (30)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secteur d'activité
            </label>
            <select
              value={profile.sector}
              onChange={e => updateProfile('sector', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            >
              <option value="">Sélectionner...</option>
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taille
            </label>
            <select
              value={profile.size}
              onChange={e => updateProfile('size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            >
              <option value="">Sélectionner...</option>
              {sizes.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Profile type selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Profil de votre entreprise
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Sélectionnez le profil le plus proche de votre activité pour obtenir des recommandations adaptées.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {profileTypes.map(pt => {
            const Icon = pt.icon;
            const selected = profile.profileType === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => updateProfile('profileType', pt.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${selected ? 'text-primary' : 'text-gray-400'}`} />
                <p className={`font-medium text-sm ${selected ? 'text-primary' : 'text-gray-700'}`}>
                  {pt.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{pt.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/diagnostic')}
          disabled={!canStart}
          className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg text-lg font-semibold transition-all ${
            canStart
              ? 'bg-primary text-white hover:bg-primary-light shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Commencer le diagnostic
          <ArrowRight className="w-5 h-5" />
        </button>
        {!canStart && (
          <p className="text-sm text-gray-400 mt-2">
            Sélectionnez un profil d'entreprise pour continuer
          </p>
        )}
      </div>
    </div>
  );
}
