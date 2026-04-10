export type AnswerValue = 'oui' | 'non' | 'ne_sais_pas' | null;

export type RiskLevel = 'faible' | 'modere' | 'eleve';

export interface Question {
  id: string;
  text: string;
  why: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  questions: Question[];
}

export interface ScoringLevel {
  level: RiskLevel;
  label: string;
  message: string;
}

export interface DiagnosticData {
  title: string;
  description: string;
  scoring: {
    majorite_oui: ScoringLevel;
    mixte: ScoringLevel;
    majorite_non: ScoringLevel;
  };
  categories: Category[];
}

export interface ProfileActions {
  id: string;
  label: string;
  prevention: string[];
  continuite: string[];
}

export interface QuestionActions {
  non: string[];
}

export interface PlanActions {
  par_profil: ProfileActions[];
  par_question: Record<string, QuestionActions>;
}

export interface UrgencePeril {
  label: string;
  icon: string;
  jours_avant: string[];
  heures_avant: string[];
}

export interface LevierDiscours {
  id: string;
  label: string;
  icon: string;
  argument: string;
}

export interface PreventionClimatData {
  diagnostic: DiagnosticData;
  plan_actions: PlanActions;
  urgence: Record<string, UrgencePeril>;
  leviers_discours: LevierDiscours[];
}

export interface CompanyProfile {
  name: string;
  sector: string;
  size: string;
  location: string;
  profileType: string;
}

export interface DiagnosticState {
  answers: Record<string, AnswerValue>;
  currentStep: number;
  completed: boolean;
  completedAt?: string;
}

export interface ActionStatus {
  [actionKey: string]: boolean;
}

export interface CategoryScore {
  categoryId: string;
  label: string;
  score: number;
  total: number;
  percentage: number;
  level: RiskLevel;
}

export interface GlobalScore {
  score: number;
  total: number;
  percentage: number;
  level: RiskLevel;
  label: string;
  message: string;
  categoryScores: CategoryScore[];
}
