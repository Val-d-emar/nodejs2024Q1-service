import { Global, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
@Global()
export class TrackService {
  create(dto: CreateTrackDto) {
    // 'This action adds a new track';
    return Track.createDto(dto);
  }

  findAll() {
    // `This action returns all track`;
    return Track.findAll();
  }

  findOne(id: string) {
    // `This action returns a #${id} track`;
    return Track.findOneId(id);
  }

  update(id: string, dto: UpdateTrackDto) {
    // `This action updates a #${id} track`;
    return Track.updateDto(id, dto);
  }

  remove(id: string) {
    // `This action removes a #${id} track`;
    return Track.removeId(id);
  }
}
