import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { FavArtists } from './fav.artist.entity';
import { FavAlbums } from './fav.album.entity';
import { FavTracks } from './fav.track.entity';

export class Favorites {
  artists: Artist[] = []; // favorite artists ids
  albums: Album[] = []; // favorite albums ids
  tracks: Track[] = []; // favorite tracks ids
  constructor() {
    // super();
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  static async findAll() {
    const favs = new this();
    return FavArtists.findAll().then((artists) => {
      favs.artists = artists;
      return FavAlbums.findAll().then((albums) => {
        favs.albums = albums;
        return FavTracks.findAll().then((tracks) => {
          favs.tracks = tracks;
          return favs;
        });
      });
    });
  }
  static async artistAdd(id: string) {
    return FavArtists.addOneId(id);
  }
  static async albumAdd(id: string) {
    return FavAlbums.addOneId(id);
  }
  static async trackAdd(id: string) {
    return FavTracks.addOneId(id);
  }
  static async artistDel(id: string) {
    return FavArtists.delOneId(id);
  }
  static async albumDel(id: string) {
    return FavAlbums.delOneId(id);
  }
  static async trackDel(id: string) {
    return FavTracks.delOneId(id);
  }
}
