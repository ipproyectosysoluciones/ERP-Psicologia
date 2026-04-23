export interface CreatePacienteDto {
  dni: string;
  nombre: string;
  apellido?: string;
  fechaNac?: string;
  contacto?: string;
  direccion?: string;
  obraSocial?: string;
}

export interface UpdatePacienteDto {
  dni?: string;
  nombre?: string;
  apellido?: string;
  fechaNac?: string;
  contacto?: string;
  direccion?: string;
  obraSocial?: string;
}

export interface PacienteResponse {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNac: string;
  contacto: string;
  direccion: string;
  obraSocial: string;
  activo: boolean;
}