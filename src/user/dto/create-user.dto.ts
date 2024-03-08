// import { User } from '../entities/user.entity';

import { IsString } from 'class-validator';

import { v4 } from 'uuid';

export class UserDto {
  id: string;
  @IsString()
  login: string;
  @IsString()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  out() {
    const obj = new UserDto(this);
    obj.id = this.id;
    obj.login = this.login;
    obj.password = undefined;
    obj.version = this.version;
    obj.createdAt = this.createdAt;
    obj.updatedAt = this.updatedAt;
    return obj;
  }
  constructor(obj?: UserDto) {
    this.id = v4();
    this.login = obj?.login;
    this.password = obj?.password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
