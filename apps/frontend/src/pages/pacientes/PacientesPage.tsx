import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { PacienteList } from '../../components/paciente/PacienteList';
import { usePacientesStore } from '../../store/pacientes.store';

export function PacientesPage() {
  const { pacientes, isLoading, error, fetchPacientes, deletePaciente } = usePacientesStore();

  useEffect(() => {
    fetchPacientes();
  }, [fetchPacientes]);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      await deletePaciente(id);
    }
  };

  if (isLoading && pacientes.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => fetchPacientes()} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
        <Link to="/pacientes/nuevo">
          <Button>Nuevo Paciente</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>
      )}

      <PacienteList pacientes={pacientes} onDelete={handleDelete} />
    </div>
  );
}