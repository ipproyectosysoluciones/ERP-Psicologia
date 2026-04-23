import { IsString, IsNotEmpty, IsEnum, IsObject, IsOptional } from 'class-validator';
import { TipoPlantilla } from '@erp/shared';

export class PlantillaCampoDto {
  @IsString()
  key!: string;

  @IsString()
  label!: string;

  @IsString()
  type!: 'text' | 'textarea' | 'select' | 'date' | 'number';

  @IsString()
  @IsOptional()
  required?: boolean;

  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @IsString()
  @IsOptional()
  placeholder?: string;
}

export class CreatePlantillaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEnum(TipoPlantilla)
  @IsNotEmpty()
  tipo!: TipoPlantilla;

  @IsObject()
  @IsNotEmpty()
  estructura!: { campos: Array<{ key: string; label: string; type: string; required?: boolean; options?: string[]; placeholder?: string }> };
}