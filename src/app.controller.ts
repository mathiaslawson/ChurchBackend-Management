import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly appService: AppService, 
  ) {}
}
