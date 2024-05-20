import { ApiProperty } from '@nestjs/swagger';
import { FileDetailsDto } from '../../filemanager/dto/file.dto';

export class HotelsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'https://somesite.com/photo.jpg' })
  img: string;

  @ApiProperty({ example: 'Парк-отель "Песочная бухта"' })
  name: string;

  @ApiProperty({ example: 'Севастополь, ул. Ефремова, д. 38' })
  address: string;

  @ApiProperty({ example: 7200 })
  cheapestPrice: number;
}
