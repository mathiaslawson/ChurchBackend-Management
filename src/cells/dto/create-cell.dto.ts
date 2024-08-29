import { IsString } from "class-validator";

export class CreateCellDto {
     @IsString()
    cell_name: string;

    @IsString()
    fellowship_id: string; 

    @IsString()
    cell_leader_id: string;
}
