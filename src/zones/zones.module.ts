import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ZonesController],
  providers: [ZonesService, PrismaService],
})
export class ZonesModule {}
