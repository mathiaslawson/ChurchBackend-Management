import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {}

  // check if user exists in db
  async validateUser(email: string, password: string): Promise<unknown | null> {

    console.log(email, password);

    const user = await this.usersService.findOne(email);

    console.log(user)

    if (!user) {
      return new NotFoundException('User not found');
    }


     try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return null;
      }
    } catch (error) {
      return null;
    }

    delete (user as Partial<User>).password;

    return user;
  }

}
