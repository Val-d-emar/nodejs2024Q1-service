import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export class Fav {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  artistAdd(id: string) {
    if (!this.artists.includes(id)) {
      this.artists.push(id);
    }
  }
  albumAdd(id: string) {
    if (!this.albums.includes(id)) {
      this.albums.push(id);
    }
  }
  trackAdd(id: string) {
    if (!this.tracks.includes(id)) {
      this.tracks.push(id);
    }
  }
  artistDel(id: string) {
    const index = this.artists.indexOf(id);
    if (index > -1) {
      return this.artists.splice(index, 1);
    }
  }
  albumDel(id: string) {
    const index = this.albums.indexOf(id);
    if (index > -1) {
      return this.albums.splice(index, 1);
    }
  }
  trackDel(id: string) {
    const index = this.tracks.indexOf(id);
    if (index > -1) {
      return this.tracks.splice(index, 1);
    }
  }
}
