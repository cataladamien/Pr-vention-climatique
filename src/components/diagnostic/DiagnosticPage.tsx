import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import data from '../../../data/prevention-climat.json';
import type { DiagnosticState, AnswerValue } from '../../types';
import ProgressBar from '../layout/ProgressBar';
import CategoryStep from './CategoryStep';

interface DiagnosticPageProps {
  diagnostic: DiagnosticState;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  setStep: (step: number) => void;
  completeDiagnostic: () => void;
}

export default function DiagnosticPage({
  diagnostic,
  setAnswer,
  setStep,
  completeDiagnostic,
}: DiagnosticPageProps) {
  const navigate = useNavigate();
  const categories = data.diagnostic.categories;
  const currentCategory = categories[diagnostic.currentStep];

  const allCurrentAnswered = currentCategory.questions.every(
    q => diagnostic.answers[q.id] != null
  );

  const isLastStep = diagnostic.currentStep === categories.length - 1;

  const goNext = () => {
    if (isLastStep) {
      completeDiagnostic();
      navigate('/resultats');
    } else {
      setStep(diagnostic.currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goPrev = () => {
    if (diagnostic.currentStep > 0) {
      setStep(diagnostic.currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">
        {data.diagnostic.title}
      </h1>
      <p className="text-gray-500 mb-6">{data.diagnostic.description}</p>

      <ProgressBar
        current={diagnostic.currentStep}
        total={categories.length}
        labels={categories.map(c => c.label.split(' ')[0])}
      />

      <CategoryStep
        category={currentCategory}
        answers={diagnostic.answers}
        onAnswer={setAnswer}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={goPrev}
          disabled={diagnostic.currentStep === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            diagnostic.currentStep === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-primary hover:bg-primary/5'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Précédent
        </button>

        <button
          onClick={goNext}
          disabled={!allCurrentAnswered}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            allCurrentAnswered
              ? 'bg-primary text-white hover:bg-primary-light shadow-md'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLastStep ? (
            <>
              Voir les résultats <CheckCircle className="w-4 h-4" />
            </>
          ) : (
            <>
              Suivant <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
