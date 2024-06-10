import {
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoadDataResponse } from './dto/load.data.response';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/decorators/user.decorator';
import { isAdmin, UserPayload } from '../auth/dto/user.payload';

@ApiTags('Администрирование ⚙️')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('load-data-countries-states-cities')
  async loadDataCountriesStatesCities(
    @CurrentUser() user: UserPayload,
  ): Promise<LoadDataResponse> {
    if (!isAdmin(user)) {
      throw new ForbiddenException('Недостаточно прав доступа');
    }
    return await this.databaseService.loadCountriesStatesCitiesData();
  }
}
