import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CitiesResult } from '../dto/cities.result';
import { AuthGuard } from '@nestjs/passport';

@Controller('cities')
@UseGuards(AuthGuard('jwt'))
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiBearerAuth()
  @ApiTags('Города 🏢')
  @ApiOperation({
    summary: 'Получить список популярных городов',
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
