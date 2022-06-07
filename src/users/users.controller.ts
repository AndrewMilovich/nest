import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUser } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getUsersById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  createUser(@Body() userDto: User) {
    return this.userService.createUser(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUserById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUser) {
    return this.userService.updateUserById(id, userDto);
  }
}
