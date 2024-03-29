import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import YAML = require('yamljs');
import path = require('path');
import swaggerUi = require('swagger-ui-express');
import * as dotenv from 'dotenv';
dotenv.config();

process.on('unhandledRejection', (reason: Error | any) => {
  console.log(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(reason.message || reason);
});
process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);
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

  // Загрузка файла документации
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc', 'api.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((_req, res, next) => {
    const send = res.send;
    res.send = (c) => {
      console.log(`Code: ${res.statusCode}`);
      console.log('Body: ', c);
      res.send = send;
      return res.send(c);
    };
    next();
  });

  await app.listen(PORT);
}
bootstrap();
