import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // check if user exists in db
  async validateUser(email: string, password: string): Promise<unknown | null> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return new NotFoundException('User not found');
    }
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }

    delete (user as Partial<User>).password;

    return user;
  }

  async login(email: string, id: string, role: string) {
    const payload = { email, sub: id, role };

    return {
      access_token: this.jwtService.sign(payload),
      email, 
      role, 
    };
  }
}
