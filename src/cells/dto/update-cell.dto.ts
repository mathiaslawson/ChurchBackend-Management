import { PartialType } from '@nestjs/swagger';
import { CreateCellDto } from './create-cell.dto';
import { IsString } from 'class-validator';

export class UpdateCellDto {
    @IsString()
    cell_name: string;

    @IsString()
    cell_leader_id: string;
}
