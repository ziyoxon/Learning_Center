import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @IsNotEmpty()
    @IsString()
    lesson_date :string

    @IsNotEmpty()
    @IsString()
    lesson_time :string

    @IsNotEmpty()
    @IsString()
    lesson_theme :string

    @IsNotEmpty()
    @IsNumber()
    lesson_number :number

    @IsNotEmpty()
    is_finished : boolean
}
