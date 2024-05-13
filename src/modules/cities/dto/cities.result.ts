import { ApiProperty } from '@nestjs/swagger';
import { HotelsResult } from '../../hotels/dto/hotels.result';

export class CitiesResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ялта' })
  title: string;

  @ApiProperty({
    example: 'Описание города ...',
  })
  description: string;

  @ApiProperty({ example: 'https://somesite.com/photo.jpg' })
  img: string;

  @ApiProperty({ type: () => HotelsResult, isArray: true })
  hotels: HotelsResult[];

  @ApiProperty({ example: 100 })
  totalHotels: number;
}
