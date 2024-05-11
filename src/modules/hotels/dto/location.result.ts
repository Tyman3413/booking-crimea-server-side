import { ApiProperty } from '@nestjs/swagger';

export class LocationResult {
  @ApiProperty({ example: '' })
  longitude: string;

  @ApiProperty({ example: '' })
  latitude: string;
}
