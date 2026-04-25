import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PacientesPage } from './pages/pacientes/PacientesPage';
import { PacienteFormPage } from './pages/pacientes/PacienteFormPage';
import { CitasPage } from './pages/citas/CitasPage';
import { CitaFormPage } from './pages/citas/CitaFormPage';
import { LeadsPage } from './pages/leads/LeadsPage';
import { LeadFormPage } from './pages/leads/LeadFormPage';
import { HistoriasPage } from './pages/historias/HistoriasPage';
import { HistoriaFormPage } from './pages/historias/HistoriaFormPage';
import { useAuthStore } from './store/auth.store';
import { LeadFormFloatingButton } from './components/widgets/LeadFormFloatingButton';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pacientes"
        element={
          <ProtectedRoute>
            <PacientesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pacientes/:id"
        element={
          <ProtectedRoute>
            <PacienteFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citas"
        element={
          <ProtectedRoute>
            <CitasPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citas/:id"
        element={
          <ProtectedRoute>
            <CitaFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <LeadsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leads/:id"
        element={
          <ProtectedRoute>
            <LeadFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historias"
        element={
          <ProtectedRoute>
            <HistoriasPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historias/:id"
        element={
          <ProtectedRoute>
            <HistoriaFormPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      {isAuthenticated && user && (
        <LeadFormFloatingButton />
      )}
    </>
  );
}