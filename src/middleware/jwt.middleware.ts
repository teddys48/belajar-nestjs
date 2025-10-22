import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import moment from 'moment';
import { BuildResponse } from 'src/dto/app.dto';
import { generateRandomString, LogFormat } from 'src/helper/helper';
import { format } from 'util';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      let auth = req.headers.authorization;

      if (!auth) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json(new BuildResponse('401', 'token not found', {}));
      }

      let token: any = auth?.split(' ')[1];

      let checkToken = verify(token, 'accessToken', {});

      let { email }: any = checkToken;

      req['email'] = email;
    } catch (error) {
      console.log('check', error);
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new BuildResponse('401', error.message, {}));
    }
    next();
  }
}

export class RefreshTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      let auth = req.headers.authorization;

      if (!auth) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json(new BuildResponse('401', 'token not found', {}));
      }

      let token: any = auth?.split(' ')[1];

      let checkToken = verify(token, 'refreshToken', {});

      let { email }: any = checkToken;

      req['email'] = email;
    } catch (error) {
      console.log('check', error);
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new BuildResponse('401', error.message, {}));
    }
    next();
  }
}
