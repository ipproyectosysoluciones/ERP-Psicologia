import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLeadsStore } from '../leads.store';

// Mock leadsService
vi.mock('../services/leads.service', () => ({
  leadsService: {
    listar: vi.fn(),
    obtener: vi.fn(),
    crear: vi.fn(),
    actualizar: vi.fn(),
    cambiarEstado: vi.fn(),
    eliminar: vi.fn(),
  },
}));

import { leadsService } from '../services/leads.service';
import type { Lead } from '../types/leads.types';

const mockLeads: Lead[] = [
  { id: '1', nombre: 'Juan', email: 'juan@test.com', estado: 'nuevo' as const },
  { id: '2', nombre: 'Maria', email: 'maria@test.com', estado: 'contactado' as const },
];

describe('useLeadsStore', () => {
  beforeEach(() => {
    // Reset store state
    const store = useLeadsStore.getState();
    store.clearError();
    vi.clearAllMocks();
  });

  describe('fetchLeads', () => {
    it('should fetch leads and update state', async () => {
      vi.mocked(leadsService.listar).mockResolvedValue(mockLeads);

      await useLeadsStore.getState().fetchLeads();

      const state = useLeadsStore.getState();
      expect(state.leads).toEqual(mockLeads);
      expect(state.loading).toBe(false);
    });

    it('should handle fetch error', async () => {
      vi.mocked(leadsService.listar).mockRejectedValue(new Error('Error'));

      await useLeadsStore.getState().fetchLeads();

      const state = useLeadsStore.getState();
      expect(state.error).toBe('Error al cargar leads');
    });
  });

  describe('crearLead', () => {
    it('should create lead and add to list', async () => {
      const newLead = { nombre: 'Test', email: 'test@test.com' };
      const createdLead = { id: '3', ...newLead, estado: 'nuevo' as const };

      vi.mocked(leadsService.crear).mockResolvedValue(createdLead);

      const result = await useLeadsStore.getState().crearLead(newLead);

      expect(result).toEqual(createdLead);
      expect(useLeadsStore.getState().leads[0]).toEqual(createdLead);
    });
  });

  describe('eliminarLead', () => {
    it('should remove lead from list', async () => {
      vi.mocked(leadsService.eliminar).mockResolvedValue();

      // Set initial state
      useLeadsStore.setState({ leads: mockLeads });

      await useLeadsStore.getState().eliminarLead('1');

      expect(useLeadsStore.getState().leads.length).toBe(1);
      expect(useLeadsStore.getState().leads[0].id).toBe('2');
    });
  });

  describe('setFiltros', () => {
    it('should update filtros', () => {
      useLeadsStore.getState().setFiltros({ estado: 'nuevo' });

      expect(useLeadsStore.getState().filtros.estado).toBe('nuevo');
    });
  });

  describe('clearError', () => {
    it('should clear error', () => {
      useLeadsStore.setState({ error: 'Test error' });

      useLeadsStore.getState().clearError();

      expect(useLeadsStore.getState().error).toBeNull();
    });
  });
});