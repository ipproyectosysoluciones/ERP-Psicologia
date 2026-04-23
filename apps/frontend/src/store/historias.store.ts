import { create } from 'zustand';
import type { HistoriaClinicaDto } from '@erp/shared';
import { historiasService } from '../services/historias.service';

interface HistoriasFilters {
  page?: number;
  limit?: number;
  pacienteId?: string;
  profesionalId?: string;
  tipoPlantilla?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

interface HistoriasState {
  historias: HistoriaClinicaDto[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  filters: HistoriasFilters;
  setFilters: (filters: HistoriasFilters) => void;
  fetchHistorias: () => Promise<void>;
  createHistoria: (data: Partial<HistoriaClinicaDto>) => Promise<void>;
  updateHistoria: (id: string, data: Partial<HistoriaClinicaDto>) => Promise<void>;
  deleteHistoria: (id: string) => Promise<void>;
}

export const useHistoriasStore = create<HistoriasState>((set, get) => ({
  historias: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
  filters: {},

  setFilters: (filters) => {
    set({ filters, page: 1 });
    get().fetchHistorias();
  },

  fetchHistorias: async () => {
    set({ loading: true, error: null });
    try {
      const result = await historiasService.getAll(get().filters);
      set({
        historias: result.data,
        total: result.total,
        page: result.page,
        limit: result.limit,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Error al cargar historias', loading: false });
    }
  },

  createHistoria: async (data) => {
    set({ loading: true, error: null });
    try {
      await historiasService.create(data);
      await get().fetchHistorias();
    } catch (error) {
      set({ error: 'Error al crear historia', loading: false });
    }
  },

  updateHistoria: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await historiasService.update(id, data);
      await get().fetchHistorias();
    } catch (error) {
      set({ error: 'Error al actualizar historia', loading: false });
    }
  },

  deleteHistoria: async (id) => {
    set({ loading: true, error: null });
    try {
      await historiasService.delete(id);
      await get().fetchHistorias();
    } catch (error) {
      set({ error: 'Error al eliminar historia', loading: false });
    }
  },
}));