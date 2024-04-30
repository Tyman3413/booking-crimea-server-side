import { ApiProperty } from '@nestjs/swagger';
import { HotelCategories } from './hotel.categories.enum';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: HotelCategories;
}
