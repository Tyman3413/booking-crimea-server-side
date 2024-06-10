import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/user.decorator';
import { UserPayload } from '../auth/dto/user.payload';

@ApiTags('Пользователи 👨')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CRUD operations ✏️
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body() newUser: CreateUserDto,
  ) {
    return await this.usersService.create(newUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(@CurrentUser() user: UserPayload) {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@CurrentUser() user: UserPayload) {
    return null;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async delete(@CurrentUser() user: UserPayload) {
    return null;
  }
}
