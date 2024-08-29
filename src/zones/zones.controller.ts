import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Role } from 'src/users/enums/role.enums';
import { Roles } from 'src/users/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ZoneResponse } from './types';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Zones')
@Controller('api/v1/zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.ZONE_LEADER)
  @ApiOperation({ summary: 'Create a new zone' })
  @ApiOkResponse({
    description: 'Operation Succesful',
  })
  @Post()
  async create(@Body() req: CreateZoneDto) {
    const zone = this.zonesService.create(req);
    return zone;
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.ZONE_LEADER)
  @ApiOperation({ summary: 'Fetch all available zones' })
  @ApiOkResponse({
    description: 'Operation Succesful',
    type: CreateZoneDto,
    isArray: true
  })
  @Get()
  async findAll(){
    const zone = this.zonesService.findAll();
    return zone;
  }
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.ZONE_LEADER)
  @ApiOperation({ summary: 'Fetch data for specific zone' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id.toString());
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.ZONE_LEADER)
  @ApiOperation({ summary: 'Update Zone' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(id.toString(), updateZoneDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.ZONE_LEADER)
  @ApiOperation({ summary: 'Delete Zone' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zonesService.remove(id.toString());
  }
}
