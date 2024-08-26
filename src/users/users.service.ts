import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

type UserRole = 'ADMIN' | 'ZONE_LEADER' | 'FELLOWSHIP_LEADER' | 'CELL_LEADER' | 'MEMBER';
interface Member {
  member_id: number;
}


export interface User {
  user_id: number;
  email: string;
  username: string;
  password: string;
  member?: Member; 
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Me {
  user_id: number;
  email: string;
  username: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}
  async create(dto: CreateUserDto): Promise<User | null> {
  const { username, password, email, role } = dto;


   // Check if a user with the same email already exists
  const userByEmail = await this.prisma.user.findUnique({
    where: { email },
  });

  if (userByEmail) {
    throw new ConflictException('A user with this email already exists');
  }

  // Check if a user with the same username already exists
  const userByUsername = await this.prisma.user.findUnique({
    where: { username },
  });

  if (userByUsername) {
    throw new ConflictException('A user with this username already exists');
  }


 const salt = await bcrypt.genSalt();
 const hashedPassword = await bcrypt.hash(password, salt);
  

  const newUser = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
        is_active: true,
      },
    })

  delete (newUser as Partial<User>).password;

    return newUser;
  
}
  
  

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      }
    })
    return user;
  }



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
