import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { Track } from './entities/track.entity';
import { FavsService } from 'src/favs/favs.service';
import { DB } from 'src/db/db.service';

@Injectable()
@Global()
export class TrackService {
  // constructor(private readonly favsService: FavsService) {}
  constructor(private readonly db: DB) {}
  // private readonly tracks: Track[] = [];
  create(dto: CreateTrackDto) {
    // return 'This action adds a new track';
    this.db.tracks.push(new Track(dto));
    return this.db.tracks.at(-1);
  }

  findAll() {
    // return `This action returns all track`;
    return this.db.tracks;
  }

  findOne(id: string) {
    // return `This action returns a #${id} track`;
    if (!validate(id)) {
      const error = new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const track = this.db.tracks.find((tracks) => tracks.id === id);
    if (!track) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    return track;
  }

  update(id: string, dto: UpdateTrackDto) {
    // return `This action updates a #${id} track`;
    if (!validate(id)) {
      const error = new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    ////////////add checking
    track.update(dto);
    return track;
  }

  remove(id: string) {
    // return `This action removes a #${id} track`;
    if (!validate(id)) {
      const error = new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
      throw error;
    }
    const index = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    this.db.tracks.splice(index, 1);

    const idx = this.db.favs.tracks.indexOf(id);
    if (index > -1) {
      this.db.favs.tracks.splice(idx, 1);
    }
    return;
  }
}
