import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelsService } from '../services/hotels.service';
import { HotelListResult } from '../dto/hotel.list.result';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiTags('Отели 🏨')
  @ApiOperation({
    summary:
      'Получить полный список отелей или список отелей конкретного гоорода',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'cityId', required: false })
  @ApiResponse({ type: HotelListResult, isArray: true, status: 200 })
  @Get()
  async getHotels(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('cityId') cityId?: number,
  ): Promise<HotelListResult[]> {
    return await this.hotelsService.getHotelsByCityId(page, limit, cityId);
  }
}
