import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

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

  updateUserById(id: string, userData: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: userData,
    });
  }
}
