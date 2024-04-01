import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { LoggingService } from './logging/logging.service';

// @Catch(HttpException)
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  //   private readonly logger: LoggingService;
  //   constructor() {
  //     this.logger = new LoggingService();
  //   }
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error: ' + exception?.name;

    const errorResponse: any = {
      statusCode,
      message,
    };
    response.status(statusCode).json(errorResponse);
  }
}
