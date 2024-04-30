import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create.category.dto';
import { CategoriesService } from './categories.service';

@Controller('types')
@ApiTags('Виды отелей ❔')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Создание категории отеля' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'Категория успешно создана',
    type: Category,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные категории' })
  @Post()
  async create(@Body() addedCategory: CreateCategoryDto): Promise<Category> {
    const isNameExist = await this.categoriesService.isNameExist(
      addedCategory.name,
    );

    if (!isNameExist) {
      return await this.categoriesService.create(addedCategory);
    }
  }

  @ApiOperation({ summary: 'Получение списка всех категорий' })
  @ApiResponse({
    status: 200,
    description: 'Список всех категорий',
    type: [Category],
  })
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoriesService.getAll();
  }
}
