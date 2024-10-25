import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { LidStatusModule } from "./lid_status/lid_status.module";
import { ReasonLidModule } from "./reason_lid/reason_lid.module";
import { LidModule } from "./lid/lid.module";
import { BranchModule } from "./branch/branch.module";
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    LidStatusModule,
    ReasonLidModule,
    LidModule,
    BranchModule,
    RoleModule,
    AuthModule,
    StaffModule,
  ],
})
export class AppModule {}
