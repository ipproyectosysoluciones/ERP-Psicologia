import { create } from 'zustand';
import type { Lead, CreateLeadDto, UpdateLeadDto } from '../types/leads.types';
import { leadsService } from '../services/leads.service';

interface LeadsState {
  leads: Lead[];
  leadActual: Lead | null;
  loading: boolean;
  error: string | null;
  filtros: { estado?: string; origen?: string; campaign?: string };

  fetchLeads: () => Promise<void>;
  fetchLead: (id: string) => Promise<void>;
  crearLead: (dto: CreateLeadDto) => Promise<Lead>;
  actualizarLead: (id: string, dto: UpdateLeadDto) => Promise<void>;
  cambiarEstado: (id: string, estado: string) => Promise<void>;
  eliminarLead: (id: string) => Promise<void>;
  setFiltros: (filtros: Partial<LeadsState['filtros']>) => void;
  clearError: () => void;
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: [],
  leadActual: null,
  loading: false,
  error: null,
  filtros: {},

  fetchLeads: async () => {
    set({ loading: true, error: null });
    try {
      const leads = await leadsService.listar(get().filtros);
      set({ leads, loading: false });
    } catch {
      set({ error: 'Error al cargar leads', loading: false });
    }
  },

  fetchLead: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const leadActual = await leadsService.obtener(id);
      set({ leadActual, loading: false });
    } catch {
      set({ error: 'Error al cargar lead', loading: false });
    }
  },

  crearLead: async (dto: CreateLeadDto) => {
    set({ loading: true, error: null });
    try {
      const lead = await leadsService.crear(dto);
      set((s) => ({ leads: [lead, ...s.leads], loading: false }));
      return lead;
    } catch {
      set({ error: 'Error al crear lead', loading: false });
      throw new Error('Error al crear lead');
    }
  },

  actualizarLead: async (id: string, dto: UpdateLeadDto) => {
    set({ loading: true, error: null });
    try {
      const updated = await leadsService.actualizar(id, dto);
      set((s) => ({
        leads: s.leads.map((l) => (l.id === id ? updated : l)),
        leadActual: s.leadActual?.id === id ? updated : s.leadActual,
        loading: false,
      }));
    } catch {
      set({ error: 'Error al actualizar lead', loading: false });
    }
  },

  cambiarEstado: async (id: string, estado: string) => {
    try {
      const updated = await leadsService.cambiarEstado(id, estado);
      set((s) => ({
        leads: s.leads.map((l) => (l.id === id ? updated : l)),
        leadActual: s.leadActual?.id === id ? updated : s.leadActual,
      }));
    } catch {
      set({ error: 'Error al cambiar estado' });
    }
  },

  eliminarLead: async (id: string) => {
    try {
      await leadsService.eliminar(id);
      set((s) => ({
        leads: s.leads.filter((l) => l.id !== id),
        leadActual: s.leadActual?.id === id ? null : s.leadActual,
      }));
    } catch {
      set({ error: 'Error al eliminar lead' });
    }
  },

  setFiltros: (filtros) => {
    set((s) => ({ filtros: { ...s.filtros, ...filtros } }));
  },

  clearError: () => set({ error: null }),
}));