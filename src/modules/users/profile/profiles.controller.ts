import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { UpdateProfileDto } from '../dto/update.profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/user.decorator';
import { UserPayload } from '../../auth/dto/user.payload';
import { UserDetailsResult } from '../dto/user.details.result';

@ApiTags('Профиль 😊')
@Controller('profile')
export class ProfilesController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Полноценное заполнение профиля' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateProfileDto })
  @Post()
  async updateProfile(
    @CurrentUser() user: UserPayload,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      return await this.usersService.updateProfile(existingUser, updateProfile);
    }
  }

  @ApiOperation({ summary: 'Получить данные о пользователе' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@CurrentUser() user: User): Promise<UserDetailsResult> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      return await this.usersService.getProfile(existingUser);
    }
  }
}
