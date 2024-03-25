import { IsNumber, IsString } from 'class-validator';
import { v4 } from 'uuid';

export class Track {
  id: string; // uuid v4
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number; // integer number
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
