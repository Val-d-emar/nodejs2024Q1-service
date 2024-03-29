import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbAsyncConfig } from './db/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './logging/logging.module';
import { LoggingService } from './logging/logging.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(dbAsyncConfig),
    LoggingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingService).forRoutes('*');
  }
}
