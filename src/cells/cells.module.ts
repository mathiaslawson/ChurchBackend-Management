import { Module } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CellsController],
  providers: [CellsService, PrismaService],
})
export class CellsModule {}
