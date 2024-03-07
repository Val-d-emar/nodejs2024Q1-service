import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import YAML = require('yamljs');
import path = require('path'); // from 'path';
import swaggerUi = require('swagger-ui-express'); // from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Загрузка файла документации
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc', 'api.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(4000);
}
bootstrap();
