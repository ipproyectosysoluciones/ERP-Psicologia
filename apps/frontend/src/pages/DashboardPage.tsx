import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    { name: 'Pacientes', link: '/pacientes', available: true },
    { name: 'Citas', link: '#', available: false },
    { name: 'Historias Clínicas', link: '#', available: false },
    { name: 'Empleados', link: '#', available: false },
    { name: 'Contabilidad', link: '#', available: false },
    { name: 'Inventarios', link: '#', available: false },
    { name: 'Marketing', link: '#', available: false },
    { name: 'Reportes', link: '#', available: false },
    { name: 'Configuración', link: '#', available: false },
  ];

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
          {modules.map((mod) => (
            <div
              key={mod.name}
              className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {mod.available ? (
                <Link to={mod.link} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                    {mod.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Gestionar pacientes</p>
                </Link>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">{mod.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">Módulo en desarrollo</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}