import { IsString, IsNotEmpty, IsOptional, IsObject, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPlantilla } from '@erp/shared';

export class CreateHistoriaDto {
  @ApiProperty({
    description: 'Patient UUID / UUID del paciente',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  pacienteId!: string;

  @ApiProperty({
    description: 'Clinical record date (YYYY-MM-DD) / Fecha de la historia (AAAA-MM-DD)',
    example: '2025-04-20',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @ApiProperty({
    description: 'Clinical record content (JSON) / Contenido de la historia (JSON)',
    example: { motivo: 'Consulta de seguimiento', evolucion: 'Paciente estable' },
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  contenido!: Record<string, unknown>;

  @ApiProperty({
    description: 'Template type / Tipo de plantilla',
    enum: TipoPlantilla,
    example: 'EVOLUCION',
  })
  @IsEnum(TipoPlantilla)
  @IsNotEmpty()
  tipoPlantilla!: TipoPlantilla;

  @ApiPropertyOptional({
    description: 'Template UUID (optional) / UUID de plantilla (opcional)',
    type: String,
  })
  @IsString()
  @IsOptional()
  plantillaId?: string;

  @ApiPropertyOptional({
    description: 'Diagnosis / Diagnóstico',
    example: 'Episodio depresivo leve',
    type: String,
  })
  @IsString()
  @IsOptional()
  diagnostico?: string;
}