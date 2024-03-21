import { HttpStatus } from '@nestjs/common';
import { IsBoolean, IsString } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { appError } from 'src/errors';
import { FavArtists } from 'src/favs/entities/fav.artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'artist' })
export class Artist extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  name: string;

  @Column({ type: 'boolean', nullable: false })
  @IsBoolean()
  grammy: boolean;

  constructor(obj?: object) {
    super();
    this.id = v4();
    if (obj) {
      Object.assign(this, obj);
      obj['id'] ? (this.id = v4()) : null;
    }
  }
  updateObj(obj: object) {
    if (obj) {
      obj['id'] ? delete obj['id'] : null;
      Object.assign(this, obj);
    }
  }
  static async createDto(dto: object) {
    const item = new this(dto);
    return item.save();
  }
  static async findAll() {
    return this.find();
  }
  static async findOneId(id: string) {
    return this.findOneBy({ id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.NOT_FOUND);
      return item;
    });
  }
  static async removeId(id: string) {
    return this.findOneId(id).then(() =>
      FavArtists.delete({ artistId: id })
        .then(() => Track.update({ artistId: id }, { artistId: null }))
        .then(() => Album.update({ artistId: id }, { artistId: null }))
        .then(() => this.delete({ id })),
    );
  }
  static async updateDto(id: string, dto: object) {
    return this.findOneId(id).then((item) => {
      item.updateObj(dto);
      return item.save();
    });
  }
}
