export interface ChatMessage {
  id: string;
  from: string;
  body: string;
  name: string;
  timestamp: number;
}

export interface ChatContext {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  pushName: string;
  message: Record<string, unknown>;
  messageTimestamp: number | string;
}

export interface ERPAppointment {
  id: string;
  pacienteId: string;
  profesionalId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  tipo: 'presencial' | 'telemedicina';
  estado: string;
  motivo: string;
}

export interface ERPPatient {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  contacto: string;
}

export interface AvailabilitySlot {
  hora: string;
  disponible: boolean;
}

export interface AvailabilityResponse {
  fecha: string;
  profesionalId: string;
  slots: AvailabilitySlot[];
}

export interface ChatBotConfig {
  port: number;
  provider: 'baileys' | 'meta' | 'twilio';
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  openai: {
    apiKey: string;
    model: string;
    temperature: number;
  };
  erp: {
    baseUrl: string;
    apiKey: string;
  };
}