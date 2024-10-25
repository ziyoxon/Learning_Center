import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDate,
  IsNumber,
  IsOptional,
  IsDateString,
} from "class-validator";

export class CreateLidDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsDateString()
  @IsNotEmpty()
  test_date: Date;

  @IsInt()
  @IsNotEmpty()
  trial_lesson_date: number;

  @IsString()
  @IsNotEmpty()
  trial_lesson_time: string;

  @IsNumber()
  @IsOptional()
  lid_statusId: number;

  @IsNumber()
  @IsOptional()
  cancel_reasonId: number;
}
