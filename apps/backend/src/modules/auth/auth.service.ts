import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { TokenBlacklistService } from './token-blacklist.service';
import { RegisterDto, LoginDto, AuthTokens } from '@erp/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklist: TokenBlacklistService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

    return user;
  }

  async register(dto: RegisterDto): Promise<AuthTokens> {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email y password son requeridos');
    }

    if (dto.password.length < 8) {
      throw new BadRequestException('La password debe tener al menos 8 caracteres');
    }

    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
      nombre: dto.nombre,
      apellido: dto.apellido,
      rol: dto.rol || 'USER',
    });

    const tokens = this.generateTokens(user.id, user.rol?.nombre || 'USER');
    return tokens;
  }

  async login(dto: LoginDto): Promise<AuthTokens> {
    const user = await this.validateUser(dto.email, dto.password);
    const tokens = this.generateTokens(user.id, user.rol?.nombre || 'USER');
    return tokens;
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      
      if (this.tokenBlacklist.isRevoked(payload.jti, payload.sub)) {
        throw new UnauthorizedException('Token revocado');
      }

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.activo) {
        throw new UnauthorizedException('Usuario no encontrado o inactivo');
      }

      const tokens = this.generateTokens(user.id, user.rol?.nombre || 'USER');
      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async logout(accessToken: string, _userId: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(accessToken);
      this.tokenBlacklist.revoke(payload.jti, payload.sub, 60);
    } catch {
      // Token inválido o expirado - logout idempotente
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private generateTokens(userId: string, role: string): AuthTokens {
    const jti = uuidv4();
    const accessToken = this.jwtService.sign(
      { sub: userId, role, jti },
      { expiresIn: '15m' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId, role, jti },
      { expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
  }
}