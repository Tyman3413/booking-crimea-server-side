import { ApiProperty } from '@nestjs/swagger';

export class ConvenienceResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Кондиционер' })
  title: string;

  @ApiProperty({ example: '<i class="fa-solid fa-heart"></i>' })
  icon: string;
}
