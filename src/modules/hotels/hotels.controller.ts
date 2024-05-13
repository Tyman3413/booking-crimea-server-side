import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { HotelListResult } from './hotel.list.result';
import { HotelDetailsResult } from './dto/hotel.details.result';
import { Hotel } from './hotel.entity';

@Controller('hotels')
@ApiTags('Отели 🏨')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

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

  @ApiOperation({
    summary: 'Получить информацию об определенном отеле по его ID',
  })
  @ApiResponse({ type: HotelDetailsResult, isArray: false, status: 200 })
  @Get(':id')
  async getHotelById(@Param('id') id: number): Promise<HotelDetailsResult> {
    return await this.hotelsService.getHotelById(id);
  }
}
