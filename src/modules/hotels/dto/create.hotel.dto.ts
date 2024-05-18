import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  conveniences: number[];

  @ApiProperty()
  contactPhone: string;

  @ApiProperty()
  image: string;
}
