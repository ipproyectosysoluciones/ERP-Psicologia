import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  declare email: string;

  @IsString()
  @IsNotEmpty()
  declare password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  declare nombre: string;

  @IsString()
  @IsNotEmpty()
  declare apellido: string;

  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(8)
  declare password: string;
}
