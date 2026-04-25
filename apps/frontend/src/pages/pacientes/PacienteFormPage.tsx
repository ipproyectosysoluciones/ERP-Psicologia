import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePacientesStore } from '../../store/pacientes.store';
import { PacienteForm } from '../../components/paciente/PacienteForm';
import type { CreatePacienteDto } from '../../services/pacientes.service';

export function PacienteFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'nuevo';

  const {
    selectedPaciente,
    isLoading,
    error,
    fetchPaciente,
    createPaciente,
    updatePaciente,
    clearSelected,
  } = usePacientesStore();

  useEffect(() => {
    if (isEditing) {
      fetchPaciente(id!);
    }
    return () => clearSelected();
  }, [id, isEditing, fetchPaciente, clearSelected]);

  const handleSubmit = async (data: CreatePacienteDto) => {
    try {
      if (isEditing && id) {
        await updatePaciente(id, data);
      } else {
        await createPaciente(data);
      }
      navigate('/pacientes');
    } catch (err) {
      // Error already handled in store
    }
  };

  if (isEditing && isLoading && !selectedPaciente) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        {isEditing ? 'Editar Paciente' : 'Nuevo Paciente'}
      </h1>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

      <PacienteForm
        initialData={selectedPaciente || undefined}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}