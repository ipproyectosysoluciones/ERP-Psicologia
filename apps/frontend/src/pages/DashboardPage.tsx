import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useCitasStore } from '@/store/citas.store';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { citas, fetchCitas, isLoading } = useCitasStore();

  useEffect(() => {
    fetchCitas({ limit: 5 });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Citas Hoy', value: citas.filter(c => c.fecha === new Date().toISOString().split('T')[0]).length, color: 'bg-blue-500' },
    { label: 'Citas Pendientes', value: citas.filter(c => c.estado === 'programada').length, color: 'bg-yellow-500' },
    { label: 'Confirmadas', value: citas.filter(c => c.estado === 'confirmada').length, color: 'bg-green-500' },
  ];

  const modules = [
    { name: 'Pacientes', link: '/pacientes', icon: '👥', description: 'Gestión de pacientes', available: true, color: 'bg-indigo-50 border-indigo-200' },
    { name: 'Citas', link: '/citas', icon: '📅', description: 'Agenda y turnos', available: true, color: 'bg-emerald-50 border-emerald-200' },
    { name: 'Historias Clínicas', link: '/historias', icon: '📋', description: 'Historial médico', available: true, color: 'bg-purple-50 border-purple-200' },
    { name: 'Empleados', link: '#', icon: '👨‍⚕️', description: 'Staff médico', available: false, color: 'bg-gray-50 border-gray-200' },
    { name: 'Contabilidad', link: '#', icon: '💰', description: 'Facturación', available: false, color: 'bg-gray-50 border-gray-200' },
    { name: 'Marketing', link: '/leads', icon: '📢', description: 'Campañas y leads', available: true, color: 'bg-orange-50 border-orange-200' },
    { name: 'Reportes', link: '#', icon: '📊', description: 'Estadísticas', available: false, color: 'bg-gray-50 border-gray-200' },
    { name: 'Configuración', link: '#', icon: '⚙️', description: 'Ajustes del sistema', available: false, color: 'bg-gray-50 border-gray-200' },
  ];

  const getEstadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      programada: 'bg-blue-100 text-blue-800',
      confirmada: 'bg-green-100 text-green-800',
      completada: 'bg-gray-100 text-gray-800',
      cancelada: 'bg-red-100 text-red-800',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                ERP
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ERP-Psicologia</h1>
                <p className="text-xs text-gray-500">Clínica de Psicología</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.nombre || 'Usuario'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'USER'}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Resumen del día</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center`}>
                    <span className="text-2xl text-white">📅</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Módulos</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {modules.map((mod) => (
                <div
                  key={mod.name}
                  className={`rounded-xl border p-6 transition hover:shadow-md ${mod.color}`}
                >
                  {mod.available ? (
                    <Link to={mod.link} className="block">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{mod.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{mod.name}</h3>
                          <p className="text-sm text-gray-500">{mod.description}</p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{mod.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-400">{mod.name}</h3>
                        <p className="text-sm text-gray-400">Próximamente</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <aside>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Próximas Citas</h2>
              <Link to="/citas" className="text-sm text-indigo-600 hover:text-indigo-700">
                Ver todas →
              </Link>
            </div>
            <div className="rounded-xl bg-white shadow-sm border">
              {isLoading ? (
                <div className="p-6 text-center text-gray-500">Cargando...</div>
              ) : citas.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No hay citas próximas</p>
                  <Link to="/citas/nueva" className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-700">
                    + Nueva cita
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {citas.slice(0, 5).map((cita) => (
                    <Link key={cita.id} to={`/citas/${cita.id}`} className="block p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(cita.fecha).toLocaleDateString('es-AR', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-sm text-gray-500">{cita.horaInicio} - {cita.horaFin}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getEstadoBadge(cita.estado)}`}>
                          {cita.estado}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <h3 className="font-semibold">¿Necesitas ayuda?</h3>
              <p className="mt-1 text-sm text-indigo-100">Accede a la documentación o contacta soporte</p>
              <Button className="mt-4 bg-white text-indigo-600 hover:bg-indigo-50">
                Ver documentación
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}