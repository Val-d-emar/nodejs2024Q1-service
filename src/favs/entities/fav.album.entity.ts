import { HttpStatus } from '@nestjs/common';
import { IsString } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { appError } from 'src/errors';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'favalbums' })
export class FavAlbums extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  albumId: string; // uuid v4

  // @OneToMany(() => FavAlbums, (album) => album.id)
  @OneToOne(() => Album, { cascade: false })
  @JoinColumn()
  album: Album; // favorite album

  static async findAll() {
    return this.find({
      relations: {
        album: true,
      },
    }).then((items) => items.map((item) => item.album));
  }
  static async delOneId(id: string) {
    return this.findOneBy({ albumId: id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.NOT_FOUND);
      return this.delete({ albumId: id });
    });
  }

  static async addOneId(id: string) {
    return Album.findOneBy({ id }).then((item) => {
      if (!item) appError(this.name, HttpStatus.UNPROCESSABLE_ENTITY);
      return this.save({ albumId: id });
    });
  }
}
