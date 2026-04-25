import { create } from 'zustand';
import type { HistoriaClinica, CreateHistoriaDto, UpdateHistoriaDto, HistoriaFilters, PlantillaHistoria } from '../types/historias.types';
import { historiasService } from '../services/historias.service';

interface HistoriasState {
  historias: HistoriaClinica[];
  historiaActual: HistoriaClinica | null;
  plantillas: PlantillaHistoria[];
  loading: boolean;
  error: string | null;
  filtros: HistoriaFilters;

  fetchHistorias: () => Promise<void>;
  fetchHistoria: (id: string) => Promise<void>;
  crearHistoria: (dto: CreateHistoriaDto) => Promise<HistoriaClinica>;
  actualizarHistoria: (id: string, dto: UpdateHistoriaDto) => Promise<void>;
  eliminarHistoria: (id: string) => Promise<void>;
  fetchPlantillas: () => Promise<void>;
  setFiltros: (filtros: Partial<HistoriasState['filtros']>) => void;
  clearError: () => void;
}

export const useHistoriasStore = create<HistoriasState>((set, get) => ({
  historias: [],
  historiaActual: null,
  plantillas: [],
  loading: false,
  error: null,
  filtros: {},

  fetchHistorias: async () => {
    set({ loading: true, error: null });
    try {
      const historias = await historiasService.listar(get().filtros);
      set({ historias, loading: false });
    } catch {
      set({ error: 'Error al cargar historias', loading: false });
    }
  },

  fetchHistoria: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const historiaActual = await historiasService.obtener(id);
      set({ historiaActual, loading: false });
    } catch {
      set({ error: 'Error al cargar historia', loading: false });
    }
  },

  crearHistoria: async (dto: CreateHistoriaDto) => {
    set({ loading: true, error: null });
    try {
      const historia = await historiasService.crear(dto);
      set((s) => ({ historias: [historia, ...s.historias], loading: false }));
      return historia;
    } catch {
      set({ error: 'Error al crear historia', loading: false });
      throw new Error('Error al crear historia');
    }
  },

  actualizarHistoria: async (id: string, dto: UpdateHistoriaDto) => {
    set({ loading: true, error: null });
    try {
      const updated = await historiasService.actualizar(id, dto);
      set((s) => ({
        historias: s.historias.map((h) => (h.id === id ? updated : h)),
        historiaActual: s.historiaActual?.id === id ? updated : s.historiaActual,
        loading: false,
      }));
    } catch {
      set({ error: 'Error al actualizar historia', loading: false });
    }
  },

  eliminarHistoria: async (id: string) => {
    try {
      await historiasService.eliminar(id);
      set((s) => ({
        historias: s.historias.filter((h) => h.id !== id),
        historiaActual: s.historiaActual?.id === id ? null : s.historiaActual,
      }));
    } catch {
      set({ error: 'Error al eliminar historia' });
    }
  },

  fetchPlantillas: async () => {
    try {
      const plantillas = await historiasService.listarPlantillas();
      set({ plantillas });
    } catch {
      set({ error: 'Error al cargar plantillas' });
    }
  },

  setFiltros: (filtros) => {
    set((s) => ({ filtros: { ...s.filtros, ...filtros } }));
  },

  clearError: () => set({ error: null }),
}));