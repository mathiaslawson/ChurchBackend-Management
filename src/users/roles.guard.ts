import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/enums/role.enums";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('RolesGuard canActivate triggered');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Roles:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    console.log(user, 'this is the user')

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    console.log('User role:', user.role);

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
