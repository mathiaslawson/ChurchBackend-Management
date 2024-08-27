import { IsString } from "class-validator";

export class CreateZoneDto {
    @IsString()
    zone_name: string;

    @IsString()
    zone_leader_name: string;
}
