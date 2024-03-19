import { Global, Module } from '@nestjs/common';
import { DB } from 'src/db/db.service';
import { DBController } from './db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
@Global()
@Module({
  controllers: [DBController],
  imports: [TypeOrmModule.forFeature()],
  providers: [DB],
  exports: [DB],
})
export class DBModule {
  constructor(private dataSource: DataSource) {}
}
