import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsString()
  public age: number;
  @IsString()
  public city: string;
}
