import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLeadsStore } from '../../store/leads.store';
import { LeadEstado } from '../../types/leads.types';

const ORIGENES = ['landing-web', 'whatsapp', 'facebook', 'instagram', 'google-ads', 'referido', 'otro'];

export function LeadFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { crearLead, actualizarLead, fetchLead, leadActual, loading, error } = useLeadsStore();

  const [form, setForm] = useState<{
    nombre: string;
    email: string;
    telefono: string;
    origen: string;
    campaign: string;
    estado: LeadEstado;
    notas: string;
  }>({
    nombre: '',
    email: '',
    telefono: '',
    origen: 'landing-web',
    campaign: '',
    estado: LeadEstado.NUEVO,
    notas: '',
  });

  useEffect(() => {
    if (id && id !== 'nuevo') {
      fetchLead(id);
    }
  }, [id]);

  useEffect(() => {
    if (leadActual) {
      setForm({
        nombre: leadActual.nombre,
        email: leadActual.email,
        telefono: leadActual.telefono ?? '',
        origen: leadActual.origen ?? 'landing-web',
        campaign: leadActual.campaign ?? '',
        estado: leadActual.estado,
        notas: leadActual.notas ?? '',
      });
    }
  }, [leadActual]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && id !== 'nuevo') {
        await actualizarLead(id, form);
      } else {
        await crearLead(form as Parameters<typeof crearLead>[0]);
      }
      navigate('/leads');
    } catch {
      // error handled in store
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id && id !== 'nuevo' ? 'Editar Lead' : 'Nuevo Lead'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
            <select
              value={form.origen}
              onChange={(e) => setForm((f) => ({ ...f, origen: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {ORIGENES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaña</label>
            <input
              type="text"
              value={form.campaign}
              onChange={(e) => setForm((f) => ({ ...f, campaign: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={form.estado}
            onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value as LeadEstado }))}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {Object.values(LeadEstado).map((e) => (
              <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
          <textarea
            rows={4}
            value={form.notas}
            onChange={(e) => setForm((f) => ({ ...f, notas: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/leads')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}