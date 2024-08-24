import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local.auth.guard';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { User, UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Public } from '@prisma/client/runtime/library';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): unknown {
    return req.user;
  }

  
  @Post('register')
  async register(@Body() req: CreateUserDto): Promise<User | null> {
    const user = await this.usersService.create(req);
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string{
    return req.user
  }
}
