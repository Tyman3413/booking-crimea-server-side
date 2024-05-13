import { ApiProperty } from '@nestjs/swagger';

export class HotelCoordsResult {
  @ApiProperty({ example: '79' })
  longitude: string;

  @ApiProperty({ example: '89' })
  latitude: string;
}
