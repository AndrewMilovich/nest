import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  getAllPosts(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }
  getPostById(id: string): Promise<Post> {
    return this.prismaService.post.findUnique({ where: { id: Number(id) } });
  }

  createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({ data });
  }
  deletePost(id: string): void {
    this.prismaService.post.delete({ where: { id: Number(id) } });
  }
  updateById(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
    return this.prismaService.post.update({ where: { id: Number(id) }, data });
  }
}
