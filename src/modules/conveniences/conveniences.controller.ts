import { Controller, Get } from '@nestjs/common';
import { ConveniencesService } from './conveniences.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Удобства 🛁')
@Controller()
export class ConveniencesController {
  constructor(private readonly conveniencesService: ConveniencesService) {}

  @ApiOperation({ summary: 'Получить список всех удобств' })
  @Get()
  async getAll() {
    return await this.conveniencesService.findAll();
  }
}
