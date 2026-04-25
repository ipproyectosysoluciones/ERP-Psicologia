import { api } from './api';

export interface Paciente {
  id: string;
  dni: string;
  nombre: string;
  apellido?: string;
  fechaNac?: string;
  contacto?: string;
  direccion?: string;
  obraSocial?: string;
  activo: boolean;
}

export interface CreatePacienteDto {
  dni: string;
  nombre: string;
  apellido?: string;
  fechaNac?: string;
  contacto?: string;
  direccion?: string;
  obraSocial?: string;
}

export interface UpdatePacienteDto extends Partial<CreatePacienteDto> {}

export const pacientesService = {
  list: async (): Promise<Paciente[]> => {
    const res = await api.get<Paciente[]>('/pacientes');
    return res.data;
  },

  get: async (id: string): Promise<Paciente> => {
    const res = await api.get<Paciente>(`/pacientes/${id}`);
    return res.data;
  },

  create: async (data: CreatePacienteDto): Promise<Paciente> => {
    const res = await api.post<Paciente>('/pacientes', data);
    return res.data;
  },

  update: async (id: string, data: UpdatePacienteDto): Promise<Paciente> => {
    const res = await api.put<Paciente>(`/pacientes/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/pacientes/${id}`);
  },
};