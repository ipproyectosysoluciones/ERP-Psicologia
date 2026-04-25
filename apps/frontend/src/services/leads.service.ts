import { api } from './api';
import type { Lead, CreateLeadDto, UpdateLeadDto } from '../types/leads.types';

export const leadsService = {
  async listar(filtros?: { estado?: string; origen?: string; campaign?: string }): Promise<Lead[]> {
    const params = new URLSearchParams();
    if (filtros?.estado) params.append('estado', filtros.estado);
    if (filtros?.origen) params.append('origen', filtros.origen);
    if (filtros?.campaign) params.append('campaign', filtros.campaign);
    const query = params.toString() ? `?${params.toString()}` : '';
    const { data } = await api.get<Lead[]>(`/leads${query}`);
    return data;
  },

  async obtener(id: string): Promise<Lead> {
    const { data } = await api.get<Lead>(`/leads/${id}`);
    return data;
  },

  async crear(dto: CreateLeadDto): Promise<Lead> {
    const { data } = await api.post<Lead>('/leads', dto);
    return data;
  },

  async actualizar(id: string, dto: UpdateLeadDto): Promise<Lead> {
    const { data } = await api.patch<Lead>(`/leads/${id}`, dto);
    return data;
  },

  async cambiarEstado(id: string, estado: string): Promise<Lead> {
    const { data } = await api.patch<Lead>(`/leads/${id}/estado/${estado}`);
    return data;
  },

  async eliminar(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },
};