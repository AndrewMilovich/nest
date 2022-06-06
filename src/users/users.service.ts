import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  getAll(): CreateUserDto[] {
    return this.users;
  }

  getUsersById(id: string): CreateUserDto {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto): CreateUserDto {
    const createdUser = { ...user, id: new Date().valueOf() };
    this.users.push(createdUser);
    return createdUser;
  }

  deleteUserById(id: string): void {
    const index = this.users.findIndex((value) => value.id === id);
    this.users.splice(index, 1);
  }

  updateUserById(id: string, user: Partial<CreateUserDto>): CreateUserDto {
    const updateUser = this.users.find((value) => (value.id = id));
    return Object.assign(updateUser, user);
  }
}
