import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enums';

@Controller('api/v1/cells')
export class CellsController {
  constructor(private readonly cellsService: CellsService) {}

 @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.CELL_LEADER)
  @Post()
  async create(@Body() req: CreateCellDto) {
    const zone = this.cellsService.create(req);
    return zone;
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.CELL_LEADER)
  @Get()
  async findAll(){
    const zone = this.cellsService.findAll();
    return zone;
  }
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.CELL_LEADER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cellsService.findOne(id.toString());
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.CELL_LEADER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateCellDto) {
    return this.cellsService.update(id.toString(), updateZoneDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN, Role.CELL_LEADER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cellsService.remove(id.toString());
  }
}
