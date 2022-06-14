import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@prisma/client';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}
  @ApiOperation({ summary: 'Get all Comments' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          body: 'lorem ipson',
          published: true,
          authorId: 1,
          postId: 1,
          author: {
            id: 1,
            email: 'example@gmail.com',
            name: 'exampleName',
            age: 18,
            city: 'exampleCity',
            password: 'examplePassword',
            status: true,
          },
        },
        {
          id: 2,
          body: 'lorem ipson 2',
          published: true,
          authorId: 1,
          postId: 1,
          author: {
            id: 1,
            email: 'example@gmail.com',
            name: 'exampleName',
            age: 18,
            city: 'exampleCity',
            password: 'examplePassword',
            status: true,
          },
        },
      ],
    },
  })
  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }
  @ApiOperation({ summary: 'Get One Comment By Id' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        body: 'lorem ipson',
        published: true,
        authorId: 1,
        postId: 1,
        author: {
          id: 1,
          email: 'example@gmail.com',
          name: 'exampleName',
          age: 18,
          city: 'exampleCity',
          password: 'examplePassword',
          status: true,
        },
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
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }
  @ApiOperation({ summary: 'Create One Comment' })
  @ApiCreatedResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        body: 'lorem ipson',
        published: true,
        authorId: 1,
        postId: 1,
      },
    },
  })
  @Post()
  createComment(@Body() comment: Comment) {
    return this.commentService.createComment(comment);
  }
  @ApiParam({
    name: 'id',
    schema: {
      example: {
        id: 'string',
      },
    },
  })
  @ApiOperation({ summary: 'Delete One Comment By Id' })
  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    this.commentService.deleteComment(id);
  }
  @ApiOperation({ summary: 'Update Comment By Id' })
  @ApiBody({
    schema: {
      example: {
        body: 'lorem ipson',
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        body: 'update lorem ipson',
        published: true,
        authorId: 1,
        postId: 1,
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
  @Put(':id')
  updateComment(@Param('id') id: string, @Body() comment: UpdateCommentDto) {
    return this.commentService.updateComments(id, comment);
  }
}
