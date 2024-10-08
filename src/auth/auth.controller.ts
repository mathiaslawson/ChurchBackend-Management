import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService, User, Me, RegisterResponse } from 'src/users/users.service';
import { LocalAuthGuard } from './local.auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { AuthenticatedGuard } from './authenticated.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from 'src/users/roles.guard';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginAuthDto })
  // @ApiResponse({ status: 200, description: 'User logged in successfully', type: Me })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Request() req: { user: Me }): any {
    return this.authService.login(
      req.user.email,
      req.user.user_id,
      req.user.role,
    );
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterResponse })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() req: CreateUserDto): Promise<RegisterResponse | null> {
    const user = await this.userService.create(req);
    return user;
  }

  @Roles(
    Role.ADMIN,
    Role.CELL_LEADER,
    Role.FELLOWSHIP_LEADER,
    Role.ZONE_LEADER,
    Role.MEMBER,
  )
  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getMe(@Request() req): unknown {
  return req.user;
  }
}