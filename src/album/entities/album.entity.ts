import { HttpStatus } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';
import { appError } from 'src/errors';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'album' })
export class Album extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  name: string;

  @Column({ type: 'int' })
  @IsNumber()
  year: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  artistId: string | null; // refers to Artist

  constructor(obj?: object) {
    super();
    this.id = v4();
    if (obj) {
      Object.assign(this, obj);
      obj['id'] ? (this.id = v4()) : null;
    }
  }
  update(obj: object) {
    if (obj) {
      obj['id'] ? delete obj['id'] : null;
      Object.assign(this, obj);
    }
  }
  static async createDto(dto: object) {
    const item = new Album(dto);
    return item.save();
  }
  static async findAll() {
    return Album.find();
  }
  static async findOneId(id: string) {
    return Album.findOneBy({ id }).then((item) => {
      if (!item) throw appError(this.name, HttpStatus.NOT_FOUND);
      return item;
    });
    // .catch(() => {
    //   throw appError(this.name, HttpStatus.NOT_FOUND);
    // });
  }
  static async removeId(id: string) {
    return Album.findOneBy({ id })
      .then((item) => item.remove())
      .catch(() => {
        throw appError(this.name, HttpStatus.NOT_FOUND);
      });
  }
  static async updateId(id: string, dto: object) {
    return Album.findOneBy({ id })
      .then((item) => {
        item.update(dto);
        return item.save();
      })
      .catch(() => {
        throw appError(this.name, HttpStatus.NOT_FOUND);
      });
  }
}
