import { HttpStatus } from '@nestjs/common';
import { IsString } from 'class-validator';
import { appError } from 'src/errors';
import { Track } from 'src/track/entities/track.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'favtracks' }) // favorite tracks ids
export class FavTracks extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  trackId: string; // uuid v4

  @OneToOne(() => Track, { cascade: false })
  @JoinColumn()
  track: Track; // favorite track

  static async findAll() {
    return this.find({
      relations: {
        track: true,
      },
    }).then((items) => items.map((item) => item.track));
  }
  static async delOneId(id: string) {
    return this.findOneBy({ trackId: id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.NOT_FOUND);
      return this.delete({ trackId: id });
    });
  }

  static async addOneId(id: string) {
    return Track.findOneBy({ id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.UNPROCESSABLE_ENTITY);
      return this.save({ trackId: id });
    });
  }
}
