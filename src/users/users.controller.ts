import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUser } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3managerService } from '../s3manager/s3manager.service';
import { diskStorage } from 'multer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private s3Service: S3managerService,
  ) {}
  @ApiOperation({ summary: 'Get all user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          email: 'example@mail.com',
          name: 'Katya',
          city: 'New York',
          status: true,
          age: 30,
          password: 'qwerty12345',
        },
        {
          id: 2,
          email: 'example2@mail.com',
          name: 'Katya',
          city: 'New York',
          status: true,
          age: 30,
          password: 'qwerty12345',
        },
        {
          id: 3,
          email: 'example3@mail.com',
          name: 'Katya',
          city: 'New York',
          status: true,
          age: 30,
          password: 'qwerty12345',
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }
  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'example@mail.com',
        name: 'Katya',
        city: 'New York',
        status: true,
        age: 30,
        password: 'qwerty12345',
      },
    },
  })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @Get('/:id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getUsersById(id);
  }
  @ApiOperation({ summary: 'Create New User' })
  @ApiCreatedResponse({
    status: 201,
    schema: {
      example: {
        email: 'example@mail.com',
        name: 'Katya',
        city: 'New York',
        status: true,
        age: 30,
        password: 'qwerty12345',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: User) {
    return this.userService.createUser(userDto);
  }
  @ApiOperation({ summary: 'Delete User by id' })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUserById(id);
  }
  @ApiOperation({ summary: 'Update User by id' })
  @ApiBody({
    schema: {
      example: {
        name: 'updatedKatya',
        city: 'updatedNew York',
        age: 30,
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        email: 'example@mail.com',
        name: 'updatedKatya',
        city: 'updatedNew York',
        status: true,
        age: 25,
        password: 'qwerty12345',
      },
    },
  })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUser,
    @UploadedFile() file,
  ) {
    return this.userService.updateUserById(id, userDto, file);
  }
}
