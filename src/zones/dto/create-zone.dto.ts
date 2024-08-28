import { IsString } from "class-validator";

export class CreateZoneDto {
    @IsString()
    zone_name: string;

    @IsString()
    zone_leader: string;

    @IsString()
    zone_location: string;

    @IsString()
    zone_leader_id: string;
}
