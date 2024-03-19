import { HttpStatus } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';
import { appError } from 'src/errors';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  albumId: string | null; // refers to Album

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
    return this.findOneId(id).then((item) => item.remove());
  }
  static async updateDto(id: string, dto: object) {
    return this.findOneId(id).then((item) => {
      item.updateObj(dto);
      return item.save();
    });
  }
}
