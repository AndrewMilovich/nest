import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('hello Users')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({ summary: 'Welcome to my Api' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
