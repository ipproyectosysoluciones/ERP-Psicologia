import type { ERPAppointment, ERPPatient, AvailabilityResponse } from '../types/index.js';

export class ERPService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ERP API Error: ${response.status} - ${error}`);
    }

    return response.json() as Promise<T>;
  }

  async getPatientByPhone(phone: string): Promise<ERPPatient | null> {
    try {
      const result = await this.request<{ data: ERPPatient[] }>(
        `/api/pacientes?contacto=${encodeURIComponent(phone)}`
      );
      return result.data?.[0] ?? null;
    } catch {
      return null;
    }
  }

  async getAvailability(profesionalId: string, fecha: string): Promise<AvailabilityResponse> {
    return this.request<AvailabilityResponse>(
      `/api/citas/disponibilidad/${profesionalId}?fecha=${fecha}`
    );
  }

  async createAppointment(data: {
    pacienteId: string;
    profesionalId: string;
    fecha: string;
    horaInicio: string;
    motivo: string;
    tipo?: 'presencial' | 'telemedicina';
  }): Promise<ERPAppointment> {
    return this.request<ERPAppointment>('/api/citas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfesionales(): Promise<{ id: string; nombre: string; apellido: string }[]> {
    const result = await this.request<{ data: { id: string; nombre: string; apellido: string }[] }>(
      '/api/usuarios?rol=PSICOLOGO,PSIQUIATRA'
    );
    return result.data ?? [];
  }
}