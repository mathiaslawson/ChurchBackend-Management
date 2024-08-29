import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './users/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { ZonesModule } from './zones/zones.module';
import { FellowshipModule } from './fellowship/fellowship.module';
import { CellsModule } from './cells/cells.module';


@Module({
  imports: [UsersModule, AuthModule, AbilityModule, ZonesModule, FellowshipModule, CellsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, 
    useClass: RolesGuard
  }],
})
export class AppModule {}
