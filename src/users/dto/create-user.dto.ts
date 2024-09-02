import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender, Role } from '../enums/role.enums';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
 
    @IsString()
    password: string; 

    @IsString()
    firstname: string; 

    @IsString()
    lastname: string;

    // @IsNotEmpty()
    // @IsEnum(Role, { each: true })
    // gender: Gender

    // @IsString()
    // username: string; 

    @IsEmail()
    email: string; 

    // @IsDateString()
    // birth_date: Date;

    @IsNotEmpty()
    @IsEnum(Role, { each: true })
    role: Role;
}
 
