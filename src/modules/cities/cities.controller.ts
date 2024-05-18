import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CitiesResult } from './dto/cities.result';
import { UtilsService } from '../common/utils/utils.service';

@ApiTags('Города 🏢')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({
    summary: 'Получить список популярных направлений',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'direction', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ type: CitiesResult, isArray: true, status: 200 })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('sort') sort: string = 'population',
    @Query('direction') direction: string = 'DESC',
    @Query('search') search?: string,
  ): Promise<CitiesResult[]> {
    return await this.citiesService.findAll(
      page,
      limit,
      sort,
      direction,
      UtilsService.base64ToString(search),
    );
  }
}
