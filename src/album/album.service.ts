import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate } from 'uuid';
import { TrackService } from 'src/track/track.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    // private readonly favsService: FavsService,
  ) {}
  private readonly albums: Album[] = [];
  create(createAlbumDto: CreateAlbumDto) {
    // return 'This action adds a new album';
    this.albums.push(new Album(createAlbumDto));
    return this.albums.at(-1);
  }

  findAll() {
    // return `This action returns all album`;
    return this.albums;
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
    const album = this.albums.find((album) => album.id === id);
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
    const album = this.albums.find((album) => album.id === id);
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
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      const error = new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    this.albums.splice(index, 1);
    this.trackService.findAll().forEach((track) => {
      if (track.albumId === id) {
        track.update({ albumId: null });
      }
    });
    // // const favs = this.favsService.getFavs();
    // const idx = favs.albums.indexOf(id);
    // if (index > -1) {
    //   favs.albums.splice(idx, 1);
    // }
    return;
  }
}
