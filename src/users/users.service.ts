import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


export type User = {
  id: number; 
  name: string; 
  username: string; 
  password: string;
}

@Injectable()
export class UsersService {

  private readonly users: User[] = [
    { id: 1, name: 'Mathias Lawson', username: 'mathias', password: '121' },
    { id: 2, name: 'Jane Doe', username: 'jane', password: '122' },
    { id: 3, name: 'Bob Smith', username: 'bob', password: '123' },
  ];


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
