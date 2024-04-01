import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import YAML = require('yamljs');
import path = require('path');
import swaggerUi = require('swagger-ui-express');
import * as dotenv from 'dotenv';
import { LoggingService } from './logging/logging.service';
dotenv.config();
const logger = new LoggingService();

process.on('unhandledRejection', (reason: Error | any) => {
  logger.error(`Unhandled Rejection: ${reason.message || reason}`);
  // throw new Error(reason.message || reason);
});
process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  // errorHandler.handleError(error);
});

export const PORT = process.env.PORT
  ? parseInt(process.env.PORT)
    ? parseInt(process.env.PORT)
    : 4000
  : 4000;
console.log('Starting on port:', PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const logger = new LoggingService();
  app.useLogger(logger);

  // Загрузка файла документации
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc', 'api.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((req, res, next) => {
    const send = res.send;
    res.send = (body) => {
      if (req?.body?.password) req.body.password = '********';
      if (req?.body?.oldPassword) req.body.oldPassword = '********';
      if (req?.body?.newPassword) req.body.newPassword = '********';
      if (body?.password) body.password = '********';
      logger.debug(
        `${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} => ${res.statusCode} ${body}`,
      );
      res.send = send;
      return res.send(body);
    };
    next();
  });

  await app.listen(PORT);
}
bootstrap();
