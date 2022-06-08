import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateCommentDto } from "../../comments/dto/create-comment.dto";

export class CreatePostDto {
  @IsString()
  public title: string;
  @IsString()
  @IsNotEmpty()
  public content: string;
  @IsBoolean()
  public published: boolean;
  public authorId: number;
  public comments: CreateCommentDto[];
}
