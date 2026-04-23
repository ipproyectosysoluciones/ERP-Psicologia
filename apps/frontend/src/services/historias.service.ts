import { api } from './api';
import type { HistoriaClinicaDto } from '@erp/shared';

export const historiasService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    pacienteId?: string;
    profesionalId?: string;
    tipoPlantilla?: string;
    fechaDesde?: string;
    fechaHasta?: string;
  }): Promise<{ data: HistoriaClinicaDto[]; total: number; page: number; limit: number }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) searchParams.set(k, String(v));
      });
    }
    const res = await api.get(`/historias?${searchParams}`);
    return res.data;
  },

  async get(id: string): Promise<HistoriaClinicaDto> {
    const res = await api.get(`/historias/${id}`);
    return res.data;
  },

  async create(data: Partial<HistoriaClinicaDto>): Promise<HistoriaClinicaDto> {
    const res = await api.post('/historias', data);
    return res.data;
  },

  async update(id: string, data: Partial<HistoriaClinicaDto>): Promise<HistoriaClinicaDto> {
    const res = await api.put(`/historias/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/historias/${id}`);
  },

  async getByPaciente(pacienteId: string): Promise<HistoriaClinicaDto[]> {
    const res = await api.get(`/historias/paciente/${pacienteId}`);
    return res.data;
  },
};