import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum LeadEstado {
  NUEVO = 'nuevo',
  CONTACTADO = 'contactado',
  CALIFICADO = 'calificado',
  CONVERTIDO = 'convertido',
  DESCARTADO = 'descartado',
}

export class CreateLeadDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  nombre!: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: '+5491155555555' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'landing-psicologia' })
  @IsOptional()
  @IsString()
  origen?: string;

  @ApiPropertyOptional({ example: 'campania-verano-2025' })
  @IsOptional()
  @IsString()
  campaign?: string;

  @ApiPropertyOptional({ enum: LeadEstado, example: LeadEstado.NUEVO })
  @IsOptional()
  @IsEnum(LeadEstado)
  estado?: LeadEstado;
}

export class UpdateLeadDto {
  @ApiPropertyOptional({ example: 'Juan Pérez' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'juan@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+5491155555555' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ enum: LeadEstado, example: LeadEstado.CONTACTADO })
  @IsOptional()
  @IsEnum(LeadEstado)
  estado?: LeadEstado;

  @ApiPropertyOptional({ example: 'Interesado en terapia de pareja' })
  @IsOptional()
  @IsString()
  notas?: string;
}

export class LeadQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  origen?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  campaign?: string;
}