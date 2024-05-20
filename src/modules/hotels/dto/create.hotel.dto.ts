import { ApiProperty } from '@nestjs/swagger';
import { FileDetailsDto } from '../../filemanager/dto/file.dto';

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
  newConvenience?: string;

  @ApiProperty()
  contactPhone: string;

  @ApiProperty()
  images: FileDetailsDto[];
}
