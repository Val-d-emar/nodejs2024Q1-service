import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Put,
  ParseUUIDPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.trackService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }
}
