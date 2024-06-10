import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create.category.dto';
import { CategoriesService } from './categories.service';
import { UtilsService } from '../common/utils/utils.service';
import { CurrentUser } from '../users/decorators/user.decorator';
import { isAdmin, isLandlord, UserPayload } from '../auth/dto/user.payload';
import { Public } from '../common/decorators/public.decorator';
import { AccessRightsException } from '../common/exceoptions/access.rights.exception';

@Controller('categories')
@ApiTags('Категории отелей 📃')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Создание новой категории отеля' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Категория отеля успешно создана',
    type: Category,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректные данные категории отеля',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Данные для создания новой категории отеля',
  })
  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body() addedCategory: CreateCategoryDto,
  ): Promise<Category> {
    if (isAdmin(user) || isLandlord(user)) {
      const isNameExist = await this.categoriesService.isNameExist(
        addedCategory.name,
      );

      if (!isNameExist) {
        return await this.categoriesService.create(addedCategory);
      }
    } else {
      throw new AccessRightsException();
    }
  }

  @ApiOperation({ summary: 'Получение списка всех категорий отеля' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех категорий',
    type: Category,
  })
  @ApiQuery({
    name: 'name',
    description: 'Название, закодированное в base64',
    required: false,
  })
  @Public()
  @Get()
  async getAll(@Query('name') name?: string): Promise<Category[]> {
    return await this.categoriesService.findAll(
      UtilsService.base64ToString(name),
    );
  }

  @ApiOperation({ summary: 'Получить категорию отеля по ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Информация о категории',
    type: Category,
  })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор категории',
    required: true,
  })
  @Public()
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(
    @CurrentUser() user: UserPayload,
    @Param('id') id: number,
  ): Promise<Category> {
    if (isAdmin(user)) {
      return await this.categoriesService.deleteById(id);
    } else {
      throw new AccessRightsException();
    }
  }
}
