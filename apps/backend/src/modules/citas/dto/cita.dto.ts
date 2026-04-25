import { IsString, IsOptional, IsDateString, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoCita, EstadoCita } from '@erp/shared';

export class CreateCitaDto {
  @ApiProperty({
    description: 'Patient UUID / UUID del paciente',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  pacienteId!: string;

  @ApiProperty({
    description: 'Professional (psychologist/psychiatrist) UUID / UUID del profesional',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  profesionalId!: string;

  @ApiProperty({
    description: 'Appointment date (YYYY-MM-DD) / Fecha de la cita (AAAA-MM-DD)',
    example: '2025-04-25',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @ApiProperty({
    description: 'Start time (HH:MM) / Hora de inicio (HH:MM)',
    example: '10:00',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  horaInicio!: string;

  @ApiPropertyOptional({
    description: 'End time (HH:MM) / Hora de fin (HH:MM)',
    example: '10:50',
    type: String,
    maxLength: 5,
  })
  @IsString()
  @IsOptional()
  @MaxLength(5)
  horaFin?: string;

  @ApiPropertyOptional({
    description: 'Appointment type / Tipo de cita',
    enum: TipoCita,
    default: 'presencial',
  })
  @IsEnum(TipoCita)
  @IsOptional()
  tipo?: 'presencial' | 'telemedicina';

  @ApiProperty({
    description: 'Reason for appointment / Motivo de la cita',
    example: 'Consulta de seguimiento',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @ApiPropertyOptional({
    description: 'Additional notes / Notas adicionales',
    type: String,
  })
  @IsString()
  @IsOptional()
  notas?: string;
}

export class UpdateCitaDto {
  @ApiPropertyOptional({
    description: 'Appointment date (YYYY-MM-DD) / Fecha de la cita',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @ApiPropertyOptional({
    description: 'Start time (HH:MM) / Hora de inicio',
    type: String,
    maxLength: 5,
  })
  @IsString()
  @IsOptional()
  @MaxLength(5)
  horaInicio?: string;

  @ApiPropertyOptional({
    description: 'End time (HH:MM) / Hora de fin',
    type: String,
    maxLength: 5,
  })
  @IsString()
  @IsOptional()
  @MaxLength(5)
  horaFin?: string;

  @ApiPropertyOptional({
    description: 'Appointment type / Tipo de cita',
    enum: TipoCita,
  })
  @IsEnum(TipoCita)
  @IsOptional()
  tipo?: 'presencial' | 'telemedicina';

  @ApiPropertyOptional({
    description: 'Appointment status / Estado de la cita',
    enum: EstadoCita,
  })
  @IsEnum(EstadoCita)
  @IsOptional()
  estado?: 'programada' | 'confirmada' | 'completada' | 'cancelada' | 'no-asistio';

  @ApiPropertyOptional({
    description: 'Reason for appointment / Motivo',
    type: String,
  })
  @IsString()
  @IsOptional()
  motivo?: string;

  @ApiPropertyOptional({
    description: 'Additional notes / Notas adicionales',
    type: String,
  })
  @IsString()
  @IsOptional()
  notas?: string;
}

export class CitaFiltersDto {
  @ApiPropertyOptional({
    description: 'Page number / Número de página',
    type: Number,
    default: 1,
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'Items per page / Elementos por página',
    type: Number,
    default: 10,
  })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter by patient ID / Filtrar por ID de paciente',
    type: String,
  })
  @IsString()
  @IsOptional()
  pacienteId?: string;

  @ApiPropertyOptional({
    description: 'Filter by professional ID / Filtrar por ID de profesional',
    type: String,
  })
  @IsString()
  @IsOptional()
  profesionalId?: string;

  @ApiPropertyOptional({
    description: 'Filter by specific date / Filtrar por fecha específica',
    type: String,
    example: '2025-04-25',
  })
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @ApiPropertyOptional({
    description: 'Filter from date / Filtrar desde fecha',
    type: String,
    example: '2025-04-01',
  })
  @IsDateString()
  @IsOptional()
  fechaDesde?: string;

  @ApiPropertyOptional({
    description: 'Filter until date / Filtrar hasta fecha',
    type: String,
    example: '2025-04-30',
  })
  @IsDateString()
  @IsOptional()
  fechaHasta?: string;

  @ApiPropertyOptional({
    description: 'Filter by status / Filtrar por estado',
    enum: EstadoCita,
  })
  @IsEnum(EstadoCita)
  @IsOptional()
  estado?: string;
}