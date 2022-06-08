import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Prisma, Comment } from '@prisma/client';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}
  getAllComments(): Promise<Comment[]> {
    return this.prismaService.comment.findMany({ include: { author: true } });
  }
  getCommentById(id: string): Promise<Comment> {
    return this.prismaService.comment.findUnique({ where: { id: Number(id) } });
  }
  createComment(comment: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prismaService.comment.create({ data: comment });
  }
  deleteComment(id: string) {
    return this.prismaService.comment.delete({ where: { id: Number(id) } });
  }
  updateComments(
    id: string,
    comment: Prisma.CommentUpdateInput,
  ): Promise<UpdateCommentDto> {
    return this.prismaService.comment.update({
      where: { id: Number(id) },
      data: comment,
    });
  }
}
