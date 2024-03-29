import { Module } from '@nestjs/common';
import { LoggingMiddleware, LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';

@Module({
  controllers: [LoggingController],
  providers: [LoggingMiddleware, LoggingService],
  exports: [LoggingMiddleware, LoggingService],
})
export class LoggingModule {}
