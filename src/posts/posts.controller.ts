import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }
  @Get(':id')
  getOnePost(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }
  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    this.postService.deletePost(id);
  }
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() newPost: Partial<CreatePostDto>) {
    return this.postService.updateById(id, newPost);
  }
}
