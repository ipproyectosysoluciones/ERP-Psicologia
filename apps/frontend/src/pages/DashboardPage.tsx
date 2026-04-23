import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            'Pacientes',
            'Citas',
            'Historias Clínicas',
            'Empleados',
            'Contabilidad',
            'Inventarios',
            'Marketing',
            'Reportes',
            'Configuración',
          ].map((mod) => (
            <div
              key={mod}
              className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">{mod}</h3>
              <p className="mt-1 text-sm text-gray-500">Módulo en desarrollo</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
