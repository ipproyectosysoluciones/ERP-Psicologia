import { IsString, IsOptional, IsObject, IsEnum } from 'class-validator';
import { TipoPlantilla } from '@erp/shared';

export class UpdateHistoriaDto {
  @IsObject()
  @IsOptional()
  contenido?: Record<string, unknown>;

  @IsEnum(TipoPlantilla)
  @IsOptional()
  tipoPlantilla?: TipoPlantilla;

  @IsString()
  @IsOptional()
  plantillaId?: string;

  @IsString()
  @IsOptional()
  diagnostico?: string;
}