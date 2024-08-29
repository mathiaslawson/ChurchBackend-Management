import { IsString } from "class-validator";

export class CreateFellowshipDto {
    @IsString()
    zone_id: string; 

    @IsString()
    fellowship_name: string; 

    @IsString()
    fellowship_leader_id: string; 
}
