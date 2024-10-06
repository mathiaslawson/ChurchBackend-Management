import { Module } from '@nestjs/common';
import { FellowshipService } from './fellowship.service';
import { FellowshipController } from './fellowship.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [FellowshipController],
  providers: [FellowshipService, PrismaService, JwtStrategy],
})
export class FellowshipModule {}
