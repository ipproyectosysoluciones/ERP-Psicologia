import { api } from './api';
import type { HistoriaClinica, CreateHistoriaDto, UpdateHistoriaDto, HistoriaFilters, PlantillaHistoria } from '../types/historias.types';

export const historiasService = {
  async listar(filtros?: HistoriaFilters): Promise<HistoriaClinica[]> {
    const params = new URLSearchParams();
    if (filtros?.pacienteId) params.append('pacienteId', filtros.pacienteId);
    if (filtros?.profesionalId) params.append('profesionalId', filtros.profesionalId);
    if (filtros?.fecha) params.append('fecha', filtros.fecha);
    if (filtros?.tipoPlantilla) params.append('tipoPlantilla', filtros.tipoPlantilla);
    const query = params.toString() ? `?${params.toString()}` : '';
    const { data } = await api.get<HistoriaClinica[]>(`/historias${query}`);
    return data;
  },

  async obtener(id: string): Promise<HistoriaClinica> {
    const { data } = await api.get<HistoriaClinica>(`/historias/${id}`);
    return data;
  },

  async crear(dto: CreateHistoriaDto): Promise<HistoriaClinica> {
    const { data } = await api.post<HistoriaClinica>('/historias', dto);
    return data;
  },

  async actualizar(id: string, dto: UpdateHistoriaDto): Promise<HistoriaClinica> {
    const { data } = await api.patch<HistoriaClinica>(`/historias/${id}`, dto);
    return data;
  },

  async eliminar(id: string): Promise<void> {
    await api.delete(`/historias/${id}`);
  },

  async listarPlantillas(): Promise<PlantillaHistoria[]> {
    const { data } = await api.get<PlantillaHistoria[]>('/plantillas');
    return data;
  },

  async obtenerPlantilla(id: string): Promise<PlantillaHistoria> {
    const { data } = await api.get<PlantillaHistoria>(`/plantillas/${id}`);
    return data;
  },
};