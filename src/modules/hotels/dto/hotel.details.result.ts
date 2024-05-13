import { ApiProperty } from '@nestjs/swagger';
import { ConvenienceResult } from '../../conveniences/convenience.result';
import { Term } from '../../terms/term.entity';
import { Room } from '../../rooms/room.entity';
import { ReviewDetailsResult } from '../../reviews/dto/review.details.result';
import { TermsDetailsResult } from '../../terms/dto/terms.details.result';
import { RoomDetailsResult } from '../../rooms/dto/room.details.result';
import { HotelsResult } from './hotels.result';
import { HotelCoordsResult } from './hotel.coords.result';

export class HotelDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Парк-отель «Песочная бухта»' })
  title: string;

  @ApiProperty({ example: 'Севастополь - 99028, улица Ефремова, д.38' })
  address: string;

  @ApiProperty({ example: 4.7 })
  rating: number;

  @ApiProperty({ type: () => ReviewDetailsResult, isArray: true })
  reviews: ReviewDetailsResult[];

  @ApiProperty({ example: 15 })
  totalReviews: number;

  @ApiProperty({ example: 7200 })
  minPrice: number;

  @ApiProperty({ example: 'Описание отеля' })
  description: string;

  @ApiProperty({ type: () => ConvenienceResult, isArray: true })
  conveniences: ConvenienceResult[];

  @ApiProperty({ type: TermsDetailsResult })
  rules: TermsDetailsResult;

  @ApiProperty({ type: () => RoomDetailsResult, isArray: true })
  rooms: RoomDetailsResult[];

  @ApiProperty({ type: HotelCoordsResult })
  coords: HotelCoordsResult;
}