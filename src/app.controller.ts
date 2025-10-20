import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/test')
  testFunction(@Req() req: Request) {
    return this.appService.testService(req);
  }

  // @Get('*')
  // routeNotFound() {
  //   return this.appService.routeNotFound();
  // }
}
