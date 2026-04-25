import { describe, it, expect, vi, beforeEach } from 'vitest';
import { leadsService } from '../leads.service';
import api from '../../../services/api';

// Mock api
vi.mock('../../../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import { api } from '../../../services/api';

describe('LeadsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listar', () => {
    it('should return list of leads', async () => {
      const mockLeads = [
        { id: '1', nombre: 'Juan', email: 'juan@test.com', estado: 'nuevo' },
        { id: '2', nombre: 'Maria', email: 'maria@test.com', estado: 'contactado' },
      ];

      vi.mocked(api.get).mockResolvedValue({ data: mockLeads });

      const result = await leadsService.listar();

      expect(api.get).toHaveBeenCalledWith('/leads');
      expect(result).toEqual(mockLeads);
    });

    it('should filter leads by estado', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: [] });

      await leadsService.listar({ estado: 'nuevo' });

      expect(api.get).toHaveBeenCalledWith('/leads?estado=nuevo');
    });
  });

  describe('crear', () => {
    it('should create a new lead', async () => {
      const newLead = { nombre: 'Test', email: 'test@test.com' };
      const createdLead = { id: '1', ...newLead, estado: 'nuevo' };

      vi.mocked(api.post).mockResolvedValue({ data: createdLead });

      const result = await leadsService.crear(newLead);

      expect(api.post).toHaveBeenCalledWith('/leads', newLead);
      expect(result).toEqual(createdLead);
    });
  });

  describe('actualizar', () => {
    it('should update lead', async () => {
      const update = { nombre: 'Juan Actualizado' };
      const updatedLead = { id: '1', ...update };

      vi.mocked(api.patch).mockResolvedValue({ data: updatedLead });

      const result = await leadsService.actualizar('1', update);

      expect(api.patch).toHaveBeenCalledWith('/leads/1', update);
      expect(result).toEqual(updatedLead);
    });
  });

  describe('cambiarEstado', () => {
    it('should change lead estado', async () => {
      const updatedLead = { id: '1', estado: 'contactado' };

      vi.mocked(api.patch).mockResolvedValue({ data: updatedLead });

      const result = await leadsService.cambiarEstado('1', 'contactado');

      expect(api.patch).toHaveBeenCalledWith('/leads/1/estado/contactado');
      expect(result).toEqual(updatedLead);
    });
  });

  describe('eliminar', () => {
    it('should delete lead', async () => {
      vi.mocked(api.delete).mockResolvedValue({});

      await leadsService.eliminar('1');

      expect(api.delete).toHaveBeenCalledWith('/leads/1');
    });
  });
});