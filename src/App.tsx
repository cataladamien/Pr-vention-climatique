import { HashRouter, Routes, Route } from 'react-router-dom';
import { useDiagnostic } from './hooks/useDiagnostic';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/home/HomePage';
import DiagnosticPage from './components/diagnostic/DiagnosticPage';
import ResultsPage from './components/results/ResultsPage';
import ActionPlanPage from './components/actions/ActionPlanPage';
import UrgencePage from './components/urgence/UrgencePage';

export default function App() {
  const {
    diagnostic,
    profile,
    actionStatus,
    setAnswer,
    setStep,
    completeDiagnostic,
    setProfile,
    toggleAction,
    resetAll,
  } = useDiagnostic();

  const hasExistingDiagnostic = Object.keys(diagnostic.answers).length > 0;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  profile={profile}
                  setProfile={setProfile}
                  hasExistingDiagnostic={hasExistingDiagnostic}
                  onReset={resetAll}
                />
              }
            />
            <Route
              path="/diagnostic"
              element={
                <DiagnosticPage
                  diagnostic={diagnostic}
                  setAnswer={setAnswer}
                  setStep={setStep}
                  completeDiagnostic={completeDiagnostic}
                />
              }
            />
            <Route
              path="/resultats"
              element={<ResultsPage diagnostic={diagnostic} />}
            />
            <Route
              path="/actions"
              element={
                <ActionPlanPage
                  diagnostic={diagnostic}
                  profile={profile}
                  actionStatus={actionStatus}
                  toggleAction={toggleAction}
                />
              }
            />
            <Route path="/urgence" element={<UrgencePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
