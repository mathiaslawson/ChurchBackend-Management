import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../enums/role.enums';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
 
    @IsString()
    password: string; 

    @IsString()
    firstname: string; 

    @IsString()
    lastname: string;

    @IsString()
    username: string; 

    @IsEmail()
    email: string; 

    @IsDateString()
    birth_date: Date;

    @IsNotEmpty()
    @IsEnum(Role, { each: true })
    role: Role;
}
 
@Exclude()
export class CreateUserResponseDto {
    @Expose()
    @IsString()
    firstname: string; 

    @Expose()
    @IsString()
    lastname: string;

    @Expose()
    @IsString()
    username: string; 

    @Expose()
    @IsEmail()
    email: string; 

    @Expose()
    @IsDateString()
    birth_date: Date;

    @Expose()
    @IsNotEmpty()
    @IsEnum(Role, { each: true })
    role: Role;
}
