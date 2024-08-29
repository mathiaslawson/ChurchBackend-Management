import { Module } from '@nestjs/common';
import { FellowshipService } from './fellowship.service';
import { FellowshipController } from './fellowship.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FellowshipController],
  providers: [FellowshipService, PrismaService],
})
export class FellowshipModule {}
