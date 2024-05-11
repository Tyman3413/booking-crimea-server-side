import { ApiProperty } from '@nestjs/swagger';
import { HotelsResult } from '../../hotels/dto/hotels.result';

export class CitiesResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ялта' })
  title: string;

  @ApiProperty({
    example: 'Севастополь - город на юго-западе Крымского полуострова ...',
  })
  description: string;

  @ApiProperty({ example: 'https://somesite.com/photo.jpg' })
  img: string;

  @ApiProperty({ example: 100 })
  totalHotels: number;

  @ApiProperty()
  hotels: HotelsResult[];
}
