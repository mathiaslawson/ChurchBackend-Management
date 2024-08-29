import { PartialType } from '@nestjs/swagger';
import { CreateFellowshipDto } from './create-fellowship.dto';
import { IsString } from 'class-validator';

export class UpdateFellowshipDto {
    @IsString()
    fellowship_id: string; 

    @IsString()
    fellowship_name: string; 

    @IsString()
    fellowship_leader_id: string; 
}
