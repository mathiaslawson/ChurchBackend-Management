import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../enums/role.enums';

export class CreateUserDto {
    @IsString()
    password: string; 

    @IsString()
    username: string; 

    @IsEmail()
    email: string; 

    @IsNotEmpty()
    @IsEnum(Role, { each: true })
    role: Role;

 }
