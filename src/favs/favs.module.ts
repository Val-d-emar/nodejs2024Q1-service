import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, AlbumService],
})
export class FavsModule {}
