import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Roles } from '../enums/user.enums';

export class CreateUserDto {
    @IsString()
    password: string; 

    @IsString()
    username: string; 

    @IsEmail()
    email: string; 

    @IsNotEmpty()
    @IsEnum(Roles, { each: true })
    role: Roles;

 }
