import { ApiProperty } from '@nestjs/swagger';
import { ConvenienceResult } from '../../conveniences/convenience.result';
import { RoomImagesEntity } from '../../temp/room.images.entity';

export class RoomDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Номер #1' })
  title: string;

  @ApiProperty()
  tempImages: RoomImagesEntity[];

  @ApiProperty({ example: 'Краткое описание номера' })
  subtitle: string;

  @ApiProperty({ example: 'Полное описание номера' })
  description: string;

  @ApiProperty({ example: 2 })
  beds: number;

  @ApiProperty({ example: 3 })
  places: number;

  @ApiProperty({ example: 0 })
  extraBeds: number;

  @ApiProperty({ example: 15 })
  roomSize: number;

  @ApiProperty({ example: 7200 })
  price: number;

  @ApiProperty({ type: () => ConvenienceResult, isArray: true })
  conveniences: ConvenienceResult[];
}
