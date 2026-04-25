import { api } from './api';
import type {
  PlantillaHistoriaDto,
  CreatePlantillaDto,
  UpdatePlantillaDto,
} from '@erp/shared';

export const plantillasService = {
  async getPlantillas(): Promise<PlantillaHistoriaDto[]> {
    const res = await api.get('/historias/plantillas');
    return res.data;
  },

  async getPlantilla(id: string): Promise<PlantillaHistoriaDto> {
    const res = await api.get(`/historias/plantillas/${id}`);
    return res.data;
  },

  async createPlantilla(dto: CreatePlantillaDto): Promise<PlantillaHistoriaDto> {
    const res = await api.post('/historias/plantillas', dto);
    return res.data;
  },

  async updatePlantilla(id: string, dto: UpdatePlantillaDto): Promise<PlantillaHistoriaDto> {
    const res = await api.put(`/historias/plantillas/${id}`, dto);
    return res.data;
  },

  async deletePlantilla(id: string): Promise<void> {
    await api.delete(`/historias/plantillas/${id}`);
  },
};