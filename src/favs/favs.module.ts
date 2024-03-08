import { Global, Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
// @Global()
@Module({
  controllers: [FavsController],
  providers: [FavsService],
  // exports: [FavsService],
})
export class FavsModule {}