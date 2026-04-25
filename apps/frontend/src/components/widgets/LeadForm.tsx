import { useState } from 'react';
import { leadsService } from '../../services/leads.service';

interface LeadFormProps {
  origen?: string;
  campaign?: string;
  onSuccess?: (lead: { id: string; nombre: string; email: string }) => void;
  variant?: 'embedded' | 'modal';
  className?: string;
}

export function LeadForm({
  origen = 'landing-web',
  campaign = '',
  onSuccess,
  variant = 'embedded',
  className = '',
}: LeadFormProps) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const lead = await leadsService.crear({ ...form, origen, campaign });
      setSuccess(true);
      setForm({ nombre: '', email: '', telefono: '' });
      onSuccess?.(lead);
    } catch {
      setError('Hubo un error. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${className}`}>
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">¡Gracias por contactarnos!</h3>
        <p className="text-green-700 text-sm">
          Un profesional se comunicará con vos a la brevedad.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ¿Listo para dar el primer paso?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Completá tus datos y nos pondremos en contacto con vos.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Tu nombre"
            required
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <input
            type="email"
            placeholder="Tu email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <input
            type="tel"
            placeholder="Tu teléfono (opcional)"
            value={form.telefono}
            onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Enviando...' : 'Quiero que me contacten'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Tu información está protegida y no será compartida.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}