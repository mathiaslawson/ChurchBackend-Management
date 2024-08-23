import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule]
})
export class AuthModule {}
