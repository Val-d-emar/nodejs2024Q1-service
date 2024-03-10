import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorites } from './entities/fav.entity';
import { validate } from 'uuid';
import { DB } from 'src/db/db.service';

@Injectable()
@Global()
export class FavsService {
  constructor(private readonly db: DB) {}

  findAll() {
    // return `This action returns all favs`;
    const res = new Favorites();
    this.db.favs.albums.forEach((id) => {
      res.albums.push(this.db.albums.find((album) => album.id === id));
    });
    this.db.favs.artists.forEach((id) => {
      res.artists.push(this.db.artists.find((artist) => artist.id === id));
    });
    this.db.favs.tracks.forEach((id) => {
      res.tracks.push(this.db.tracks.find((track) => track.id === id));
    });
    return res;
  }
  getFavs() {
    return this.db.favs;
  }
  albumAdd(id: string) {
    // return `This action updates a #${id} fav`;
    if (!validate(id)) {
      const error = new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const album = this.db.albums.find((o) => o.id === id);
    if (!album) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.db.favs.albumAdd(id);
    return;
  }

  albumDel(id: string) {
    // return `This action removes a #${id} fav`;
    if (!validate(id)) {
      const error = new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    if (!this.db.favs.albums.includes(id)) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.db.favs.albumDel(id);
  }
  trackAdd(id: string) {
    // return `This action updates a #${id} fav`;
    if (!validate(id)) {
      const error = new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const track = this.db.tracks.find((o) => o.id === id);
    if (!track) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.db.favs.trackAdd(id);
    return;
  }

  trackDel(id: string) {
    // return `This action removes a #${id} fav`;
    if (!validate(id)) {
      const error = new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    if (!this.db.favs.tracks.includes(id)) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.db.favs.trackDel(id);
  }

  artistAdd(id: string) {
    // return `This action updates a #${id} fav`;
    if (!validate(id)) {
      const error = new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const artist = this.db.artists.find((o) => o.id === id);
    if (!artist) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.db.favs.artistAdd(id);
    return;
  }

  artistDel(id: string) {
    // return `This action removes a #${id} fav`;
    if (!validate(id)) {
      const error = new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    if (!this.db.favs.artists.includes(id)) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.db.favs.artistDel(id);
  }
}
