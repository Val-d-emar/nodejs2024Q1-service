import {
  Controller,
  Get,
  // HttpException,
  // HttpStatus,
  Param,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './guard/guard.service';
import { HttpErrorFilter } from './app.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @UseFilters(new HttpErrorFilter())
  @Get(':id')
  findOne(@Param('id') id: string) {
    // throw new Error(`${id}`);
    return this.findOne(id);
  }
}
