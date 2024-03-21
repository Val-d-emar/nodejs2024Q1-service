import { Global, Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
// import { DB } from 'src/db/db.service';

@Injectable()
@Global()
export class FavsService {
  // constructor(private readonly db: DB) {}

  findAll() {
    // `This action returns all favs`;
    // const res = new Favorites();
    // this.db.favs.albums.forEach((id) => {
    //   res.albums.push(this.db.albums.find((album) => album.id === id));
    // });
    // this.db.favs.artists.forEach((id) => {
    //   res.artists.push(this.db.artists.find((artist) => artist.id === id));
    // });
    // this.db.favs.tracks.forEach((id) => {
    //   res.tracks.push(this.db.tracks.find((track) => track.id === id));
    // });
    // return res;
    return Favorites.findAll();
  }
  albumAdd(id: string) {
    // `This action updates a #${id} fav`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'albumId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // const album = this.db.albums.find((o) => o.id === id);
    // if (!album) {
    //   const error = new HttpException(
    //     "record with id === albumId doesn't exist",
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   throw error;
    // }
    // this.db.favs.albumAdd(id);
    // return;
    return Favorites.albumAdd(id);
  }

  albumDel(id: string) {
    // `This action removes a #${id} fav`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'albumId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // if (!this.db.favs.albums.includes(id)) {
    //   const error = new HttpException(
    //     "record with id === albumId doesn't exist",
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   throw error;
    // }
    // this.db.favs.albumDel(id);
    return Favorites.albumDel(id);
  }
  trackAdd(id: string) {
    // `This action updates a #${id} fav`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'trackId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // const track = this.db.tracks.find((o) => o.id === id);
    // if (!track) {
    //   const error = new HttpException(
    //     "record with id === trackId doesn't exist",
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   throw error;
    // }
    // this.db.favs.trackAdd(id);
    // return;
    return Favorites.trackAdd(id);
  }

  trackDel(id: string) {
    // `This action removes a #${id} fav`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'trackId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // if (!this.db.favs.tracks.includes(id)) {
    //   const error = new HttpException(
    //     "record with id === trackId doesn't exist",
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   throw error;
    // }
    // this.db.favs.trackDel(id);
    return Favorites.trackDel(id);
  }

  artistAdd(id: string) {
    // `This action updates a #${id} fav`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'artistId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // const artist = this.db.artists.find((o) => o.id === id);
    // if (!artist) {
    //   const error = new HttpException(
    //     "record with id === artistId doesn't exist",
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   throw error;
    // }
    // this.db.favs.artistAdd(id);
    // return Favorites.artistAdd(id);
    return Favorites.artistAdd(id);
  }

  artistDel(id: string) {
    // `This action removes a #${id} fav`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'artistId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // if (!this.db.favs.artists.includes(id)) {
    //   const error = new HttpException(
    //     "record with id === artistId doesn't exist",
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   throw error;
    // }
    // this.db.favs.artistDel(id);
    return Favorites.artistDel(id);
  }
}
