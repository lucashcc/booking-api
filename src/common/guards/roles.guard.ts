import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from 'generated/prisma';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!requiredRoles || requiredRoles.length === 0) return true;

    if (user.role === 'ADMIN') return true;

    if (requiredRoles.includes(user.role)) {
      const paramId = request.params.id;

      if (paramId && String(user.id) !== String(paramId)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource.'
        );
      }

      return true;
    }

    return false;
  }
}
