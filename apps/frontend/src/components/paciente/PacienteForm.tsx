import { useState, type FormEvent } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { CreatePacienteDto } from '../../services/pacientes.service';

interface PacienteFormProps {
  initialData?: Partial<CreatePacienteDto>;
  onSubmit: (data: CreatePacienteDto) => Promise<void>;
  isLoading?: boolean;
}

export function PacienteForm({ initialData, onSubmit, isLoading }: PacienteFormProps) {
  const [formData, setFormData] = useState<CreatePacienteDto>({
    dni: initialData?.dni || '',
    nombre: initialData?.nombre || '',
    apellido: initialData?.apellido || '',
    fechaNac: initialData?.fechaNac || '',
    contacto: initialData?.contacto || '',
    direccion: initialData?.direccion || '',
    obraSocial: initialData?.obraSocial || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CreatePacienteDto) => (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.dni.trim()) newErrors.dni = 'El DNI es requerido';
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        id="dni"
        label="DNI"
        value={formData.dni}
        onInput={handleChange('dni')}
        error={errors.dni}
        required
        disabled={!!initialData?.dni}
      />

      <Input
        id="nombre"
        label="Nombre"
        value={formData.nombre}
        onInput={handleChange('nombre')}
        error={errors.nombre}
        required
      />

      <Input
        id="apellido"
        label="Apellido"
        value={formData.apellido || ''}
        onInput={handleChange('apellido')}
        error={errors.apellido}
      />

      <Input
        id="fechaNac"
        label="Fecha de Nacimiento"
        type="date"
        value={formData.fechaNac || ''}
        onInput={handleChange('fechaNac')}
        error={errors.fechaNac}
      />

      <Input
        id="contacto"
        label="Contacto (email o teléfono)"
        value={formData.contacto || ''}
        onInput={handleChange('contacto')}
        error={errors.contacto}
      />

      <Input
        id="direccion"
        label="Dirección"
        value={formData.direccion || ''}
        onInput={handleChange('direccion')}
        error={errors.direccion}
      />

      <Input
        id="obraSocial"
        label="Obra Social"
        value={formData.obraSocial || ''}
        onInput={handleChange('obraSocial')}
        error={errors.obraSocial}
      />

      <div className="pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}