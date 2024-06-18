import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConveniencesService } from './conveniences.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../users/decorators/user.decorator';
import { UserPayload } from '../auth/dto/user.payload';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Удобства 🛁')
@Controller('conveniences')
export class ConveniencesController {
  constructor(private readonly conveniencesService: ConveniencesService) {}

  @ApiOperation({ summary: 'Получить список всех удобств' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@CurrentUser() user: UserPayload) {
    return await this.conveniencesService.findAll(user);
  }
}
