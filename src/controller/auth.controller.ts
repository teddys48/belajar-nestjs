import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginDTO } from 'src/dto/auth.dto';
import { AuthService } from 'src/service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/auth/login')
  async login(@Body() data: LoginDTO) {
    return await this.authService.login(data);
  }
}
