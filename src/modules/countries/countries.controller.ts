import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Country } from './country.entity';
import { UtilsService } from '../common/utils/utils.service';

@ApiTags('Страны 🏳️')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Получить список всех стран' })
  @ApiQuery({
    name: 'search',
    description: 'Название, закодированное в base64',
    required: false,
  })
  @Get()
  async findAll(@Query('search') search?: string): Promise<Country[]> {
    return await this.countriesService.findAll(
      UtilsService.base64ToString(search),
    );
  }
}
