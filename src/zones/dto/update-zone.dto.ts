import { PartialType } from '@nestjs/mapped-types';
import { CreateZoneDto } from './create-zone.dto';
import { IsString } from 'class-validator';

export class UpdateZoneDto{
    @IsString()
    zone_name: string;

    @IsString()
    zone_location: string;

    @IsString()
    zone_leader_id: string;
}
