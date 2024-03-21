import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

class DbConfigService {
  public getConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT)
        : 15432,
      username: process.env.POSTGRES_USER ?? 'myuser',
      password: process.env.POSTGRES_PASSWORD ?? 'mypassword',
      database: process.env.POSTGRES_DATABASE ?? 'mydatabase',
      synchronize: false,
      logging: false,
      subscribers: [],
      migrationsTableName: 'migrations_TypeORM',
      // entities: [User],
      // entities: ['src/*/entities/*.entity{.ts,.js}'],
      entities: ['dist/*/entities/*.entity{.ts,.js}'],
      // migrations: [User],
      // migrations: ['src/db/migration/*{.ts,.js}'],
      migrations: ['dist/db/migrations/*{.ts,.js}'],
      ssl: process.env.POSTGRES_MODE !== 'DEV',
      parseInt8: true,
    };
  }
}
export const dbConfigService = new DbConfigService();

// NestJS Connection Configuration
export const dbAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return dbConfigService.getConfig();
  },
};
export const datastore = new DataSource(
  dbConfigService.getConfig() as DataSourceOptions,
);

// TypeORM Connection Config
export const typeOrmConfig =
  dbConfigService.getConfig() as TypeOrmModuleOptions;
