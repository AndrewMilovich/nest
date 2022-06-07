import { CreatePostDto } from '../../posts/dto/create-post.dto';

export class CreateUserDto {
  public name: string;
  public email: string;
  public age: number;
  public city: string;
  public status: boolean;
  readonly password: string;
  public posts: CreatePostDto[];
}
// id       Int       @id @default(autoincrement())
// email    String    @unique
// name     String
// age      Int
// city     String?
//   password String
// status   Boolean
// posts    Post[]
// comments Comment[]
