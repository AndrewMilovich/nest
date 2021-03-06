import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async login(authDto: LoginDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const findUser = await this.userService.getUserByEmail(userDto.email);
    if (findUser) {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPass = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const [access, refresh] = await Promise.all([
      this.jwtService.sign(payload, { secret: 'Access', expiresIn: '1d' }),
      this.jwtService.sign(payload, { secret: 'Refresh', expiresIn: '1h' }),
    ]);
    return {
      user,
      accessToken: access,
      refreshToken: refresh,
    };
  }

  private async validateUser(user: LoginDto) {
    const userDB = await this.userService.getUserByEmail(user.email);
    const passEqual = await bcrypt.compare(user.password, userDB.password);
    if (userDB && passEqual) {
      return userDB;
    }
    throw new UnauthorizedException({ message: 'wrong email or password' });
  }
  async getVerifiedUseId(jwt: string): Promise<string | null> {
    try {
      const token = this.getTokenFromJwt(jwt);
      const user = await this.jwtService.verify(token, {
        secret: 'Access',
      });

      return user.id;
    } catch (e) {
      throw new UnauthorizedException(
        HttpStatus.UNAUTHORIZED,
        `UNAUTHORIZED user, ${e.message[0]}`,
      );
    }
  }

  private getTokenFromJwt(jwt: string) {
    return jwt.split(' ')[1];
  }
}
