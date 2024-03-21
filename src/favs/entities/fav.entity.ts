import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
// import { BaseEntity, ViewColumn, ViewEntity } from 'typeorm';
import { FavArtists } from './fav.artist.entity';
import { FavAlbums } from './fav.album.entity';
import { FavTracks } from './fav.track.entity';
// import { BaseEntity } from 'typeorm';
// import { Entity } from 'typeorm';

// @Entity({ name: 'favs' })
export class Favorites {
  // extends BaseEntity
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

// @ViewEntity({
//   name: 'favs',
//   expression: `
//         SELECT
//         "favartists" AS "artists",
//         "favalbums" AS "albums",
//         "favtracks" AS "tracks"
//         FROM "favartists", "favalbums", "favtracks"
//     `,
// })
// export class Favs {
//   //extends BaseEntity
//   @ViewColumn()
//   artists: Artist[];

//   @ViewColumn()
//   albums: Album[];

//   @ViewColumn()
//   tracks: Track[];
// }

// export class Favorites_old {
//   artists: Artist[]; // favorite artists ids
//   albums: Album[]; // favorite albums ids
//   tracks: Track[]; // favorite tracks ids
//   constructor() {
//     this.artists = [];
//     this.albums = [];
//     this.tracks = [];
//   }
// }

// // @Entity({ name: 'favs' })
// export class Favs_old {
//   //extends BaseEntity {
//   // @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
//   // @IsString()
//   // id: string; // uuid v4

//   // @OneToMany(() => FavArtist, (artist) => artist.id)
//   // artists: FavArtist[]; // favorite artists ids

//   // @OneToMany(() => FavAlbum, (album) => album.id)
//   // albums: FavAlbum[]; // favorite albums ids

//   // @OneToMany(() => FavTrack, (track) => track.id)
//   // tracks: FavTrack[]; // favorite tracks ids

//   constructor() {
//     // super();
//     // this.artists = [];
//     // this.albums = [];
//     // this.tracks = [];
//   }
//   static async findAll() {
//     // return Favs.find();
//   }
//   artistAdd(id: string) {
//     // if (!this.artists.includes(id)) {
//     //   this.artists.push(id);
//     // }
//   }
//   albumAdd(id: string) {
//     // if (!this.albums.includes(id)) {
//     //   this.albums.push(id);
//     // }
//   }
//   trackAdd(id: string) {
//     // if (!this.tracks.includes(id)) {
//     //   this.tracks.push(id);
//     // }
//   }
//   artistDel(id: string) {
//     // const index = this.artists.indexOf(id);
//     // if (index > -1) {
//     //   return this.artists.splice(index, 1);
//     // }
//   }
//   albumDel(id: string) {
//     // const index = this.albums.indexOf(id);
//     // if (index > -1) {
//     //   return this.albums.splice(index, 1);
//     // }
//   }
//   trackDel(id: string) {
//     // const index = this.tracks.indexOf(id);
//     // if (index > -1) {
//     //   return this.tracks.splice(index, 1);
//     // }
//   }
// }
