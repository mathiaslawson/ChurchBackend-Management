import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enums';
import { Roles } from './roles.decorator';
import { ApiTags } from '@nestjs/swagger';



@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get()
   @Roles(Role.ADMIN, Role.CELL_LEADER, Role.FELLOWSHIP_LEADER, Role.ZONE_LEADER)  
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
