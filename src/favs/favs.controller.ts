import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Response } from 'express';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/album/:id')
  albumAdd(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.albumAdd(id);
    return;
  }

  @Delete('/album/:id')
  albumDel(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.favsService.albumDel(id);
    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }
  @Post('/artist/:id')
  artistAdd(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.artistAdd(id);
    return;
  }

  @Delete('/artist/:id')
  artistDel(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.favsService.artistDel(id);
    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }
  @Post('/track/:id')
  trackAdd(@Param('id', ParseUUIDPipe) id: string) {
    this.favsService.trackAdd(id);
    return;
  }

  @Delete('/track/:id')
  trackDel(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.favsService.trackDel(id);
    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }
}
