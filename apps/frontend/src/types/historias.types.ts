export enum TipoPlantilla {
  ANAMNESIS = 'ANAMNESIS',
  EVOLUCION = 'EVOLUCION',
  CIERRE = 'CIERRE',
  LIBRE = 'LIBRE',
}

export interface HistoriaClinica {
  id: string;
  pacienteId: string;
  profesionalId: string;
  plantillaId?: string;
  fecha: string;
  contenido: Record<string, unknown>;
  tipoPlantilla: TipoPlantilla;
  diagnostico?: string;
  activa: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  paciente?: Paciente;
  profesional?: Usuario;
  plantilla?: PlantillaHistoria;
}

export interface CreateHistoriaDto {
  pacienteId: string;
  profesionalId: string;
  plantillaId?: string;
  fecha: string;
  contenido: Record<string, unknown>;
  tipoPlantilla: TipoPlantilla;
  diagnostico?: string;
}

export interface UpdateHistoriaDto {
  contenido?: Record<string, unknown>;
  diagnostico?: string;
  activa?: boolean;
}

export interface HistoriaFilters {
  pacienteId?: string;
  profesionalId?: string;
  fecha?: string;
  tipoPlantilla?: TipoPlantilla;
  activa?: boolean;
}

export interface Paciente {
  id: string;
  nombre: string;
  dni: string;
  email?: string;
  telefono?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export interface PlantillaHistoria {
  id: string;
  nombre: string;
  tipo: TipoPlantilla;
  estructura: Record<string, unknown>;
}