import { Global, Injectable } from '@nestjs/common';
import { Favorites } from './entities/favs.entity';

@Injectable()
@Global()
export class FavsService {
  findAll() {
    // `This action returns all favs`;
    return Favorites.findAll();
  }
  albumAdd(id: string) {
    // `This action updates a #${id} fav`;
    return Favorites.albumAdd(id);
  }

  albumDel(id: string) {
    // `This action removes a #${id} fav`;
    return Favorites.albumDel(id);
  }
  trackAdd(id: string) {
    // `This action updates a #${id} fav`;
    return Favorites.trackAdd(id);
  }

  trackDel(id: string) {
    // `This action removes a #${id} fav`;
    return Favorites.trackDel(id);
  }

  artistAdd(id: string) {
    // `This action updates a #${id} fav`;
    return Favorites.artistAdd(id);
  }

  artistDel(id: string) {
    // `This action removes a #${id} fav`;
    return Favorites.artistDel(id);
  }
}
