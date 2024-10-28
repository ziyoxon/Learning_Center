import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    payment_last_date:string

    @IsNotEmpty()
    @IsString()
    payment_date:string

    @IsNotEmpty()
    @IsNumber()
    price:number

    @IsNotEmpty()
    is_paid:boolean

    @IsNotEmpty()
    @IsNumber()
    total_amount:number
}
