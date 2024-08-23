import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {}

  // check if user exists in db
  async validateUser(username: string, password: string): Promise<unknown | null> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null
  }

  
}
