import { ApiProperty } from '@nestjs/swagger';
import { HotelCategories } from './hotel.categories.enum';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории', example: 'Отель' })
  name: string;

  @ApiProperty({ description: 'Тип отеля', enum: HotelCategories })
  type: HotelCategories;
}
