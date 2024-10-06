import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
