import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    const existingGroup = await this.prismaService.group.findFirst({
      where: { name: createGroupDto.name }, 
    });

    if (existingGroup) {
      throw new BadRequestException("Group with this name already exists");
    }

    return this.prismaService.group.create({
      data: createGroupDto,
    });
  }

  findAll() {
    return this.prismaService.group.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
