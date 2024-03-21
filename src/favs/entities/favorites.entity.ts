import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { BaseEntity, Column, Entity, In, PrimaryColumn } from 'typeorm';
import { IsEnum, IsString } from 'class-validator';
import { appError } from 'src/errors';
import { HttpStatus } from '@nestjs/common';

class Favs {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export enum FavsEnum {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
}

@Entity({ name: 'favorites' })
export class Favorites extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  id: string; // uuid v4

  @Column({ type: 'simple-enum', enum: FavsEnum })
  @IsEnum(FavsEnum)
  table: FavsEnum;

  static async findAll() {
    const favs = new Favs();
    return Favorites.findBy({ table: FavsEnum.ARTIST })
      .then((items) => {
        const ids = items.map((item) => item.id);
        return Artist.findBy({ id: In([...ids]) }).then((ar) => {
          favs.artists.push(...ar);
          return favs;
        });
      })
      .then(() =>
        Favorites.findBy({ table: FavsEnum.ALBUM }).then((items) => {
          const ids = items.map((item) => item.id);
          return Album.findBy({ id: In([...ids]) }).then((al) => {
            favs.albums.push(...al);
            return favs;
          });
        }),
      )
      .then(() =>
        Favorites.findBy({ table: FavsEnum.TRACK }).then((items) => {
          const ids = items.map((item) => item.id);
          return Track.findBy({ id: In([...ids]) }).then((tr) => {
            favs.tracks.push(...tr);
            return favs;
          });
        }),
      );
  }
  static async artistAdd(id: string) {
    return Artist.findOneBy({ id }).then((item) => {
      if (!item) appError('artist', HttpStatus.UNPROCESSABLE_ENTITY);
      return Favorites.save({ id, table: FavsEnum.ARTIST });
    });
  }
  static async albumAdd(id: string) {
    return Album.findOneBy({ id }).then((item) => {
      if (!item) appError('album', HttpStatus.UNPROCESSABLE_ENTITY);
      return Favorites.save({ id, table: FavsEnum.ALBUM });
    });
  }
  static async trackAdd(id: string) {
    return Track.findOneBy({ id }).then((item) => {
      if (!item) appError('track', HttpStatus.UNPROCESSABLE_ENTITY);
      return Favorites.save({ id, table: FavsEnum.TRACK });
    });
  }
  static async artistDel(id: string) {
    return Favorites.findOneBy({ id }).then((item) => {
      if (!item) appError('artist', HttpStatus.NOT_FOUND);
      return Favorites.delete({ id });
    });
  }
  static async albumDel(id: string) {
    return Favorites.findOneBy({ id }).then((item) => {
      if (!item) appError('album', HttpStatus.NOT_FOUND);
      return Favorites.delete({ id });
    });
  }
  static async trackDel(id: string) {
    return Favorites.findOneBy({ id }).then((item) => {
      if (!item) appError('track', HttpStatus.NOT_FOUND);
      return Favorites.delete({ id });
    });
  }
}
