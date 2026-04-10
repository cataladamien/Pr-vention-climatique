import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileDown, AlertTriangle } from 'lucide-react';
import data from '../../../data/prevention-climat.json';
import type { DiagnosticState } from '../../types';
import { calculateGlobalScore } from '../../utils/scoring';
import { exportToPdf } from '../../utils/pdf';
import ScoreGauge from './ScoreGauge';
import CategoryScoreBar from './CategoryScore';
import RiskBadge from './RiskBadge';

const questionTexts: Record<string, string> = {};
data.diagnostic.categories.forEach(cat => {
  cat.questions.forEach(q => {
    questionTexts[q.id] = q.text;
  });
});

interface ResultsPageProps {
  diagnostic: DiagnosticState;
}

export default function ResultsPage({ diagnostic }: ResultsPageProps) {
  const navigate = useNavigate();
  const score = calculateGlobalScore(diagnostic.answers);

  if (!diagnostic.completed && Object.keys(diagnostic.answers).length === 0) {
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-primary">Résultats du diagnostic</h1>
        <button
          onClick={() => exportToPdf('results-content', 'diagnostic-climat')}
          className="flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors no-print"
        >
          <FileDown className="w-4 h-4" /> Exporter PDF
        </button>
      </div>

      <div id="results-content">
        {/* Global score card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
          <RiskBadge level={score.level} size="lg" />
          <div className="mt-4">
            <ScoreGauge score={score} />
          </div>
          <p className="mt-4 text-gray-600 max-w-lg mx-auto">{score.message}</p>
        </div>

        {/* Category scores */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Score par catégorie</h2>
          <div className="flex flex-col gap-2">
            {score.categoryScores.map(cs => (
              <CategoryScoreBar key={cs.categoryId} categoryScore={cs} />
            ))}
          </div>
        </div>

        {/* Quick summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Points de vigilance</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(diagnostic.answers)
              .filter(([, v]) => v === 'non' || v === 'ne_sais_pas')
              .map(([qId, v]) => (
                <div key={qId} className="flex items-start gap-2 text-sm">
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5 ${
                    v === 'non' ? 'bg-red-500' : 'bg-amber-500'
                  }`}>
                    {v === 'non' ? '!' : '?'}
                  </span>
                  <span className="text-gray-600">
                    {questionTexts[qId] || qId.toUpperCase()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center no-print">
        <button
          onClick={() => navigate('/actions')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors shadow-md"
        >
          Voir mon plan d'actions <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
