import { Module } from '@nestjs/common';
import { S3managerService } from './s3manager.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule.forRoot({envFilePath:'.env'})],
  controllers: [],
  providers: [S3managerService],
  exports: [],
})
export class S3managerModule {}
