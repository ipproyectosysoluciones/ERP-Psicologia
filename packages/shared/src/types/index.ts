export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  nombre: string;
  apellido?: string;
  rol?: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface LogoutDto {
  accessToken?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface HealthCheck {
  status: 'ok';
  timestamp: string;
}

// ============================================================
// HISTORIAS CLÍNICAS — Tipos
// ============================================================

export interface HistoriaClinicaDto {
  id: string;
  pacienteId: string;
  profesionalId: string;
  plantillaId?: string;
  fecha: string;
  contenido: Record<string, unknown>;
  tipoPlantilla: string;
  diagnostico?: string;
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHistoriaDto {
  pacienteId: string;
  fecha: string;
  contenido: Record<string, unknown>;
  tipoPlantilla: string;
  plantillaId?: string;
  diagnostico?: string;
}

export interface UpdateHistoriaDto {
  contenido?: Record<string, unknown>;
  tipoPlantilla?: string;
  plantillaId?: string;
  diagnostico?: string;
}

export interface HistoriaFiltersDto {
  page?: number;
  limit?: number;
  pacienteId?: string;
  profesionalId?: string;
  tipoPlantilla?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

// ============================================================
// PLANTILLAS — Tipos
// ============================================================

export interface PlantillaCampo {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface PlantillaEstructura {
  campos: PlantillaCampo[];
}

export interface PlantillaHistoriaDto {
  id: string;
  nombre: string;
  tipo: string;
  estructura: PlantillaEstructura;
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePlantillaDto {
  nombre: string;
  tipo: string;
  estructura: PlantillaEstructura;
}

export interface UpdatePlantillaDto {
  nombre?: string;
  tipo?: string;
  estructura?: PlantillaEstructura;
}

// ============================================================
// PACIENTES — Tipos (stub)
// ============================================================

export interface PacienteDto {
  id: string;
  nombre: string;
  dni: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePacienteDto {
  nombre: string;
  dni: string;
}
