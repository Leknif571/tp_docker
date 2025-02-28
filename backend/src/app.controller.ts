import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './app.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(): Promise<App[]> {
    return this.appService.findAll();
  }
}
