import { IsString, IsOptional, IsDateString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({
    description: 'Patient DNI (unique) / DNI del paciente (único)',
    example: '12345678',
    type: String,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  dni!: string;

  @ApiProperty({
    description: 'Patient first name / Nombre del paciente',
    example: 'María',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Patient last name / Apellido del paciente',
    example: 'García',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  apellido?: string;

  @ApiPropertyOptional({
    description: 'Date of birth (YYYY-MM-DD) / Fecha de nacimiento (AAAA-MM-DD)',
    example: '1990-05-15',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  fechaNac?: string;

  @ApiPropertyOptional({
    description: 'Contact info (email or phone) / Información de contacto (email o teléfono)',
    example: 'maria.garcia@email.com',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  contacto?: string;

  @ApiPropertyOptional({
    description: 'Home address / Dirección residencial',
    example: 'Calle Principal 123, Ciudad',
    type: String,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Health insurance / Obra social',
    example: 'OSDE',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  obraSocial?: string;
}

export class UpdatePacienteDto {
  @ApiPropertyOptional({
    description: 'Patient DNI (unique) / DNI del paciente (único)',
    example: '12345678',
    type: String,
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  dni?: string;

  @ApiPropertyOptional({
    description: 'Patient first name / Nombre del paciente',
    example: 'María',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Patient last name / Apellido del paciente',
    example: 'García',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  apellido?: string;

  @ApiPropertyOptional({
    description: 'Date of birth (YYYY-MM-DD) / Fecha de nacimiento (AAAA-MM-DD)',
    example: '1990-05-15',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  fechaNac?: string;

  @ApiPropertyOptional({
    description: 'Contact info (email or phone) / Información de contacto (email o teléfono)',
    example: 'maria.garcia@email.com',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  contacto?: string;

  @ApiPropertyOptional({
    description: 'Home address / Dirección residencial',
    example: 'Calle Principal 123, Ciudad',
    type: String,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Health insurance / Obra social',
    example: 'OSDE',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  obraSocial?: string;
}

export interface PacienteResponse {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNac: string;
  contacto: string;
  direccion: string;
  obraSocial: string;
  activo: boolean;
}