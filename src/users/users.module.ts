import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../core/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { S3managerService } from "../s3manager/s3manager.service";
import { S3managerModule } from "../s3manager/s3manager.module";

@Module({
  imports: [forwardRef(() => AuthModule), S3managerModule],
  providers: [UsersService, S3managerService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
