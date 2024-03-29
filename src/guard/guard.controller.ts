import { Controller } from '@nestjs/common';
import { GuardService } from './guard.service';

@Controller('guard')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}
}
