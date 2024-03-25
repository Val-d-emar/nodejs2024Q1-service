import { Global, Module } from '@nestjs/common';
import { DB } from 'src/db/db.service';
import { DBController } from './db.controller';
@Global()
@Module({
  controllers: [DBController],
  providers: [DB],
  exports: [DB],
})
export class DBModule {}
