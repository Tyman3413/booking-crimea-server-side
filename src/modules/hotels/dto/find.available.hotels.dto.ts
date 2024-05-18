import { ApiProperty } from '@nestjs/swagger';

export class FindAvailableHotelsDto {
  @ApiProperty()
  cityId: number;

  @ApiProperty()
  checkIn: Date;

  @ApiProperty()
  checkOut: Date;

  @ApiProperty()
  guests: number;
}
