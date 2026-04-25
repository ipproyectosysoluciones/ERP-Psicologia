export interface HistoriasFilters {
  page?: number;
  limit?: number;
  pacienteId?: string;
  profesionalId?: string;
  tipoPlantilla?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}