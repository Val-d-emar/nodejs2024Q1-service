import { Global, Injectable } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
@Global()
export class DB {
  public tracks: Track[] = [];
  public favs: Fav = new Fav();
  public albums: Album[] = [];
  public artists: Artist[] = [];
  public users: User[] = [];
}

export const dbInstance = new DB();
