import type { AnswerValue, RiskLevel, GlobalScore, CategoryScore as CategoryScoreType, Category } from '../types';
import data from '../../data/prevention-climat.json';

export function getRiskLevel(percentage: number): RiskLevel {
  if (percentage >= 67) return 'faible';
  if (percentage >= 40) return 'modere';
  return 'eleve';
}

export function getRiskConfig(level: RiskLevel) {
  const config = {
    faible: {
      color: '#22c55e',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      label: data.diagnostic.scoring.majorite_oui.label,
      message: data.diagnostic.scoring.majorite_oui.message,
    },
    modere: {
      color: '#f59e0b',
      bgColor: '#fffbeb',
      borderColor: '#fde68a',
      label: data.diagnostic.scoring.mixte.label,
      message: data.diagnostic.scoring.mixte.message,
    },
    eleve: {
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
      label: data.diagnostic.scoring.majorite_non.label,
      message: data.diagnostic.scoring.majorite_non.message,
    },
  };
  return config[level];
}

export function calculateCategoryScore(
  category: Category,
  answers: Record<string, AnswerValue>
): CategoryScoreType {
  const total = category.questions.length;
  const score = category.questions.filter(q => answers[q.id] === 'oui').length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    categoryId: category.id,
    label: category.label,
    score,
    total,
    percentage,
    level: getRiskLevel(percentage),
  };
}

export function calculateGlobalScore(answers: Record<string, AnswerValue>): GlobalScore {
  const categories = data.diagnostic.categories;
  const categoryScores = categories.map(cat => calculateCategoryScore(cat, answers));

  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const totalOui = Object.values(answers).filter(a => a === 'oui').length;
  const percentage = totalQuestions > 0 ? Math.round((totalOui / totalQuestions) * 100) : 0;
  const level = getRiskLevel(percentage);
  const config = getRiskConfig(level);

  return {
    score: totalOui,
    total: totalQuestions,
    percentage,
    level,
    label: config.label,
    message: config.message,
    categoryScores,
  };
}
