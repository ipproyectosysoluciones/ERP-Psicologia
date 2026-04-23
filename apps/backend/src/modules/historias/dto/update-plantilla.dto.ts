import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { TipoPlantilla } from '@erp/shared';

export class UpdatePlantillaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(TipoPlantilla)
  @IsOptional()
  tipo?: TipoPlantilla;

  @IsObject()
  @IsOptional()
  estructura?: { campos: Array<{ key: string; label: string; type: string; required?: boolean; options?: string[]; placeholder?: string }> };
}