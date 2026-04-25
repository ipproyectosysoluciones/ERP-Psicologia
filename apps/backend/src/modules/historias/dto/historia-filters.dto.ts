import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class HistoriaFiltersDto {
  @ApiPropertyOptional({
    description: 'Page number (default: 1) / Número de página (por defecto: 1)',
    type: Number,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Items per page (default: 10) / Elementos por página (por defecto: 10)',
    type: Number,
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter by patient ID / Filtrar por ID de paciente',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
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
    description: 'Filter by template type / Filtrar por tipo de plantilla',
    type: String,
    example: 'EVOLUCION',
  })
  @IsString()
  @IsOptional()
  tipoPlantilla?: string;

  @ApiPropertyOptional({
    description: 'Filter from date (YYYY-MM-DD) / Filtrar desde fecha (AAAA-MM-DD)',
    type: String,
    example: '2025-01-01',
  })
  @IsString()
  @IsOptional()
  fechaDesde?: string;

  @ApiPropertyOptional({
    description: 'Filter until date (YYYY-MM-DD) / Filtrar hasta fecha (AAAA-MM-DD)',
    type: String,
    example: '2025-12-31',
  })
  @IsString()
  @IsOptional()
  fechaHasta?: string;
}