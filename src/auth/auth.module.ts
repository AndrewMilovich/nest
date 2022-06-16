import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../core/prisma.service';
import { S3managerModule } from "../s3manager/s3manager.module";
import { S3managerService } from "../s3manager/s3manager.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, S3managerService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    S3managerModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
