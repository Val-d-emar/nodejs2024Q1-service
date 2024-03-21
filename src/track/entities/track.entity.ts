import { HttpStatus } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { appError } from 'src/errors';
import { Favorites } from 'src/favs/entities/favorites.entity';
// import { FavTracks } from 'src/favs/entities/fav.track.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'track' })
export class Track extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  artistId: string | null; // refers to Artist

  @OneToOne(() => Artist, { cascade: false })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: Artist | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  albumId: string | null; // refers to Album

  @OneToOne(() => Album, { cascade: false })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: Album | null;

  @Column({ type: 'int' })
  @IsNumber()
  duration: number; // integer number

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
      Favorites.delete({ id }).then(() => this.delete({ id })),
    );
  }
  static async updateDto(id: string, dto: object) {
    return this.findOneId(id).then((item) => {
      item.updateObj(dto);
      return item.save();
    });
  }
}
