import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;
  @IsString()
  @IsNotEmpty()
  public content: string;
  @IsBoolean()
  public published: boolean;
  public authorId: number;
}
