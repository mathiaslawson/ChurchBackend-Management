import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService, User, Me } from 'src/users/users.service';
import { LocalAuthGuard } from './local.auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { AuthenticatedGuard } from './authenticated.guard';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: Me }): Me {
    return req.user;
  }

   
  @Post('register')
  async register(@Body() req: CreateUserDto): Promise<User | null> {
    const user = await this.userService.create(req);
    return user;
  }


  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Get('me')
  getMe(@Request() req): unknown{
    return req.user
  }

}
