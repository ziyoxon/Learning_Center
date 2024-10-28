import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  // Yangi student yaratish
  create(createStudentDto: CreateStudentDto) {
    return this.prismaService.student.create({
      data: {
        first_name: createStudentDto.first_name,
        last_name: createStudentDto.last_name,
        phone_number: createStudentDto.phone_number,
        birthday: createStudentDto.birthday,
        is_active: createStudentDto.is_active,
        gender:createStudentDto.gender
      },
    });
  }

  findAll() {
    return this.prismaService.student.findMany();
  }

  findOne(id: number) {
    return this.prismaService.student.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prismaService.student.update({
      where: { id },
      data: {
        first_name: updateStudentDto.first_name,
        last_name: updateStudentDto.last_name,
        phone_number: updateStudentDto.phone_number,
        birthday: updateStudentDto.birthday,
        is_active: updateStudentDto.is_active,
        gender: updateStudentDto.gender,
      },
    });
  }

  // Studentni o'chirish
  remove(id: number) {
    return this.prismaService.student.delete({
      where: { id },
    });
  }
}
