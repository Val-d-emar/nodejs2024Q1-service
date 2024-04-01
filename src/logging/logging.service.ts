// import { Injectable, NestMiddleware } from '@nestjs/common';

import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
// export class LoggingService extends ConsoleLogger {
export class LoggingService implements LoggerService {
  // private logger = new Logger('HTTP');
  private logger = new ConsoleLogger('HTTP');

  // private logger = console;

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    // this.logger.fatal(message, ...optionalParams);
    this.logger.log(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    // this.logger.verbose(message, ...optionalParams);
    this.logger.log(message, ...optionalParams);
  }
}

// import { NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   constructor(private readonly logger: LoggingService) {}
//   // resDotSendInterceptor = (res, send) => (content) => {
//   //   res.contentBody = content;
//   //   res.send = send;
//   //   res.send(content);
//   //   return res.send;
//   // };
//   use(request: Request, response: Response, next: NextFunction) {
//     // const { method, originalUrl: url } = request;
//     // response.send = this.resDotSendInterceptor(response, response.send);
//     // response.on('finish', () => {
//     //   // const { statusCode } = response;
//     //   // const contentLength = response.get('content-length');
//     //   const send = response.send;
//     //   response.send = (c) => {
//     //     // this.logger.log(`Code: ${response.statusCode} Body: ${c}`);
//     //     this.logger.log(
//     //       `${method} ${url} ${JSON.stringify(request.body)} - ${response.statusCode} ${JSON.stringify(c)}`,
//     //     );
//     //     response.send = send;
//     //     return response.send(c);
//     //   };
//     //   // this.logger.log(
//     //   //   `${method} ${url} ${JSON.stringify(request.body)} - ${response.statusCode} ${JSON.stringify(response)}`,
//     //   // );
//     // });

//     next();
//   }
// }
