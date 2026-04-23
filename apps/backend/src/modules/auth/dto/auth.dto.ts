import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address / Correo electrónico del usuario',
    example: 'admin@clinic.com',
    type: String,
  })
  @IsEmail()
  declare email: string;

  @ApiProperty({
    description: 'User password / Contraseña del usuario',
    example: 'password123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  declare password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'User first name / Nombre del usuario',
    example: 'Juan',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  declare nombre: string;

  @ApiProperty({
    description: 'User last name / Apellido del usuario',
    example: 'Pérez',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  declare apellido: string;

  @ApiProperty({
    description: 'User email address / Correo electrónico del usuario',
    example: 'juan.perez@clinic.com',
    type: String,
  })
  @IsEmail()
  declare email: string;

  @ApiProperty({
    description: 'User password (min 8 characters) / Contraseña del usuario (mínimo 8 caracteres)',
    example: 'password123',
    type: String,
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  declare password: string;
}
