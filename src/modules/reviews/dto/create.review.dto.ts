import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  hotelId: number;
}
