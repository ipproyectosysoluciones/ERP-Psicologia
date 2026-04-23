import { IsString, IsNotEmpty, IsOptional, IsObject, IsEnum, IsDateString } from 'class-validator';
import { TipoPlantilla } from '@erp/shared';

export class CreateHistoriaDto {
  @IsString()
  @IsNotEmpty()
  pacienteId!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsObject()
  @IsNotEmpty()
  contenido!: Record<string, unknown>;

  @IsEnum(TipoPlantilla)
  @IsNotEmpty()
  tipoPlantilla!: TipoPlantilla;

  @IsString()
  @IsOptional()
  plantillaId?: string;

  @IsString()
  @IsOptional()
  diagnostico?: string;
}