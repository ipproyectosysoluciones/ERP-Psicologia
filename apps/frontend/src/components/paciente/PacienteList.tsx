import { Link } from 'react-router-dom';
import type { Paciente } from '../../services/pacientes.service';

interface PacienteListProps {
  pacientes: Paciente[];
  onDelete?: (id: string) => void;
}

export function PacienteList({ pacientes, onDelete }: PacienteListProps) {
  if (pacientes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay pacientes registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DNI
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Obra Social
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pacientes.map((paciente) => (
            <tr key={paciente.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paciente.dni}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {paciente.apellido} {paciente.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {paciente.contacto || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {paciente.obraSocial || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Link
                  to={`/pacientes/${paciente.id}/editar`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Editar
                </Link>
                {onDelete && (
                  <button
                    onClick={() => onDelete(paciente.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}