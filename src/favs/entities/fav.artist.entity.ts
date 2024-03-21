import { HttpStatus } from '@nestjs/common';
import { IsString } from 'class-validator';
import { Artist } from 'src/artist/entities/artist.entity';
import { appError } from 'src/errors';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'favartists' })
export class FavArtists extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  id: string; // uuid v4

  @OneToOne(() => Artist, { cascade: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  artist: Artist; // favorite artist

  static async findAll() {
    return this.find({
      relations: {
        artist: true,
      },
    }).then((items) => items.map((item) => item.artist));
  }
  static async delOneId(id: string) {
    return this.findOneBy({ id }).then((item) => {
      if (!item) appError('artist', HttpStatus.NOT_FOUND);
      return this.delete({ id });
    });
  }

  static async addOneId(id: string) {
    return Artist.findOneBy({ id }).then((item) => {
      if (!item) appError('artist', HttpStatus.UNPROCESSABLE_ENTITY);
      return this.save({ id });
    });
  }
}
