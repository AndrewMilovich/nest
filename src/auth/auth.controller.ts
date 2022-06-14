import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('/registration')
  registration(@Body() user: User) {
    return this.authService.registration(user);
  }
}
