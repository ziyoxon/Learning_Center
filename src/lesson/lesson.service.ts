import { Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LessonService {
  constructor(private readonly prismaService: PrismaService) {}

  // Yangi dars yaratish
  async create(createLessonDto: CreateLessonDto) {
    return this.prismaService.lesson.create({
      data: {
        lesson_date: createLessonDto.lesson_date,
        lesson_time: createLessonDto.lesson_time,
        lesson_theme: createLessonDto.lesson_theme,
        lesson_number: createLessonDto.lesson_number,
        is_finished: createLessonDto.is_finished,
      },
    });
  }

  // Barcha darslarni olish
  async findAll() {
    return this.prismaService.lesson.findMany();
  }

  // Darsni ID bo'yicha olish
  async findOne(id: number) {
    return this.prismaService.lesson.findUnique({
      where: { id },
    });
  }

  // Darsni yangilash
  async update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prismaService.lesson.update({
      where: { id },
      data: {
        lesson_date: updateLessonDto.lesson_date,
        lesson_time: updateLessonDto.lesson_time,
        lesson_theme: updateLessonDto.lesson_theme,
        lesson_number: updateLessonDto.lesson_number,
        is_finished: updateLessonDto.is_finished,
      },
    });
  }

  // Darsni o'chirish
  async remove(id: number) {
    return this.prismaService.lesson.delete({
      where: { id },
    });
  }
}
