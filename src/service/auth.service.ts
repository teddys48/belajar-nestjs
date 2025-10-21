import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BuildResponse } from 'src/dto/app.dto';
import { LoginDTO } from 'src/dto/auth.dto';
import { AuthRepository } from 'src/repository/auth.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(body: LoginDTO) {
    try {
      let checkUser = await this.authRepository.find(body.email);
      if (!checkUser) {
        throw new HttpException(
          new BuildResponse('400', 'user not found', {}),
          HttpStatus.BAD_REQUEST,
        );
      }

      let checkPassword = await bcrypt.compare(
        body.password,
        checkUser.password,
      );

      if (!checkPassword) {
        throw new HttpException(
          new BuildResponse('400', 'wrong password', {}),
          HttpStatus.BAD_REQUEST,
        );
      }

      return new BuildResponse('00', 'success', {
        access_token: '',
        refresh_token: '',
      });
    } catch (error) {
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
