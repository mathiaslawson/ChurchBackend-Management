import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FellowshipService } from './fellowship.service';
import { CreateFellowshipDto } from './dto/create-fellowship.dto';
import { UpdateFellowshipDto } from './dto/update-fellowship.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Role } from 'src/users/enums/role.enums';
import { Roles } from 'src/users/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/users/roles.guard';

@Controller('api/v1/fellowships')
export class FellowshipController {
  constructor(private readonly fellowshipService: FellowshipService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FELLOWSHIP_LEADER)
  @Post()
  async create(@Body() req: CreateFellowshipDto) {
    const zone = this.fellowshipService.create(req);
    return zone;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FELLOWSHIP_LEADER)
  @Get()
  async findAll() {
    const zone = this.fellowshipService.findAll();
    return zone;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FELLOWSHIP_LEADER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fellowshipService.findOne(id.toString());
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FELLOWSHIP_LEADER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateFellowshipDto) {
    return this.fellowshipService.update(id.toString(), updateZoneDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FELLOWSHIP_LEADER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fellowshipService.remove(id.toString());
  }
}
