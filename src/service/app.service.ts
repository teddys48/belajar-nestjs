import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BuildResponse } from 'src/dto/app.dto';

@Injectable()
export class AppService {
  getHello(): String {
    return 'hello world';
  }

  testService(req: Request): BuildResponse {
    throw new HttpException(
      new BuildResponse('500', 'internal server error', {}),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    return new BuildResponse('', '', {});
  }

  routeNotFound() {
    return { message: 'what are you looking for?!' };
  }
}
