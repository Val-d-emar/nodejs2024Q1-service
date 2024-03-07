import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import YAML = require('yamljs');
import path = require('path');
import swaggerUi = require('swagger-ui-express');
import * as dotenv from 'dotenv';
dotenv.config();

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

  await app.listen(PORT);
}
bootstrap();
