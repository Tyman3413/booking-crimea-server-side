import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { HotelListResult } from './hotel.list.result';
import { HotelDetailsResult } from './dto/hotel.details.result';
import { FindAvailableHotelsDto } from './dto/find.available.hotels.dto';
import { CreateHotelDto } from './dto/create.hotel.dto';
import { CurrentUser } from '../users/decorators/user.decorator';
import { UserPayload } from '../auth/dto/user.payload';
import { AuthGuard } from '@nestjs/passport';
import { Hotel } from './hotel.entity';
import { Public } from '../common/decorators/public.decorator';

@Controller('hotels')
@ApiTags('Отели 🏨')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiOperation({ summary: 'Конструктор объявления отеля' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateHotelDto })
  @Post()
  async createAdvertisement(
    @CurrentUser() user: UserPayload,
    @Body() dto: CreateHotelDto,
  ): Promise<Hotel> {
    return await this.hotelsService.create(user, dto);
  }

  @ApiOperation({ summary: 'Поиск отелей, подходящих под намеченную дату' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'direction', required: false, type: String })
  @ApiBody({ type: FindAvailableHotelsDto })
  @Post('find-hotels')
  async findAvailableHotels(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('sort') sort: string = 'population',
    @Query('direction') direction: string = 'DESC',
    @Body() findBody: FindAvailableHotelsDto,
  ): Promise<HotelListResult[]> {
    return this.hotelsService.findAvailableHotels(
      page,
      limit,
      sort,
      direction,
      findBody,
    );
  }

  @ApiOperation({
    summary: 'Получить список объявлений от частных арендотателей',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'direction', required: false, type: String })
  @Get('apartments')
  async getPrivateHotels(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('sort') sort: string = 'population',
    @Query('direction') direction: string = 'DESC',
  ): Promise<HotelListResult[]> {
    return await this.hotelsService.getPrivateHotels(
      page,
      limit,
      sort,
      direction,
    );
  }

  @ApiOperation({
    summary:
      'Получить полный список отелей или список отелей конкретного города',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'cityId', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'direction', required: false, type: String })
  @ApiResponse({ type: HotelListResult, isArray: true, status: 200 })
  @Public()
  @Get()
  async getHotels(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('cityId') cityId?: number,
    @Query('sort') sort: string = 'name',
    @Query('direction') direction: string = 'DESC',
  ): Promise<HotelListResult[]> {
    return await this.hotelsService.getHotelsByCityId(
      page,
      limit,
      sort,
      direction,
      cityId,
    );
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
