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
  ApiParam,
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
import { isLandlord, UserPayload } from '../auth/dto/user.payload';
import { AuthGuard } from '@nestjs/passport';
import { Hotel } from './hotel.entity';
import { Public } from '../common/decorators/public.decorator';
import { AccessRightsException } from '../common/exceoptions/access.rights.exception';
import { OptionalGuard } from '../auth/guards/optional.guard';
import { UpdateHotelDto } from './dto/update.hotel.dto';

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
    if (isLandlord(user)) {
      return await this.hotelsService.create(user, dto);
    } else {
      throw new AccessRightsException();
    }
  }

  @ApiOperation({ summary: 'Обновление данных об отеле' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateHotelDto })
  @Post('update/:id')
  async updateAdvertisement(
    @CurrentUser() user: UserPayload,
    @Param('id') id: number,
    @Body() dto: UpdateHotelDto,
  ): Promise<Hotel> {
    if (isLandlord(user)) {
      return await this.hotelsService.update(id, user, dto);
    }
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
    @Query('sort') sort: string = 'popularity',
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
  @ApiQuery({ name: 'cityId', required: false, type: Number })
  @Get('apartments')
  async getPrivateHotels(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('sort') sort: string = 'popularity',
    @Query('direction') direction: string = 'DESC',
    @Query('cityId') cityId?: number,
  ): Promise<HotelListResult[]> {
    return await this.hotelsService.getPrivateHotels(
      page,
      limit,
      sort,
      direction,
      cityId,
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
    @Query('sort') sort: string = 'popularity',
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

  @ApiOperation({ summary: 'Получить объекты текущего пользователя' })
  @ApiResponse({ type: HotelListResult, isArray: true, status: 200 })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'direction', required: false, type: String })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('my')
  async getLandlordHotels(
    @CurrentUser() user: UserPayload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('sort') sort: string = 'popularity',
    @Query('direction') direction: string = 'DESC',
  ): Promise<HotelListResult[]> {
    return await this.hotelsService.getLandlordHotels(
      user,
      page,
      limit,
      sort,
      direction,
    );
  }

  @ApiOperation({
    summary: 'Получить информацию об определенном отеле по его ID',
  })
  @ApiResponse({ type: HotelDetailsResult, isArray: false, status: 200 })
  @UseGuards(OptionalGuard)
  @Get(':id')
  async getHotelById(
    @Param('id') id: number,
    @CurrentUser() user?: UserPayload,
  ): Promise<HotelDetailsResult> {
    console.log(user);
    return await this.hotelsService.getHotelById(id, user);
  }
}
