import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils';

@Injectable()
export class ZonesService {

   constructor(private prisma: PrismaService) { }

   async create(dto: CreateZoneDto) {
     const { zone_leader_id, zone_leader, zone_name, zone_location } = dto;
     
    //  check member id
     const checkLeaderId = await this.prisma.member.findUnique({
     where: {member_id : zone_leader_id}
     })

     //  getZones
     const zones = await this.prisma.zone.findUnique({
       where: {zone_name : zone_name}
     })
     
     // check if zones already exist
     if (zones) {
        throw new ConflictException('This Zone Already Exists');
     }
  
     //validate zone leader
     if (checkLeaderId && checkLeaderId.role !== "ZONE_LEADER") { 
       throw new ConflictException('Only Zone Leaders Can Lead A Zone, Check If Selected Participant is A Zone Leader');
     }

     const newZone = await this.prisma.zone.create({
       data: {
         zone_leader_id : checkLeaderId.member_id,
         zone_name,
         zone_location, 
         zone_id: generateId()
       }
     })
    
     return newZone;
}

  async findAll() {  
    // check if there is data 
    const zones = await this.prisma.zone.findMany({
      include: 
      {
        zone_leader: true, 
      }
    });    

    if (zones && zones.length === 0) {
      return {
        statusCode: 200,
        message: 'No zones available yet.',
        data: []
      };
    }
    return zones;
  }

  async findOne(id: string) {
    const zone = await this.prisma.zone.findUnique({  
      where: { zone_id: id },
      include: {
        zone_leader: true
      }
    });
    // check if zone exists
    if (!zone) {
      throw new NotFoundException(`Zone does not exist`);
    }
    return zone;
  }

  async update(id: string, updateZoneDto: UpdateZoneDto) {

    const zone = await this.prisma.zone.findUnique({  
      where: { zone_id: id }
    });
    // check if zone exists
    if (!zone) {
      throw new NotFoundException(`Zone does not exist`);
    }

   //check if zone name is same
     if (zone.zone_name === updateZoneDto.zone_name) {
       throw new ConflictException('Zone Name Already Exists');
     }

    const updatedZone = await this.prisma.zone.update({
      where: { zone_id: zone.zone_id },
      data: updateZoneDto
    })


   return updatedZone;
  }

  async remove(id: string) {

     const zone = await this.prisma.zone.findUnique({  
      where: { zone_id: id }
    });
    // check if zone exists
    if (!zone) {
      throw new NotFoundException(`Zone does not exist`);
    }

    const deletedZone = await this.prisma.zone.delete({  
      where: { zone_id: id }
    });

     return deletedZone;
  }
}
