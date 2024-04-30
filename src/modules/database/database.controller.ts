import { Controller, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ApiTags } from '@nestjs/swagger';
import { LoadDataResponse } from './dto/load.data.response';

@ApiTags('Администрирование ⚙️')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('load-data-countries-states-cities')
  async loadDataCountriesStatesCities(): Promise<LoadDataResponse> {
    return await this.databaseService.loadCountriesStatesCitiesData();
  }
}
