export enum LeadEstado {
  NUEVO = 'nuevo',
  CONTACTADO = 'contactado',
  CALIFICADO = 'calificado',
  CONVERTIDO = 'convertido',
  DESCARTADO = 'descartado',
}

export interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  origen?: string;
  campaign?: string;
  estado: LeadEstado;
  notas?: string;
  ultimoContacto?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateLeadDto {
  nombre: string;
  email: string;
  telefono?: string;
  origen?: string;
  campaign?: string;
  estado?: LeadEstado;
}

export interface UpdateLeadDto {
  nombre?: string;
  email?: string;
  telefono?: string;
  estado?: LeadEstado;
  notas?: string;
}

export interface LeadQueryDto {
  estado?: string;
  origen?: string;
  campaign?: string;
}