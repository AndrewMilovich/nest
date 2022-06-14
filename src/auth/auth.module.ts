import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { PrismaService } from "../core/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.Private_Key || 'Secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
