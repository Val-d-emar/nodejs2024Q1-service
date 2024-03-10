import { Global, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavsModule } from 'src/favs/favs.module';
// @Global()
@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  // imports: [FavsModule],
})
export class ArtistModule {}
