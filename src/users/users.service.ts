import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  // private users = [];
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getUsersById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  // deleteUserById(id: string): void {
  //   const index = this.users.findIndex((value) => value.id === id);
  //   this.users.splice(index, 1);
  // }
  //
  updateUser(id: string, userData: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: { name: userData.name, city: userData.city },
    });
  }
}
