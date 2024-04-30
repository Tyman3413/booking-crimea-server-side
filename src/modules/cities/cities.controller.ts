import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CitiesResult } from './dto/cities.result';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiTags('Города 🏢')
  @ApiOperation({
    summary: 'Получить список популярных направлений',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ type: CitiesResult, isArray: true, status: 200 })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
  ): Promise<CitiesResult[]> {
    return await this.citiesService.findAll(page, limit);
  }
}
