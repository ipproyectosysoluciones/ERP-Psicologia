import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLeadsStore } from '../../store/leads.store';
import { LeadEstado } from '../../types/leads.types';

const ESTADO_COLORS: Record<LeadEstado, string> = {
  [LeadEstado.NUEVO]: 'bg-blue-100 text-blue-800',
  [LeadEstado.CONTACTADO]: 'bg-yellow-100 text-yellow-800',
  [LeadEstado.CALIFICADO]: 'bg-green-100 text-green-800',
  [LeadEstado.CONVERTIDO]: 'bg-emerald-100 text-emerald-800',
  [LeadEstado.DESCARTADO]: 'bg-gray-100 text-gray-800',
};

const ESTADO_LABELS: Record<LeadEstado, string> = {
  [LeadEstado.NUEVO]: 'Nuevo',
  [LeadEstado.CONTACTADO]: 'Contactado',
  [LeadEstado.CALIFICADO]: 'Calificado',
  [LeadEstado.CONVERTIDO]: 'Convertido',
  [LeadEstado.DESCARTADO]: 'Descartado',
};

export function LeadsPage() {
  const { leads, loading, error, filtros, fetchLeads, setFiltros, cambiarEstado, eliminarLead } = useLeadsStore();

  useEffect(() => {
    fetchLeads();
  }, [filtros]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <Link
          to="/leads/nuevo"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo Lead
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-4 flex-wrap">
          <select
            className="border rounded-lg px-3 py-2"
            value={filtros.estado ?? ''}
            onChange={(e) => setFiltros({ estado: e.target.value || undefined })}
          >
            <option value="">Todos los estados</option>
            {Object.values(LeadEstado).map((e) => (
              <option key={e} value={e}>{ESTADO_LABELS[e]}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Filtrar por origen..."
            className="border rounded-lg px-3 py-2"
            value={filtros.origen ?? ''}
            onChange={(e) => setFiltros({ origen: e.target.value || undefined })}
          />
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">Cargando...</td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No hay leads</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{lead.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.telefono ?? '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.origen ?? '-'}</td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.estado}
                      onChange={(e) => cambiarEstado(lead.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-medium ${ESTADO_COLORS[lead.estado as LeadEstado] ?? ''}`}
                    >
                      {Object.values(LeadEstado).map((e) => (
                        <option key={e} value={e}>{ESTADO_LABELS[e]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/leads/${lead.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => eliminarLead(lead.id)}
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