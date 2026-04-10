import { useNavigate } from 'react-router-dom';
import { FileDown, AlertTriangle, Lightbulb } from 'lucide-react';
import { MapPin, Shield, Users, Link as LinkIcon, ClipboardCheck } from 'lucide-react';
import data from '../../../data/prevention-climat.json';
import type { DiagnosticState, CompanyProfile, ActionStatus } from '../../types';
import { exportToPdf } from '../../utils/pdf';
import ActionCard from './ActionCard';
import ProfileActions from './ProfileActions';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  exposition: MapPin,
  biens: Shield,
  humain: Users,
  dependances: LinkIcon,
  conformite: ClipboardCheck,
};

interface ActionPlanPageProps {
  diagnostic: DiagnosticState;
  profile: CompanyProfile;
  actionStatus: ActionStatus;
  toggleAction: (key: string) => void;
}

export default function ActionPlanPage({ diagnostic, profile, actionStatus, toggleAction }: ActionPlanPageProps) {
  const navigate = useNavigate();

  if (Object.keys(diagnostic.answers).length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Aucun diagnostic réalisé</h2>
        <p className="text-gray-500 mb-6">Veuillez d'abord compléter le diagnostic.</p>
        <button
          onClick={() => navigate('/diagnostic')}
          className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
        >
          Commencer le diagnostic
        </button>
      </div>
    );
  }

  const questionsWithActions = data.diagnostic.categories.flatMap(cat =>
    cat.questions
      .filter(q => {
        const answer = diagnostic.answers[q.id];
        return answer === 'non' || answer === 'ne_sais_pas';
      })
      .map(q => ({
        question: q,
        categoryId: cat.id,
        categoryLabel: cat.label,
        actions: (data.plan_actions.par_question as Record<string, { non: string[] }>)[q.id]?.non || [],
      }))
  );

  const selectedProfile = data.plan_actions.par_profil.find(p => p.id === profile.profileType);

  const totalActions = questionsWithActions.reduce((sum, q) => sum + q.actions.length, 0)
    + (selectedProfile ? selectedProfile.prevention.length + selectedProfile.continuite.length : 0);
  const completedActions = Object.values(actionStatus).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Plan d'actions</h1>
          <p className="text-sm text-gray-500 mt-1">
            {completedActions}/{totalActions} actions réalisées
          </p>
        </div>
        <button
          onClick={() => exportToPdf('actions-content', 'plan-actions-climat')}
          className="flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors no-print"
        >
          <FileDown className="w-4 h-4" /> Exporter PDF
        </button>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Progression</span>
          <span className="text-primary font-semibold">
            {totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-accent-green h-3 rounded-full transition-all duration-500"
            style={{ width: `${totalActions > 0 ? (completedActions / totalActions) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div id="actions-content">
        {/* Profile-based actions */}
        {selectedProfile && (
          <ProfileActions
            profile={selectedProfile}
            actionStatus={actionStatus}
            onToggle={toggleAction}
          />
        )}

        {/* Per-question actions */}
        {questionsWithActions.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Actions par point de vigilance
            </h2>
            <div className="flex flex-col gap-6">
              {questionsWithActions.map(({ question, categoryId, categoryLabel, actions }) => {
                const Icon = categoryIcons[categoryId] || Shield;
                return (
                  <div key={question.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-primary/60" />
                      <span className="text-xs text-gray-400 font-medium">{categoryLabel}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{question.text}</p>
                    <div className="flex flex-col gap-2 ml-1">
                      {actions.map((action, i) => {
                        const key = `q_${question.id}_${i}`;
                        return (
                          <ActionCard
                            key={key}
                            action={action}
                            actionKey={key}
                            done={!!actionStatus[key]}
                            onToggle={toggleAction}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
            <p className="text-green-700 font-medium">
              Toutes les réponses sont positives. Continuez à maintenir vos dispositifs de prévention !
            </p>
          </div>
        )}

        {/* Leviers de discours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-accent-orange" />
            <h2 className="text-lg font-semibold text-primary">Arguments clés</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.leviers_discours.map(levier => (
              <div
                key={levier.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <p className="text-sm font-semibold text-primary mb-1">{levier.label}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{levier.argument}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
