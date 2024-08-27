import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZonesService {
  create(data: CreateZoneDto) {
    console.log(data);
    return {
      zone_id: '1',
      zone_name: 'test',
      zone_leader_id: '1',
      zone_leader_name: 'test',
      zone_location: 'test',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  findAll() {
    return `This action returns all zones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zone`;
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return `This action updates a #${id} zone`;
  }

  remove(id: number) {
    return `This action removes a #${id} zone`;
  }
}
