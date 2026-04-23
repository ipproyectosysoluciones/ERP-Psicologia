import { create } from 'zustand';
import { pacientesService, type Paciente, type CreatePacienteDto, type UpdatePacienteDto } from '../services/pacientes.service';

interface PacientesState {
  pacientes: Paciente[];
  selectedPaciente: Paciente | null;
  isLoading: boolean;
  error: string | null;
  fetchPacientes: () => Promise<void>;
  fetchPaciente: (id: string) => Promise<void>;
  createPaciente: (data: CreatePacienteDto) => Promise<Paciente>;
  updatePaciente: (id: string, data: UpdatePacienteDto) => Promise<Paciente>;
  deletePaciente: (id: string) => Promise<void>;
  clearSelected: () => void;
}

export const usePacientesStore = create<PacientesState>((set, get) => ({
  pacientes: [],
  selectedPaciente: null,
  isLoading: false,
  error: null,

  fetchPacientes: async () => {
    set({ isLoading: true, error: null });
    try {
      const pacientes = await pacientesService.list();
      set({ pacientes, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Error al cargar pacientes' });
    }
  },

  fetchPaciente: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const selectedPaciente = await pacientesService.get(id);
      set({ selectedPaciente, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Error al cargar paciente' });
    }
  },

  createPaciente: async (data: CreatePacienteDto) => {
    set({ isLoading: true, error: null });
    try {
      const newPaciente = await pacientesService.create(data);
      const pacientes = [...get().pacientes, newPaciente];
      set({ pacientes, isLoading: false });
      return newPaciente;
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Error al crear paciente' });
      throw error;
    }
  },

  updatePaciente: async (id: string, data: UpdatePacienteDto) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await pacientesService.update(id, data);
      const pacientes = get().pacientes.map((p) => (p.id === id ? updated : p));
      set({ pacientes, selectedPaciente: updated, isLoading: false });
      return updated;
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Error al actualizar paciente' });
      throw error;
    }
  },

  deletePaciente: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await pacientesService.delete(id);
      const pacientes = get().pacientes.filter((p) => p.id !== id);
      set({ pacientes, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Error al eliminar paciente' });
      throw error;
    }
  },

  clearSelected: () => set({ selectedPaciente: null }),
}));