import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    
    if (!user?.userId) {
      throw new ForbiddenException('No autorizado');
    }

    const dbUser = await this.usersService.findById(user.userId);
    
    if (!dbUser) {
      throw new ForbiddenException('Usuario no encontrado');
    }

    if (!dbUser.activo) {
      throw new ForbiddenException('Usuario inactivo');
    }

    const userRole = dbUser.rol?.nombre;
    
    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('No tienes permiso para esta acción');
    }

    return true;
  }
}