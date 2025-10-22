import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { LoginDTO, RegisterDTO } from 'src/dto/auth.dto';
import { AuthService } from 'src/service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/auth/login')
  async login(@Body() data: LoginDTO) {
    return await this.authService.login(data);
  }

  @Post('/api/auth/register')
  async register(@Body() data: RegisterDTO) {
    return await this.authService.register(data);
  }

  @Get('/api/auth/refresh-token')
  async refreshToken(@Req() req: Request) {
    return await this.authService.refreshToken(req);
  }
}
