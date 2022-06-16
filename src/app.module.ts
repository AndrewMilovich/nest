import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { S3managerModule } from './s3manager/s3manager.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3, SharedIniFileCredentials } from 'aws-sdk';

@Module({
  imports: [
    S3managerModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-east-1',
        credentials: new SharedIniFileCredentials({
          profile: 'my-profile',
        }),
      },
      services: [S3],
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    S3managerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
