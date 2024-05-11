import { ApiProperty } from '@nestjs/swagger';
import { ConvenienceResult } from '../../conveniences/convenience.result';
import { Term } from '../../terms/term.entity';
import { Room } from '../../rooms/room.entity';

export class HotelDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Парк-отель «Песочная бухта»' })
  title: string;

  @ApiProperty({ example: 'Севастополь - 99028, улица Ефремова, д.38' })
  address: string;

  @ApiProperty()
  rate: any;

  @ApiProperty({ example: 7200 })
  minPrice: number;

  @ApiProperty({ example: 'Описание отеля' })
  description: string;

  @ApiProperty()
  conveniences: ConvenienceResult[];

  @ApiProperty()
  rules: Term;

  @ApiProperty()
  rooms: Room[];

  @ApiProperty()
  coords: any;
}
