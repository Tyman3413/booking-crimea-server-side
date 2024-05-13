import { ApiProperty } from '@nestjs/swagger';

export class ReviewDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Катя' })
  username: string;

  @ApiProperty({ example: '6 суток' })
  spendTime: number;

  @ApiProperty({ example: '13.03.2024' })
  timestamp: Date;

  @ApiProperty({ example: 4.5 })
  rate: number;

  @ApiProperty({ example: 'Хороший отель' })
  comment: string;
}
