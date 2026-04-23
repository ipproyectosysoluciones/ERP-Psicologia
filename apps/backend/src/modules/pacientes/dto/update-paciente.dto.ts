import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class UpdatePacienteDto {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  dni?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  apellido?: string;

  @IsDateString()
  @IsOptional()
  fechaNac?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  contacto?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  direccion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  obraSocial?: string;
}