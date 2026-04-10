import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { AnswerValue, DiagnosticState, CompanyProfile, ActionStatus } from '../types';

const DIAGNOSTIC_KEY = 'prevention_climat_diagnostic';
const PROFILE_KEY = 'prevention_climat_profile';
const ACTIONS_KEY = 'prevention_climat_actions';

const initialDiagnostic: DiagnosticState = {
  answers: {},
  currentStep: 0,
  completed: false,
};

const initialProfile: CompanyProfile = {
  name: '',
  sector: '',
  size: '',
  location: '',
  profileType: '',
};

export function useDiagnostic() {
  const [diagnostic, setDiagnostic, clearDiagnostic] = useLocalStorage<DiagnosticState>(DIAGNOSTIC_KEY, initialDiagnostic);
  const [profile, setProfile] = useLocalStorage<CompanyProfile>(PROFILE_KEY, initialProfile);
  const [actionStatus, setActionStatus] = useLocalStorage<ActionStatus>(ACTIONS_KEY, {});

  const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setDiagnostic(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  }, [setDiagnostic]);

  const setStep = useCallback((step: number) => {
    setDiagnostic(prev => ({ ...prev, currentStep: step }));
  }, [setDiagnostic]);

  const completeDiagnostic = useCallback(() => {
    setDiagnostic(prev => ({
      ...prev,
      completed: true,
      completedAt: new Date().toISOString(),
    }));
  }, [setDiagnostic]);

  const toggleAction = useCallback((actionKey: string) => {
    setActionStatus(prev => ({
      ...prev,
      [actionKey]: !prev[actionKey],
    }));
  }, [setActionStatus]);

  const resetAll = useCallback(() => {
    clearDiagnostic();
    setProfile(initialProfile);
    setActionStatus({});
  }, [clearDiagnostic, setProfile, setActionStatus]);

  return {
    diagnostic,
    profile,
    actionStatus,
    setAnswer,
    setStep,
    completeDiagnostic,
    setProfile,
    toggleAction,
    resetAll,
  };
}
