import { HttpStatus } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { appError } from 'src/errors';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  login: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Exclude({ toPlainOnly: true })
  @IsString()
  password: string;

  @Column({ type: 'int' })
  @IsNumber()
  version: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  createdAt: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  updatedAt: number;

  out() {
    const obj = new User(this);
    Object.assign(obj, this);
    obj.password = undefined;
    return obj;
  }
  constructor(obj?: object) {
    super();
    this.id = v4();
    if (obj) {
      this.login = obj['login'] ? obj['login'] : undefined;
      this.password = obj['password'] ? obj['password'] : undefined;
      obj['id'] ? (this.id = v4()) : null;
    }
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }
  static async createDto(dto: object) {
    const user = new User(dto);
    return user.save().then((u) => u.out());
  }
  static async findAll() {
    return User.find().then((users) => {
      const usersOut: User[] = [];
      users.forEach((user) => usersOut.push(user.out()));
      return usersOut;
    });
  }
  static async findOneId(id: string) {
    return User.findOneBy({ id }).then((user) => {
      if (!user) appError(this.name, HttpStatus.NOT_FOUND);
      return user;
    });
  }
  static async removeId(id: string) {
    return User.findOneId(id).then((user) => user.remove());
  }
  static async updatePassword(id: string, dto: object) {
    return User.findOneId(id).then(async (user) => {
      // if (user.password !== dto['oldPassword']) {
      //   appError('oldPassword is wrong', HttpStatus.FORBIDDEN);
      // }

      const isMatch = await bcrypt.compare(dto['oldPassword'], user.password);
      if (!isMatch) {
        appError('oldPassword is wrong', HttpStatus.FORBIDDEN);
      }

      user.password = dto['newPassword'];
      user.version++;
      user.updatedAt = Date.now();
      return user.save().then((u) => u.out());
    });
  }
}
