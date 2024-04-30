import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [],
})
export class HotelsModule {}
