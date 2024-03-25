import { IsString } from 'class-validator';
import { v4 } from 'uuid';

export class User {
  id: string;
  @IsString()
  login: string;
  @IsString()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  out() {
    const obj = new User(this);
    Object.assign(obj, this);
    obj.password = undefined;
    return obj;
  }
  constructor(obj?: object) {
    obj ? Object.assign(this, obj) : null;
    this.id = v4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
