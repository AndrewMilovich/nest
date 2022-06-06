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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers(): CreateUserDto[] {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: string): CreateUserDto {
    return this.userService.getUsersById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  createUser(@Body() userDto: CreateUserDto): CreateUserDto {
    return this.userService.createUser(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUserById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() userDto: Partial<CreateUserDto>,
  ): CreateUserDto {
    return this.userService.updateUserById(id, userDto);
  }
}
