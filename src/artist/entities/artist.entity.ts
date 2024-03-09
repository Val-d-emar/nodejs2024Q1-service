import { IsBoolean, IsString } from 'class-validator';
import { v4 } from 'uuid';
export class Artist {
  id: string; // uuid v4
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
  constructor(obj?: object) {
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
}
