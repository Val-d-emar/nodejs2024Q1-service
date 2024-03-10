import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate } from 'uuid';
// import { TrackService } from 'src/track/track.service';
// import { FavsService } from 'src/favs/favs.service';
import { DB } from 'src/db/db.service';

@Injectable()
@Global()
export class AlbumService {
  constructor(private readonly db: DB) {}
  //   constructor(
  //     // private readonly favsService: FavsService,
  //     // private readonly albumService: AlbumService,
  //     private readonly trackService: TrackService,
  //   ) {}
  // private readonly albums: Album[] = [];
  create(createAlbumDto: CreateAlbumDto) {
    // return 'This action adds a new album';
    this.db.albums.push(new Album(createAlbumDto));
    return this.db.albums.at(-1);
  }

  findAll() {
    // return `This action returns all album`;
    return this.db.albums;
  }

  findOne(id: string) {
    // return `This action returns a #${id} album`;
    if (!validate(id)) {
      const error = new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // return `This action updates a #${id} album`;
    if (!validate(id)) {
      const error = new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    ////////////add checking
    album.update(updateAlbumDto);
    return album;
  }

  remove(id: string) {
    // return `This action removes a #${id} album`;
    if (!validate(id)) {
      const error = new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    this.db.albums.splice(index, 1);
    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.update({ albumId: null });
      }
    });
    // const favs = this.favsService.getFavs();
    const idx = this.db.favs.albums.indexOf(id);
    if (index > -1) {
      this.db.favs.albums.splice(idx, 1);
    }
    return;
  }
}
