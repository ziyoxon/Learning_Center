import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const existingPayment = await this.prismaService.payment.findFirst({
      where: { payment_last_date: createPaymentDto.payment_last_date },
    });

    if (existingPayment) {
      return { message: "Payment  last date already exists" };
    }

    // Yangi to'lovni yaratish
    return this.prismaService.payment.create({
      data: {
        price: createPaymentDto.price,
        payment_date: createPaymentDto.payment_date,
        payment_last_date: createPaymentDto.payment_last_date,
        is_paid: createPaymentDto.is_paid,
        total_amount: createPaymentDto.total_amount,
      },
    });
  }

  findAll() {
    return this.prismaService.payment.findMany();
  }

  findOne(id: number) {
    return this.prismaService.payment.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaService.payment.update({
      where: { id },
      data: {
        price: updatePaymentDto.price,
        payment_date: updatePaymentDto.payment_date,
        payment_last_date: updatePaymentDto.payment_last_date,
        is_paid: updatePaymentDto.is_paid,
        total_amount: updatePaymentDto.total_amount,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.payment.delete({
      where: { id },
    });
  }
}
