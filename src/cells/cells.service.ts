import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils';

@Injectable()
export class CellsService {

   constructor(private prisma: PrismaService) { }

  async create(dto: CreateCellDto) {
     const { cell_leader_id, cell_name, fellowship_id } = dto


    // get cells
    const checkCell = await this.prisma.cell.findUnique({
      where: {cell_name: cell_name}
    })

    if (checkCell) { 
      throw new ConflictException('This Cell Already Exists');
    }

    // check if leader is a cell leader
    const checkLeaderId = await this.prisma.member.findUnique({
     where: {member_id : cell_leader_id}
    })
      //validate cell leader
     if (checkLeaderId && checkLeaderId.role !== "CELL_LEADER") { 
       throw new ConflictException('Only Cell Leaders Can Lead A Cells, Check If Selected Participant is A Cell Leader');
     }
    
    const newFellowship = await this.prisma.cell.create({
      data: {
        cell_id: generateId(), 
        cell_name, 
        cell_leader_id, 
        fellowship_id,
      }
    })

    return newFellowship;
  }







  async findAll() {
     // check if there is data 
  const cells = await this.prisma.cell.findMany({
    include: {
      fellowship: true,
      leader: true, 
    },
  });
   
   //  get more details 
    if (cells && cells.length === 0) {
      return {
        statusCode: 200,
        message: 'No cells available yet.',
        data: []
      };
    }
    return cells;
  }

  async findOne(id: string) {
     const cell = await this.prisma.cell.findUnique({  
      where: { cell_id: id },
      include: {
        leader: true, 
        fellowship: true
      }
    });
    // check if cell exists
    if (!cell) {
      throw new NotFoundException(`Cell does not exist`);
    }
    return cell;
  }




  async update(id: string, updateCellDto: UpdateCellDto) {
   const cell = await this.prisma.cell.findUnique({  
      where: { cell_id: id }
   });
    
    // check if cell exists
    if (!cell) {
      throw new NotFoundException(`Cell does not exist`);
    }

   //check if cell name is same
     if (cell.cell_id === updateCellDto.cell_name) {
       throw new ConflictException('Cell Name Already Exists');
     }

    const updateFellowship = await this.prisma.cell.update({
      where: { cell_id: cell.cell_id },
      data: updateCellDto
    })


   return updateFellowship;
  }


  

  async remove(id: string) {
    const cell = await this.prisma.cell.findUnique({  
      where: { cell_id: id }
    });
    // check if cell exists
    if (!cell) {
      throw new NotFoundException(`Cell does not exist`);
    }

    const deletedCell = await this.prisma.cell.delete({  
      where: { cell_id: id }
    });

     return deletedCell;
  }
}
