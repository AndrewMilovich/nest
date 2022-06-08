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
import { PostsService } from './posts.service';
import {  Prisma } from "@prisma/client";
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @ApiOperation({ summary: 'Get all Posts' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          title: 'example title 1',
          content: 'example content 1',
          published: true,
          authorId: 1,
        },
        {
          id: 2,
          title: 'example title 2',
          content: 'example content 2',
          published: true,
          authorId: 1,
        },
        {
          id: 3,
          title: 'example title 4',
          content: 'example content 3',
          published: true,
          authorId: 2,
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }
  @ApiOperation({ summary: 'Get One Post' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        title: 'example title 1',
        content: 'example content 1',
        published: true,
        authorId: 1,
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
  @Get(':id')
  getOnePost(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
  @ApiOperation({ summary: 'Create One Post' })
  @ApiCreatedResponse({
    status: 201,
    schema: {
      example: {
        title: 'example title 1',
        content: 'example content 1',
        published: true,
        authorId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createPost(@Body() post: Prisma.PostCreateInput) {
    return this.postService.createPost(post);
  }
  @ApiOperation({ summary: 'Delete One Post' })
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    this.postService.deletePost(id);
  }
  @ApiBody({
    schema: {
      example: {
        content: 'update example content 1',
        published: true,
        authorId: 1,
      },
    },
  })
  @ApiOperation({ summary: 'Update Post by id' })
  @ApiBody({
    schema: {
      example: {
        content: 'example content 1',
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        content: 'update example content 1',
        published: true,
        authorId: 1,
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
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() newPost: UpdatePostDto) {
    return this.postService.updateById(id, newPost);
  }
}
