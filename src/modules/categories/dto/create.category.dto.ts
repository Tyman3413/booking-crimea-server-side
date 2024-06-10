import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории', example: 'Отель' })
  @IsString({ message: 'Название категории должно быть строкойы' })
  @MinLength(3, {
    message: 'Название категории должно содержать хотя бы 3 символа',
  })
  name: string;
}
