import { ApiProperty } from '@nestjs/swagger';
import { ReviewDetailsDto } from '../../reviews/review.details.dto';

export class HotelRateResult {
  @ApiProperty({ example: 4.5 })
  rateValue: number;

  @ApiProperty({ example: 55 })
  totalComments: number;

  @ApiProperty()
  comments: ReviewDetailsDto[];
}
