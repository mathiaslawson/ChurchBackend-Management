import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { generateId } from 'src/utils';

type UserRole = 'ADMIN' | 'ZONE_LEADER' | 'FELLOWSHIP_LEADER' | 'CELL_LEADER' | 'MEMBER';


interface Member {
  member_id: number;
  cell_id: string;
}


export interface User {
  user_id: string;
  email: string;
  username: string;
  password: string;
  firstname: string; 
  lastname: string; 
  birth_date: Date;
  member?: Member; 
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterResponse {
  firstname: string; 
  lastname: string; 
  email: string;
  birth_date: Date;
  user_id: string;
  username: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  message: string;
}

export interface Me {
  user_id: string;
  firstname: string; 
  lastname: string; 
  email: string;
  username: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  message: string;
}

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }
  
  
  async create(dto: CreateUserDto): Promise<RegisterResponse | null> {
    const { username, password, email, role, birth_date, firstname, lastname, gender } = dto;
    
    if(!email || !username || !password || !firstname || !lastname || !birth_date || !role){
      throw new BadRequestException('Missing required fields');
    } 
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
  

    let user_id = generateId();
    
  
    const newUser = await this.prisma.user.create({
      data: {
        user_id,
        username,
        password: hashedPassword,
        email,
        birth_date: new Date(birth_date).toISOString(),
        firstname,
        lastname,
        gender,
        role,
        is_active: true,
        member: {
          create: {
            member_id: generateId(),
            firstname,
            lastname,
            address: "",
            occupation: "",
            email,
            role,
            gender,
            birth_date: new Date(birth_date).toISOString(),
          }
        }
      },
    });



  delete (newUser as Partial<User>).password;
    return {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        username: newUser.username,
        birth_date: newUser.birth_date,
        user_id: newUser.user_id,
        role: newUser.role,
        is_active: newUser.is_active,
        created_at: newUser.created_at,
        updated_at: newUser.updated_at,
        message: 'User created successfully'
  };
  
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
