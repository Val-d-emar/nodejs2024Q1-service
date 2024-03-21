import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/album/:id')
  albumAdd(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.albumAdd(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  albumDel(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.albumDel(id);
  }
  @Post('/artist/:id')
  artistAdd(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.artistAdd(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  artistDel(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.artistDel(id);
  }
  @Post('/track/:id')
  trackAdd(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.trackAdd(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  trackDel(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.trackDel(id);
  }
}
