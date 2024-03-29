// import { Injectable, NestMiddleware } from '@nestjs/common';

import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
}

// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggingService implements NestMiddleware {
//   private logger = new Logger('HTTP');

//   use(request: Request, response: Response, next: NextFunction): void {
//     const { method, originalUrl, params, body } = request;
//     // console.log(request);
//     // const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       // const { statusCode } = response;
//       // const body = response;
//       console.log(response);
//       // this.logger.log(
//       //   `${method} ${originalUrl} ${params} ${body} ${statusCode}`,
//       // );
//     });

//     next();
//   }
// }
// import { Request, Response, NextFunction } from 'express';

// import { Injectable, Logger } from '@nestjs/common';
// import * as winston from 'winston';

// @Injectable()
// export class LoggingService {
//   private readonly logger: winston.Logger;

//   constructor() {
//     this.logger = winston.createLogger({
//       transports: [
//         new winston.transports.Console({
//           level: 'debug',
//         }),
//         new winston.transports.File({
//           filename: 'app.log',
//           level: 'info',
//         }),
//       ],
//     });
//   }

//   log(message: string) {
//     this.logger.info(message);
//   }

//   error(message: string, error: Error) {
//     this.logger.error(message, error);
//   }
// }

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   constructor(private readonly logger: LoggingService) {}

//   use(request: Request, response: Response, next: NextFunction) {
//     const { ip, method, path: url } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');

//       this.logger.log(
//         `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
//       );
//     });

//     next();
//   }
// }
