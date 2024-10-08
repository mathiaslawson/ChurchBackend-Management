import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFellowshipDto } from './dto/create-fellowship.dto';
import { UpdateFellowshipDto } from './dto/update-fellowship.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils';

@Injectable()
export class FellowshipService {

  constructor(private prisma: PrismaService) { }
  

  async create(dto: CreateFellowshipDto) {
    const { fellowship_leader_id, fellowship_name, zone_id } = dto


    // get fellowshi
    const checkFellowship = await this.prisma.fellowship.findUnique({
      where: {fellowship_name: fellowship_name}
    })

    if (checkFellowship) { 
      throw new ConflictException('This Fellowship Already Exists');
    }


    console.log(fellowship_leader_id, 'this is the fello leader_id')

    // check if leader is a fellowship leader
    const checkLeaderId = await this.prisma.member.findUnique({
     where: { member_id: fellowship_leader_id },
    });


     console.log(checkLeaderId, 'results of leader ID')

      //validate fellowship leader
     if (checkLeaderId && checkLeaderId.role !== "FELLOWSHIP_LEADER") { 
       throw new ConflictException('Only Fellowship Leaders Can Lead A Fellowships, Check If Selected Participant is A Zone Leader');
     }
    
    const newFellowship = await this.prisma.fellowship.create({
      data: {
        fellowship_id: generateId(),
        fellowship_name,
        fellowship_leader_id,
        zone_id,
      }
    })

    return newFellowship;
  }

  async findAll() {
    // check if there is data 
  const fellowships = await this.prisma.fellowship.findMany({
    include: {
      zone: true, 
      leader: true, 
      cells: true, 
    },
  });
   
   //  get more details 
    if (fellowships && fellowships.length === 0) {
      return {
        statusCode: 200,
        message: 'No fellowships available yet.',
        data: []
      };
    }
    return fellowships;
  }

  async findOne(id: string) {
    const fellowship = await this.prisma.fellowship.findUnique({  
      where: { fellowship_id: id },
      include: {
        leader: true, 
        zone: true,
        cells: true, 
      }
    });

    // check if zone exists
    if (!fellowship) {
      throw new NotFoundException(`Fellowship does not exist`);
    }
    return fellowship;
  }

  async update(id: string, updateFellowshipDto: UpdateFellowshipDto) {
   const fellowship = await this.prisma.fellowship.findUnique({  
      where: { fellowship_id: id }
   });
    
    // check if fellowship exists
    if (!fellowship) {
      throw new NotFoundException(`Fellowship does not exist`);
    }

   //check if zone name is same
     if (fellowship.fellowship_name === updateFellowshipDto.fellowship_name) {
       throw new ConflictException('Fellowship Name Already Exists');
     }

    const updateFellowship = await this.prisma.fellowship.update({
      where: { fellowship_id: fellowship.fellowship_id },
      data: updateFellowshipDto
    })


   return updateFellowship;
  }

  async remove(id: string) {
     const fellowship = await this.prisma.fellowship.findUnique({  
      where: { fellowship_id: id }
    });
    // check if fellowship exists
    if (!fellowship) {
      throw new NotFoundException(`Fellowship does not exist`);
    }

    const deletedFellowship = await this.prisma.fellowship.delete({  
      where: { fellowship_id: id }
    });

     return deletedFellowship;
  }
}
