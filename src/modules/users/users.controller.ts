import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';

@ApiTags('Пользователи 👨')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CRUD operations ✏️
  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @Get()
  async get() {
    return await this.usersService.findAll();
  }

  @Put()
  async update() {
    return null;
  }

  @Delete()
  async delete() {
    return null;
  }
}
