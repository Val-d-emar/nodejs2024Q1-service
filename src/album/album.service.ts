import { Global, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
@Global()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    // 'This action adds a new album';
    return Album.createDto(createAlbumDto);
  }

  findAll() {
    // `This action returns all album`;
    return Album.findAll();
  }

  findOne(id: string) {
    // `This action returns a #${id} album`;
    return Album.findOneId(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // `This action updates a #${id} album`;
    return Album.updateDto(id, updateAlbumDto);
  }

  remove(id: string) {
    // `This action removes a #${id} album`;
    return Album.removeId(id);
  }
}
