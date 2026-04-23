import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from '@erp/shared';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register new user / Registrar nuevo usuario',
    description: `
## English
Create a new user account in the system. Returns access and refresh tokens.

## Español
Crear una nueva cuenta de usuario en el sistema. Retorna tokens de acceso y refresh.
    `,
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered / Usuario registrado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data / Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists / El email ya existe',
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login / Inicio de sesión',
    description: `
## English
Authenticate user with email and password. Returns access and refresh tokens.

## Español
Autenticar usuario con email y contraseña. Retorna tokens de acceso y refresh.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful / Inicio de sesión exitoso',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials / Credenciales inválidas',
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token / Renovar token de acceso',
    description: `
## English
Exchange a valid refresh token for new access and refresh tokens.

## Español
Intercambiar un token de refresh válido por nuevos tokens de acceso y refresh.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed / Tokens renovados',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token / Token de refresh inválido o expirado',
  })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'User logout / Cerrar sesión',
    description: `
## English
Invalidate the current access token by adding it to the blacklist.

## Español
Invalidar el token de acceso actual agregándolo a la lista negra.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully / Cerrado de sesión exitoso',
  })
  async logout(
    @Headers('authorization') authHeader: string,
    @Body('userId') userId: string,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    if (token && userId) {
      await this.authService.logout(token, userId);
    }
    return { message: 'Logged out' };
  }
}