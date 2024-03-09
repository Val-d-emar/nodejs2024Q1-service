import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Fav, Favorites } from './entities/fav.entity';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}
  private readonly favs = new Fav();

  findAll() {
    // return `This action returns all favs`;
    const res = new Favorites();
    this.favs.albums.forEach((id) => {
      res.albums.push(
        this.albumService.findAll().find((album) => album.id === id),
      );
    });
    this.favs.artists.forEach((id) => {
      res.artists.push(
        this.artistService.findAll().find((artist) => artist.id === id),
      );
    });
    this.favs.tracks.forEach((id) => {
      res.tracks.push(
        this.trackService.findAll().find((track) => track.id === id),
      );
    });
    return res;
  }
  getFavs() {
    return this.favs;
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
    const album = this.albumService.findAll().find((o) => o.id === id);
    if (!album) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.favs.albumAdd(id);
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
    if (!this.favs.albums.includes(id)) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.favs.albumDel(id);
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
    const track = this.trackService.findAll().find((o) => o.id === id);
    if (!track) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.favs.trackAdd(id);
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
    if (!this.favs.tracks.includes(id)) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.favs.trackDel(id);
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
    const artist = this.artistService.findAll().find((o) => o.id === id);
    if (!artist) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.favs.artistAdd(id);
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
    if (!this.favs.artists.includes(id)) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      throw error;
    }
    this.favs.artistDel(id);
  }
}
