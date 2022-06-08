import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreatePostDto } from '../../posts/dto/create-post.dto';

export class CreateCommentDto {
  public id: number;
  @IsString()
  @IsNotEmpty()
  public body: string;
  @IsBoolean()
  public published: boolean;
  public author: CreateUserDto;
  @IsNotEmpty()
  @IsNumber()
  public authorId: number;
  @IsNotEmpty()
  public Post: CreatePostDto;
  @IsNumber()
  public postId: number;
}
