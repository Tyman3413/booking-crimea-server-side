import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelImagesEntity } from './hotel.images.entity';
import { RoomImagesEntity } from './room.images.entity';

// TODO Delete when move to S3
@Module({
  imports: [TypeOrmModule.forFeature([HotelImagesEntity, RoomImagesEntity])],
})
export class TempModule {}
