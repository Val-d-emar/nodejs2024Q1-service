import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];
  create(dto: CreateTrackDto) {
    // return 'This action adds a new track';
    this.tracks.push(new Track(dto));
    return this.tracks.at(-1);
  }

  findAll() {
    // return `This action returns all track`;
    return this.tracks;
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
    const track = this.tracks.find((tracks) => tracks.id === id);
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
    const track = this.tracks.find((track) => track.id === id);
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
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      const error = new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
      throw error;
    }
    this.tracks.splice(index, 1);
    ////////////add checking?
    return;
  }
}
