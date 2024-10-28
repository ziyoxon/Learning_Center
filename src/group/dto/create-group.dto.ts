import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lesson_start_time: string;

  @IsString()
  @IsNotEmpty()
  lesson_end_time: string;

  @IsString()
  @IsNotEmpty()
  lesson_week_day: string;

  @IsNumber()
  @IsNotEmpty()
  room_number: number;

  @IsNumber()
  @IsNotEmpty()
  room_floor: number;

  @IsNumber()
  @IsNotEmpty()
  lesson_quant: number;

  @IsNotEmpty()
  is_active: boolean;
}
