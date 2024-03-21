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
  id: string; // uuid v4

  @OneToOne(() => Track, { cascade: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  track: Track; // favorite track

  static async findAll() {
    return this.find({
      relations: {
        track: true,
      },
    }).then((items) => items.map((item) => item.track));
  }
  static async delOneId(id: string) {
    return this.findOneBy({ id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.NOT_FOUND);
      return this.delete({ id });
    });
  }

  static async addOneId(id: string) {
    return Track.findOneBy({ id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.UNPROCESSABLE_ENTITY);
      return this.save({ id });
    });
  }
}
