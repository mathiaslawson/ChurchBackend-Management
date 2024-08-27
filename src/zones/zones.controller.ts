import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Role } from 'src/users/enums/role.enums';
import { Roles } from 'src/users/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ZoneResponse } from './types';

@Controller('api/v1/zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.ZONE_LEADER)
  @Post()
  async create(@Body() req: CreateZoneDto): Promise<ZoneResponse | null> {
    const zone = this.zonesService.create(req);
    return zone;
  }

  @Get()
  async findAll(): Promise<ZoneResponse | null> {
    // return this.zonesService.findAll();
    return null;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zonesService.remove(+id);
  }
}
