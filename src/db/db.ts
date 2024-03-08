// import { UUID, randomInt, randomUUID } from 'node:crypto';
import { IUser } from './ifaces';
import { v4, validate } from 'uuid';
export const maxRnd = Math.pow(2, 47);
import { Exclude, Expose } from 'class-transformer';

export class Record {
  public id: string;
  constructor(id?: string) {
    this.id = id === undefined ? v4() : validate(id) ? id : v4();
  }
}

export class TUser extends Record implements IUser {
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  constructor({ login, password }: IUser) {
    super();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}

export class db_RAM<T extends Record> {
  private _db: Map<string, T>;
  constructor() {
    this._db = new Map<string, T>();
  }
  public findOne(id: string) {
    return this._db.get(id);
  }
  public findAll() {
    const res: T[] = [];
    this._db.forEach((v) => res.push(v));
    return res;
  }
  public create(record: T) {
    const { id } = record;
    this._db.set(id, record);
    return this._db.get(id);
  }
  public update(record: T) {
    const { id } = record;
    if (this.findOne(id)) {
      this._db.set(id, record);
      return this._db.get(id);
    }
    return undefined;
  }
  public remove(id: string) {
    return this._db.delete(id);
  }
}

export const db_users = new db_RAM<TUser>();
