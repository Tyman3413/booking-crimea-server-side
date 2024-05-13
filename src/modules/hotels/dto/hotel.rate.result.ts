import { ApiProperty } from '@nestjs/swagger';
import { ReviewDetailsResult } from '../../reviews/dto/review.details.result';

export class HotelRateResult {
  @ApiProperty({ example: 4.5 })
  rateValue: number;

  @ApiProperty({ example: 55 })
  totalComments: number;

  @ApiProperty({ type: () => ReviewDetailsResult, isArray: true })
  comments: ReviewDetailsResult[];
}
