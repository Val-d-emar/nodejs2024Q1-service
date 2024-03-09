import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { validate } from 'uuid';
import { TrackService } from 'src/track/track.service';
@Injectable()
export class ArtistService {
  constructor(private readonly trackService: TrackService) {}
  private readonly artists: Artist[] = [];
  create(createArtistDto: CreateArtistDto) {
    // return 'This action adds a new artist';
    this.artists.push(new Artist(createArtistDto));
    return this.artists.at(-1);
  }

  findAll() {
    // return `This action returns all artist`;
    return this.artists;
  }

  findOne(id: string) {
    // return `This action returns a #${id} artist`;
    if (!validate(id)) {
      const error = new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    // return `This action updates a #${id} artist`;
    if (!validate(id)) {
      const error = new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    ////////////add checking
    artist.update(updateArtistDto);
    return artist;
  }

  remove(id: string) {
    // return `This action removes a #${id} artist`;
    if (!validate(id)) {
      const error = new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      const error = new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    this.artists.splice(index, 1);
    ////////////add checking?
    this.trackService.findAll().forEach((track) => {
      if (track.artistId === id) {
        track.update({ artistId: null });
      }
    });
    return;
  }
}
