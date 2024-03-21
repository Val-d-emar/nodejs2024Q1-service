import { Global, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
@Injectable()
@Global()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    // 'This action adds a new artist';
    return Artist.createDto(createArtistDto);
  }

  findAll() {
    // `This action returns all artist`;
    return Artist.findAll();
  }

  findOne(id: string) {
    // `This action returns a #${id} artist`;
    return Artist.findOneId(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    // `This action updates a #${id} artist`;
    return Artist.updateDto(id, updateArtistDto);
  }

  remove(id: string) {
    // `This action removes a #${id} artist`;
    return Artist.removeId(id);
  }
}
