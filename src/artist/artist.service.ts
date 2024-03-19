import { Global, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { DB } from 'src/db/db.service';
@Injectable()
@Global()
export class ArtistService {
  constructor(private readonly db: DB) {}

  create(createArtistDto: CreateArtistDto) {
    // 'This action adds a new artist';
    // this.db.artists.push(new Artist(createArtistDto));
    // return this.db.artists.at(-1);
    return Artist.createDto(createArtistDto);
  }

  findAll() {
    // `This action returns all artist`;
    // return this.db.artists;
    return Artist.findAll();
  }

  findOne(id: string) {
    // `This action returns a #${id} artist`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'artistId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // const artist = this.db.artists.find((artist) => artist.id === id);
    // if (!artist) {
    //   const error = new HttpException(
    //     "record with id === artistId doesn't exist",
    //     HttpStatus.NOT_FOUND,
    //   );
    //   throw error;
    // }
    // return artist;
    return Artist.findOneId(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    // `This action updates a #${id} artist`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'artistId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // const artist = this.db.artists.find((artist) => artist.id === id);
    // if (!artist) {
    //   const error = new HttpException(
    //     "record with id === artistId doesn't exist",
    //     HttpStatus.NOT_FOUND,
    //   );
    //   throw error;
    // }
    // artist.update(updateArtistDto);
    // return artist;
    return Artist.updateId(id, updateArtistDto);
  }

  remove(id: string) {
    // `This action removes a #${id} artist`;
    // if (!validate(id)) {
    //   const error = new HttpException(
    //     'artistId is invalid (not uuid)',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   throw error;
    // }
    // const index = this.db.artists.findIndex((artist) => artist.id === id);
    // if (index === -1) {
    //   const error = new HttpException(
    //     "record with id === artistId doesn't exist",
    //     HttpStatus.NOT_FOUND,
    //   );
    //   throw error;
    // }
    // this.db.artists.splice(index, 1);

    // this.db.tracks.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.update({ artistId: null });
    //   }
    // });

    // this.db.albums.forEach((album) => {
    //   if (album.artistId === id) {
    //     album.update({ artistId: null });
    //   }
    // });

    // const idx = this.db.favs.artists.indexOf(id);
    // if (index > -1) {
    //   this.db.favs.artists.splice(idx, 1);
    // }
    // return;
    return Artist.removeId(id);
  }
}
