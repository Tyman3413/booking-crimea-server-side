import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { CategoriesModule } from '../categories/categories.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { TermsModule } from '../terms/terms.module';
import { RoomsModule } from '../rooms/rooms.module';
import { OrdersModule } from '../orders/orders.module';
import { ConveniencesModule } from '../conveniences/conveniences.module';
import { HotelsService } from './hotels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    forwardRef(() => ReviewsModule),
    forwardRef(() => TermsModule),
    forwardRef(() => RoomsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => ConveniencesModule),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}
