import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Ensure this matches your configuration
    });
  }

  async validate(payload: any) {
    console.log('JWT payload in strategy:', payload);
    
    const user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    console.log('User object created in JwtStrategy:', user);
    return user;
  }
}
