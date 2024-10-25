import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLidDto, UpdateLidDto } from "./dto";

@Injectable()
export class LidService {
  constructor(private readonly prisma: PrismaService) {}
  create(createLidDto: CreateLidDto) {
    return this.prisma.lid.create({
      data: {
        ...createLidDto,
        test_date: new Date(createLidDto.test_date),
      },
    });
  }

  findAll() {
    return this.prisma.lid.findMany({
      include: {
        LidStatus: true,
        ReasonLid: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.lid.findUnique({ where: { id } });
  }

  update(id: number, updateLidDto: UpdateLidDto) {
    return this.prisma.lid.update({ where: { id }, data: { ...updateLidDto } });
  }

  remove(id: number) {
    return this.prisma.lid.delete({ where: { id } });
  }
}
