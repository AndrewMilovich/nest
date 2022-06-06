import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts = [];

  getAllPosts(): CreatePostDto[] {
    return this.posts;
  }
  getPostById(id: string): CreatePostDto {
    return this.posts.find((value) => value.id === id);
  }

  createPost(post: CreatePostDto): CreatePostDto {
    const newPost = { ...post, id: new Date().valueOf() };
    this.posts.push(newPost);
    return newPost;
  }
  deletePost(id: string): void {
    const index = this.posts.findIndex((value) => value.id === id);
    this.posts.splice(index, 1);
  }
  updateById(id: string, post: Partial<CreatePostDto>): CreatePostDto {
    const updatePost = this.posts.find((value) => value.id == id);
    return Object.assign(updatePost, post);
  }
}
