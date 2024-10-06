import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    console.log('JwtAuthGuard handleRequest:', { err, user, info });
    if (err || !user) {
      throw err || new UnauthorizedException('User not authenticated');
    }
    const request = context.switchToHttp().getRequest();
    request.user = user;
    console.log('User attached to request:', request.user);
    return user;
  }
}