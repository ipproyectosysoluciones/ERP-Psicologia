import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHistoriasStore } from '../../store/historias.store';
import { usePacientesStore } from '../../store/pacientes.store';
import { TipoPlantilla } from '../../types/historias.types';

const TIPOS = Object.values(TipoPlantilla);
const TIPO_LABELS: Record<TipoPlantilla, string> = {
  [TipoPlantilla.ANAMNESIS]: 'Anamnesis',
  [TipoPlantilla.EVOLUCION]: 'Evolución',
  [TipoPlantilla.CIERRE]: 'Cierre',
  [TipoPlantilla.LIBRE]: 'Libre',
};

const ESTRUCTURA_DEFAULT: Record<string, unknown> = {
  motivo_consulta: '',
  historia_previa: '',
  evaluacion: '',
  diagnostico: '',
  plan_tratamiento: '',
  observaciones: '',
};

interface FormState {
  pacienteId: string;
  profesionalId: string;
  plantillaId: string;
  fecha: string;
  contenido: Record<string, unknown>;
  tipoPlantilla: TipoPlantilla;
  diagnostico: string;
}

export function HistoriaFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { crearHistoria, actualizarHistoria, fetchHistoria, historiaActual, loading, error } = useHistoriasStore();
  const { pacientes, fetchPacientes } = usePacientesStore();

  const initialFecha = new Date().toISOString().split('T')[0] ?? '';
  const [form, setForm] = useState<FormState>({
    pacienteId: '',
    profesionalId: '',
    plantillaId: '',
    fecha: initialFecha,
    contenido: ESTRUCTURA_DEFAULT,
    tipoPlantilla: TipoPlantilla.ANAMNESIS,
    diagnostico: '',
  });

  useEffect(() => {
    fetchPacientes();
    if (id && id !== 'nueva') {
      fetchHistoria(id);
    }
  }, [id]);

  useEffect(() => {
    if (historiaActual) {
      const fechaStr = new Date(historiaActual.fecha).toISOString().split('T')[0] || '';
      setForm({
        pacienteId: historiaActual.pacienteId,
        profesionalId: historiaActual.profesionalId,
        plantillaId: historiaActual.plantillaId ?? '',
        fecha: fechaStr,
        contenido: (historiaActual.contenido as Record<string, unknown>) || ESTRUCTURA_DEFAULT,
        tipoPlantilla: historiaActual.tipoPlantilla,
        diagnostico: historiaActual.diagnostico ?? '',
      });
    }
  }, [historiaActual]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && id !== 'nueva') {
        await actualizarHistoria(id, {
          contenido: form.contenido,
          diagnostico: form.diagnostico || undefined,
        });
      } else {
        await crearHistoria({
          pacienteId: form.pacienteId,
          profesionalId: form.profesionalId || 'default-profesional-id',
          plantillaId: form.plantillaId || undefined,
          fecha: form.fecha,
          contenido: form.contenido,
          tipoPlantilla: form.tipoPlantilla,
          diagnostico: form.diagnostico || undefined,
        });
      }
      navigate('/historias');
    } catch (err) {
      console.error(err);
    }
  };

  const updateContenido = (field: string, value: unknown) => {
    setForm({ ...form, contenido: { ...form.contenido, [field]: value } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id && id !== 'nueva' ? 'Editar Historia Clínica' : 'Nueva Historia Clínica'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paciente *</label>
            <select
              required
              disabled={!!(id && id !== 'nueva')}
              value={form.pacienteId}
              onChange={(e) => setForm({ ...form, pacienteId: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Seleccionar paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
            <input
              type="date"
              required
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Historia *</label>
          <select
            required
            disabled={!!(id && id !== 'nueva')}
            value={form.tipoPlantilla}
            onChange={(e) => setForm({ ...form, tipoPlantilla: e.target.value as TipoPlantilla })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>{TIPO_LABELS[t]}</option>
            ))}
          </select>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-4">Contenido</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de Consulta</label>
              <textarea
                rows={2}
                value={(form.contenido.motivo_consulta as string) ?? ''}
                onChange={(e) => updateContenido('motivo_consulta', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Historia Previa</label>
              <textarea
                rows={3}
                value={(form.contenido.historia_previa as string) ?? ''}
                onChange={(e) => updateContenido('historia_previa', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evaluación</label>
              <textarea
                rows={4}
                value={(form.contenido.evaluacion as string) ?? ''}
                onChange={(e) => updateContenido('evaluacion', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico</label>
              <input
                type="text"
                value={form.diagnostico}
                onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan de Tratamiento</label>
              <textarea
                rows={3}
                value={(form.contenido.plan_tratamiento as string) ?? ''}
                onChange={(e) => updateContenido('plan_tratamiento', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
              <textarea
                rows={2}
                value={(form.contenido.observaciones as string) ?? ''}
                onChange={(e) => updateContenido('observaciones', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
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
            onClick={() => navigate('/historias')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}