import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;


  @IsNotEmpty()
  @IsString()
  birthday: string;
  
  @IsNotEmpty()
  @IsString()
  gender: string;

  is_active: boolean
}
