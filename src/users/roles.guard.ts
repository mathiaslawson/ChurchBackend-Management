import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/enums/role.enums";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

      

        if (!requiredRoles) {
            return true; // No specific roles required, allow access
        }

        const { user } = context.switchToHttp().getRequest();
    
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        return requiredRoles.some((role) => user.role?.includes(role));
    }
}
