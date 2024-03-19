import { HttpStatus } from '@nestjs/common';
import { IsBoolean, IsString } from 'class-validator';
import { appError } from 'src/errors';
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
  update(obj: object) {
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
      if (!item) throw appError(this.name, HttpStatus.NOT_FOUND);
      return item;
    });
  }
  static async removeId(id: string) {
    return this.findOneBy({ id })
      .then((item) => item.remove())
      .catch(() => {
        throw appError(this.name, HttpStatus.NOT_FOUND);
      });
  }
  static async updateId(id: string, dto: object) {
    return this.findOneBy({ id })
      .then((item) => {
        item.update(dto);
        return item.save();
      })
      .catch(() => {
        throw appError(this.name, HttpStatus.NOT_FOUND);
      });
  }
}
