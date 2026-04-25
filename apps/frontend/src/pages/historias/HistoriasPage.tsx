import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistoriasStore } from '../../store/historias.store';
import { TipoPlantilla } from '../../types/historias.types';

const TIPO_LABELS: Record<TipoPlantilla, string> = {
  [TipoPlantilla.ANAMNESIS]: 'Anamnesis',
  [TipoPlantilla.EVOLUCION]: 'Evolución',
  [TipoPlantilla.CIERRE]: 'Cierre',
  [TipoPlantilla.LIBRE]: 'Libre',
};

export function HistoriasPage() {
  const { historias, loading, error, filtros, fetchHistorias, setFiltros, eliminarHistoria } = useHistoriasStore();

  useEffect(() => {
    fetchHistorias();
  }, [filtros]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Historias Clínicas</h1>
        <Link
          to="/historias/nueva"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nueva Historia
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Filtrar por paciente..."
            className="border rounded-lg px-3 py-2"
            value={filtros.pacienteId ?? ''}
            onChange={(e) => setFiltros({ pacienteId: e.target.value || undefined })}
          />
          <select
            className="border rounded-lg px-3 py-2"
            value={filtros.tipoPlantilla ?? ''}
            onChange={(e) => setFiltros({ tipoPlantilla: (e.target.value as TipoPlantilla) || undefined })}
          >
            <option value="">Todos los tipos</option>
            {Object.values(TipoPlantilla).map((t) => (
              <option key={t} value={t}>{TIPO_LABELS[t]}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesional</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">Cargando...</td>
              </tr>
            ) : historias.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No hay historias clínicas</td>
              </tr>
            ) : (
              historias.map((historia) => (
                <tr key={historia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(historia.fecha).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {historia.paciente?.nombre ?? historia.pacienteId}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {TIPO_LABELS[historia.tipoPlantilla]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {historia.profesional?.nombre ?? '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      historia.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {historia.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/historias/${historia.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => eliminarHistoria(historia.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}