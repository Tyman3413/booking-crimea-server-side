import { ApiProperty } from '@nestjs/swagger';

export class ReviewDetailsDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Катя' })
  username: string;

  @ApiProperty({ example: 'Май 2023, 6 суток' })
  spendTime: string;

  @ApiProperty({ example: 'месяц назад' })
  timestamp: string;

  @ApiProperty({ example: 4.5 })
  rate: number;

  @ApiProperty({ example: 'Хороший отель' })
  comment: string;
}
