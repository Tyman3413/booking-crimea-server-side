import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create.category.dto';
import { CategoriesService } from './categories.service';

@Controller('types')
@ApiTags('Виды отелей ❔')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() addedCategory: CreateCategoryDto): Promise<Category> {
    const isNameExist = await this.categoriesService.isNameExist(
      addedCategory.name,
    );

    if (!isNameExist) {
      return await this.categoriesService.create(addedCategory);
    }
  }

  @Get()
  async getAll() {}
}
