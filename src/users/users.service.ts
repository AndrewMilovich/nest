import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUser } from './dto/update-user.dto';
import { S3managerService } from "../s3manager/s3manager.service";

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: S3managerService,
  ) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({ include: { posts: true } });
  }

  getUsersById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) },
      include: { posts: true },
    });
  }

  getUserByEmail(userEmail: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email: userEmail } });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  deleteUserById(id: string): void {
    this.prismaService.user.delete({ where: { id: Number(id) } });
  }

  async updateUserById(id: string, userData: UpdateUser, file): Promise<User> {
    const data = await this.s3Service.uploadFile(file);
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: { ...userData, age: Number(userData.age), avatar: data.Location },
    });
  }
}
