import { IsString } from "class-validator";

export class CreateAuthDto {}


export class LoginAuthDto {
    @IsString()
    password: string; 
    
    @IsString()
    email: string; 
}