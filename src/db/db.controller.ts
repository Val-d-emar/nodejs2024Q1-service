import { Controller } from '@nestjs/common';
import { DB } from './db.service';

@Controller()
export class DBController {
  constructor(private readonly db: DB) {}
}
