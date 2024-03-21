import { Global, Injectable } from '@nestjs/common';

@Injectable()
@Global()
export class DB {
  // public tracks: Track[] = [];
  // public favs: Fav = new Fav();
  // public albums: Album[] = [];
  // public artists: Artist[] = [];
  // public users: User[] = [];
}

export const dbInstance = new DB();
