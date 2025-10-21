import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { generateRandomString, LogFormat } from 'src/helper/helper';
import { format } from 'util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const sessionID = generateRandomString();
    const uri = req.originalUrl;
    let startTime = Date.now();
    let resBody: any;
    const oldSend = res.send;

    res.send = function (body: any) {
      resBody = body;
      return oldSend.call(this, body);
    };

    let reqBody = req.body
      ? req.body
      : Object.keys(req.params).length !== 0
        ? req.params
        : Object.keys(req.query).length !== 0
          ? req.query
          : {};

    let start = format(
      '%j',
      new LogFormat(
        sessionID,
        uri,
        'request',
        reqBody,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        '',
      ),
    );

    Logger.log(start);

    next();

    res.on('finish', () => {
      let duration = Date.now() - startTime;
      let end = format(
        '%j',
        new LogFormat(
          sessionID,
          uri,
          'response',
          JSON.parse(resBody),
          moment().format('YYYY-MM-DD HH:mm:ss'),
          `${duration} ms`,
        ),
      );

      Logger.log(end);
    });
  }
}
