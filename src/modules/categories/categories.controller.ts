import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create.category.dto';
import { CategoriesService } from './categories.service';
import { UtilsService } from '../common/utils/utils.service';

@Controller('types')
@ApiTags('Виды отелей 📃')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Создание новой категории отеля' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'Категория отеля успешно создана',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные категории отеля',
  })
  @Post()
  async create(@Body() addedCategory: CreateCategoryDto): Promise<Category> {
    const isNameExist = await this.categoriesService.isNameExist(
      addedCategory.name,
    );

    if (!isNameExist) {
      return await this.categoriesService.create(addedCategory);
    }
  }

  @ApiOperation({ summary: 'Получение списка всех категорий отеля' })
  @ApiResponse({
    status: 200,
    description: 'Список всех категорий',
    type: [Category],
  })
  @ApiQuery({
    name: 'name',
    description: 'Название, закодированное в base64',
    required: false,
  })
  @Get()
  async getAll(@Query('name') name?: string): Promise<Category[]> {
    return await this.categoriesService.findAll(
      UtilsService.base64ToString(name),
    );
  }

  @ApiOperation({ summary: 'Получить категорию отеля по ID' })
  @ApiResponse({
    status: 200,
    description: 'Информация о категории',
    type: Category,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return await this.categoriesService.findOneById(id);
  }

  @ApiOperation({ summary: 'Удалить категорию отеля из списка' })
  @ApiResponse({
    status: 200,
    description: 'Категория удалена',
    type: Category,
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Category> {
    return await this.categoriesService.deleteById(id);
  }
}
