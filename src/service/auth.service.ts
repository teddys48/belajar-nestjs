import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BuildResponse } from 'src/dto/app.dto';
import { LoginDTO, RegisterDTO } from 'src/dto/auth.dto';
import { AuthRepository } from 'src/repository/auth.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

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

      let accessToken = jwt.sign({ email: checkUser.email }, 'accessToken', {
        algorithm: 'HS256',
        expiresIn: '24h',
      });

      let refreshToken = jwt.sign({ email: checkUser.email }, 'refreshToken', {
        algorithm: 'HS256',
        expiresIn: '48h',
      });

      return new BuildResponse('00', 'success', {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(body: RegisterDTO) {
    try {
      let hashedPassword = await bcrypt.hash(body.password, 10);

      body.password = hashedPassword;

      await this.authRepository.register(body);

      return new BuildResponse('00', 'success', {});
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshToken(req: Request) {
    try {
      let email = req['email'];
      let accessToken = jwt.sign({ email: email }, 'accessToken', {
        algorithm: 'HS256',
        expiresIn: '24h',
      });

      let refreshToken = jwt.sign({ email: email }, 'refreshToken', {
        algorithm: 'HS256',
        expiresIn: '48h',
      });

      return new BuildResponse('00', 'success', {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        new BuildResponse('500', error.message, {}),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
