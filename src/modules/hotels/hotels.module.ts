import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { CategoriesModule } from '../categories/categories.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { TermsModule } from '../terms/terms.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ReviewsModule),
    forwardRef(() => TermsModule),
    forwardRef(() => RoomsModule),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [],
})
export class HotelsModule {}
